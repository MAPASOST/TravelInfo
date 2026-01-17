#!/usr/bin/env python3
"""
Budget Visualization Desktop App
Simple desktop application for comparing budget vs actual spending
"""

import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import os
import sys

# Try to import required libraries
try:
    import pandas as pd
    import matplotlib
    matplotlib.use('TkAgg')
    from matplotlib.figure import Figure
    from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
    import openpyxl
except ImportError as e:
    print(f"Missing required library: {e}")
    print("\nTo install required libraries, run:")
    print("pip install pandas openpyxl matplotlib")
    sys.exit(1)

class BudgetVisualizationApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Budget Visualization")
        self.root.geometry("1200x800")

        self.budget_data = None
        self.pl_data = None

        self.setup_ui()

    def setup_ui(self):
        # Header
        header = tk.Frame(self.root, bg='#667eea', height=100)
        header.pack(fill=tk.X)

        title = tk.Label(header, text="Budget & P/L Visualization",
                        font=('Arial', 24, 'bold'), bg='#667eea', fg='white')
        title.pack(pady=20)

        # Upload section
        upload_frame = tk.Frame(self.root, bg='white', pady=20)
        upload_frame.pack(fill=tk.X, padx=20, pady=10)

        # Budget file upload
        budget_btn = tk.Button(upload_frame, text="📁 Upload Budget File",
                              command=self.load_budget_file,
                              font=('Arial', 12, 'bold'),
                              bg='#667eea', fg='white',
                              padx=20, pady=10, relief=tk.RAISED)
        budget_btn.grid(row=0, column=0, padx=10, pady=5)

        self.budget_label = tk.Label(upload_frame, text="No file selected",
                                     font=('Arial', 10), bg='white')
        self.budget_label.grid(row=1, column=0, padx=10)

        # P&L file upload
        pl_btn = tk.Button(upload_frame, text="📁 Upload P&L File",
                          command=self.load_pl_file,
                          font=('Arial', 12, 'bold'),
                          bg='#667eea', fg='white',
                          padx=20, pady=10, relief=tk.RAISED)
        pl_btn.grid(row=0, column=1, padx=10, pady=5)

        self.pl_label = tk.Label(upload_frame, text="No file selected",
                                font=('Arial', 10), bg='white')
        self.pl_label.grid(row=1, column=1, padx=10)

        # Analyze button
        self.analyze_btn = tk.Button(upload_frame, text="Generate Analysis",
                                     command=self.analyze_data,
                                     font=('Arial', 14, 'bold'),
                                     bg='#38ef7d', fg='white',
                                     padx=40, pady=15, relief=tk.RAISED,
                                     state=tk.DISABLED)
        self.analyze_btn.grid(row=0, column=2, rowspan=2, padx=20)

        # Results area with tabs
        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(fill=tk.BOTH, expand=True, padx=20, pady=10)

        # Tab 1: Bar Chart
        self.tab1 = tk.Frame(self.notebook, bg='white')
        self.notebook.add(self.tab1, text='Budget vs Actual')

        # Tab 2: Line Chart
        self.tab2 = tk.Frame(self.notebook, bg='white')
        self.notebook.add(self.tab2, text='Trend Analysis')

        # Tab 3: Table
        self.tab3 = tk.Frame(self.notebook, bg='white')
        self.notebook.add(self.tab3, text='Variance Table')

    def load_budget_file(self):
        filename = filedialog.askopenfilename(
            title="Select Budget Excel File",
            filetypes=[("Excel files", "*.xlsx *.xls"), ("All files", "*.*")]
        )
        if filename:
            try:
                self.budget_data = pd.read_excel(filename, header=0)
                self.budget_label.config(text=f"✓ {os.path.basename(filename)}", fg='green')
                self.check_ready()
            except Exception as e:
                messagebox.showerror("Error", f"Failed to load budget file:\n{str(e)}")

    def load_pl_file(self):
        filename = filedialog.askopenfilename(
            title="Select P&L Excel File",
            filetypes=[("Excel files", "*.xlsx *.xls"), ("All files", "*.*")]
        )
        if filename:
            try:
                self.pl_data = pd.read_excel(filename, header=0)
                self.pl_label.config(text=f"✓ {os.path.basename(filename)}", fg='green')
                self.check_ready()
            except Exception as e:
                messagebox.showerror("Error", f"Failed to load P&L file:\n{str(e)}")

    def check_ready(self):
        if self.budget_data is not None and self.pl_data is not None:
            self.analyze_btn.config(state=tk.NORMAL)

    def analyze_data(self):
        try:
            # Process data
            budget_df = self.budget_data.copy()
            pl_df = self.pl_data.copy()

            # Get category column (first column)
            cat_col = budget_df.columns[0]
            budget_df.set_index(cat_col, inplace=True)
            pl_df.set_index(cat_col, inplace=True)

            # Calculate totals for each category
            budget_totals = budget_df.sum(axis=1)
            pl_totals = pl_df.sum(axis=1)

            # Create comparison dataframe
            comparison = pd.DataFrame({
                'Budget': budget_totals,
                'Actual': pl_totals,
                'Variance': pl_totals - budget_totals,
                'Variance %': ((pl_totals - budget_totals) / budget_totals * 100).round(1)
            })

            # Create visualizations
            self.create_bar_chart(comparison)
            self.create_line_chart(budget_df, pl_df)
            self.create_table(comparison)

            messagebox.showinfo("Success", "Analysis generated successfully!")

        except Exception as e:
            messagebox.showerror("Error", f"Failed to analyze data:\n{str(e)}\n\nMake sure your Excel files have the correct format:\n- First column: Category names\n- Other columns: Period values (Jan, Feb, etc.)")

    def create_bar_chart(self, comparison):
        # Clear previous chart
        for widget in self.tab1.winfo_children():
            widget.destroy()

        # Create figure
        fig = Figure(figsize=(10, 6))
        ax = fig.add_subplot(111)

        # Plot
        x = range(len(comparison))
        width = 0.35

        ax.bar([i - width/2 for i in x], comparison['Budget'], width,
               label='Budget', color='#667eea')
        ax.bar([i + width/2 for i in x], comparison['Actual'], width,
               label='Actual', color='#38ef7d')

        ax.set_xlabel('Category', fontsize=12, fontweight='bold')
        ax.set_ylabel('Amount ($)', fontsize=12, fontweight='bold')
        ax.set_title('Budget vs Actual Comparison', fontsize=14, fontweight='bold')
        ax.set_xticks(x)
        ax.set_xticklabels(comparison.index, rotation=45, ha='right')
        ax.legend()
        ax.grid(axis='y', alpha=0.3)

        fig.tight_layout()

        # Embed in tkinter
        canvas = FigureCanvasTkAgg(fig, master=self.tab1)
        canvas.draw()
        canvas.get_tk_widget().pack(fill=tk.BOTH, expand=True)

    def create_line_chart(self, budget_df, pl_df):
        # Clear previous chart
        for widget in self.tab2.winfo_children():
            widget.destroy()

        # Create figure
        fig = Figure(figsize=(10, 6))
        ax = fig.add_subplot(111)

        # Calculate period totals
        budget_timeline = budget_df.sum(axis=0)
        pl_timeline = pl_df.sum(axis=0)

        # Plot
        ax.plot(budget_timeline.index, budget_timeline.values,
               marker='o', linewidth=2, label='Budget', color='#667eea')
        ax.plot(pl_timeline.index, pl_timeline.values,
               marker='o', linewidth=2, label='Actual', color='#38ef7d')

        ax.set_xlabel('Period', fontsize=12, fontweight='bold')
        ax.set_ylabel('Amount ($)', fontsize=12, fontweight='bold')
        ax.set_title('Spending Trend Over Time', fontsize=14, fontweight='bold')
        ax.legend()
        ax.grid(True, alpha=0.3)

        # Rotate x labels if needed
        if len(budget_timeline) > 6:
            ax.set_xticklabels(budget_timeline.index, rotation=45, ha='right')

        fig.tight_layout()

        # Embed in tkinter
        canvas = FigureCanvasTkAgg(fig, master=self.tab2)
        canvas.draw()
        canvas.get_tk_widget().pack(fill=tk.BOTH, expand=True)

    def create_table(self, comparison):
        # Clear previous table
        for widget in self.tab3.winfo_children():
            widget.destroy()

        # Create scrollable frame
        canvas = tk.Canvas(self.tab3, bg='white')
        scrollbar = ttk.Scrollbar(self.tab3, orient="vertical", command=canvas.yview)
        scrollable_frame = tk.Frame(canvas, bg='white')

        scrollable_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
        )

        canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar.set)

        # Create table
        style = ttk.Style()
        style.configure("Treeview", font=('Arial', 10), rowheight=30)
        style.configure("Treeview.Heading", font=('Arial', 11, 'bold'))

        tree = ttk.Treeview(scrollable_frame, columns=('Category', 'Budget', 'Actual', 'Variance', 'Variance %', 'Status'),
                           show='headings', height=20)

        # Column headings
        tree.heading('Category', text='Category')
        tree.heading('Budget', text='Budget')
        tree.heading('Actual', text='Actual')
        tree.heading('Variance', text='Variance ($)')
        tree.heading('Variance %', text='Variance %')
        tree.heading('Status', text='Status')

        # Column widths
        tree.column('Category', width=200)
        tree.column('Budget', width=150)
        tree.column('Actual', width=150)
        tree.column('Variance', width=150)
        tree.column('Variance %', width=120)
        tree.column('Status', width=150)

        # Add data
        for idx, row in comparison.iterrows():
            status = "⚠️ Over Budget" if row['Variance'] > 0 else "✅ Under Budget"
            values = (
                idx,
                f"${row['Budget']:,.0f}",
                f"${row['Actual']:,.0f}",
                f"${row['Variance']:,.0f}",
                f"{row['Variance %']:+.1f}%",
                status
            )

            # Color code rows
            if row['Variance'] > 0:
                tree.insert('', 'end', values=values, tags=('over',))
            else:
                tree.insert('', 'end', values=values, tags=('under',))

        tree.tag_configure('over', background='#fee')
        tree.tag_configure('under', background='#efe')

        tree.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)

        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

def main():
    root = tk.Tk()
    app = BudgetVisualizationApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()
