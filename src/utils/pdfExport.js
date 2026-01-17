import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { mergeDataForComparison, mergeTimelineData } from './excelParser';

/**
 * Export dashboard to PDF
 */
export const exportToPDF = async (budgetData, plData, fileName = 'budget-report.pdf') => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;

    // Add title
    pdf.setFontSize(24);
    pdf.setTextColor(102, 126, 234);
    pdf.text('Budget & P/L Analysis Report', margin, 20);

    // Add date
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, margin, 28);

    // Add line separator
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.5);
    pdf.line(margin, 32, pageWidth - margin, 32);

    let yPosition = 40;

    // Summary section
    pdf.setFontSize(16);
    pdf.setTextColor(45, 55, 72);
    pdf.text('Executive Summary', margin, yPosition);
    yPosition += 8;

    const comparison = mergeDataForComparison(budgetData, plData);
    const totals = comparison.reduce((acc, row) => ({
      budget: acc.budget + row.budget,
      actual: acc.actual + row.actual,
      variance: acc.variance + row.variance
    }), { budget: 0, actual: 0, variance: 0 });

    pdf.setFontSize(11);
    pdf.setTextColor(60, 60, 60);

    pdf.text(`Total Budget: ${formatCurrency(totals.budget)}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`Total Actual: ${formatCurrency(totals.actual)}`, margin, yPosition);
    yPosition += 6;

    const variancePercent = totals.budget !== 0
      ? ((totals.variance / totals.budget) * 100).toFixed(1)
      : 0;

    if (totals.variance > 0) {
      pdf.setTextColor(229, 62, 62);
    } else {
      pdf.setTextColor(56, 161, 105);
    }
    pdf.text(`Variance: ${formatCurrency(totals.variance)} (${variancePercent}%)`, margin, yPosition);
    yPosition += 10;

    // Variance Table
    pdf.setFontSize(14);
    pdf.setTextColor(45, 55, 72);
    pdf.text('Detailed Variance Analysis', margin, yPosition);
    yPosition += 8;

    // Table headers
    pdf.setFontSize(9);
    pdf.setTextColor(255, 255, 255);
    pdf.setFillColor(102, 126, 234);
    pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 8, 'F');

    const colWidths = [60, 35, 35, 30, 25];
    let xPosition = margin + 2;

    pdf.text('Category', xPosition, yPosition);
    xPosition += colWidths[0];
    pdf.text('Budget', xPosition, yPosition);
    xPosition += colWidths[1];
    pdf.text('Actual', xPosition, yPosition);
    xPosition += colWidths[2];
    pdf.text('Variance', xPosition, yPosition);
    xPosition += colWidths[3];
    pdf.text('Var %', xPosition, yPosition);

    yPosition += 8;

    // Table rows
    pdf.setFontSize(8);
    comparison.forEach((row, index) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = margin;
      }

      // Alternating row background
      if (index % 2 === 0) {
        pdf.setFillColor(247, 250, 252);
        pdf.rect(margin, yPosition - 4, pageWidth - 2 * margin, 6, 'F');
      }

      xPosition = margin + 2;
      pdf.setTextColor(60, 60, 60);

      // Category
      const categoryText = row.category.length > 25
        ? row.category.substring(0, 22) + '...'
        : row.category;
      pdf.text(categoryText, xPosition, yPosition);
      xPosition += colWidths[0];

      // Budget
      pdf.text(formatCurrency(row.budget), xPosition, yPosition);
      xPosition += colWidths[1];

      // Actual
      pdf.text(formatCurrency(row.actual), xPosition, yPosition);
      xPosition += colWidths[2];

      // Variance
      if (row.variance > 0) {
        pdf.setTextColor(229, 62, 62);
      } else {
        pdf.setTextColor(56, 161, 105);
      }
      pdf.text(formatCurrency(row.variance), xPosition, yPosition);
      xPosition += colWidths[3];

      // Variance %
      pdf.text(`${row.variancePercent > 0 ? '+' : ''}${row.variancePercent}%`, xPosition, yPosition);

      yPosition += 6;
    });

    // Add totals row
    yPosition += 2;
    pdf.setFillColor(226, 232, 240);
    pdf.rect(margin, yPosition - 4, pageWidth - 2 * margin, 7, 'F');

    xPosition = margin + 2;
    pdf.setFontSize(9);
    pdf.setTextColor(45, 55, 72);
    pdf.setFont(undefined, 'bold');

    pdf.text('TOTAL', xPosition, yPosition);
    xPosition += colWidths[0];
    pdf.text(formatCurrency(totals.budget), xPosition, yPosition);
    xPosition += colWidths[1];
    pdf.text(formatCurrency(totals.actual), xPosition, yPosition);
    xPosition += colWidths[2];
    pdf.text(formatCurrency(totals.variance), xPosition, yPosition);
    xPosition += colWidths[3];
    pdf.text(`${variancePercent > 0 ? '+' : ''}${variancePercent}%`, xPosition, yPosition);

    // Add footer
    const totalPages = pdf.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        `Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    // Save PDF
    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw error;
  }
};

/**
 * Export charts to PDF with screenshots
 */
export const exportChartsWithScreenshots = async (budgetData, plData, fileName = 'budget-charts.pdf') => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;

    // Add title page
    pdf.setFontSize(24);
    pdf.setTextColor(102, 126, 234);
    pdf.text('Budget Visualization Report', pageWidth / 2, 40, { align: 'center' });

    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, 50, { align: 'center' });

    // Capture chart elements
    const chartContainers = document.querySelectorAll('.chart-container');

    for (let i = 0; i < chartContainers.length; i++) {
      const container = chartContainers[i];
      const title = container.querySelector('h2')?.textContent || `Chart ${i + 1}`;

      // Add new page for each chart (except first one which uses title page)
      if (i > 0) {
        pdf.addPage();
      } else {
        pdf.addPage();
      }

      // Add chart title
      pdf.setFontSize(16);
      pdf.setTextColor(45, 55, 72);
      pdf.text(title, margin, 20);

      // Capture chart as image
      const canvas = await html2canvas(container, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pageWidth - 2 * margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', margin, 30, imgWidth, Math.min(imgHeight, pageHeight - 40));
    }

    // Add footer
    const totalPages = pdf.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        `Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    // Save PDF
    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('Error exporting charts to PDF:', error);
    throw error;
  }
};

/**
 * Format currency
 */
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};
