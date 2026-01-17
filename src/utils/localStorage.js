/**
 * Local Storage Manager for Budget Visualization App
 * Handles saving/loading recent files, preferences, and app state
 */

const STORAGE_KEYS = {
  RECENT_BUDGET_FILES: 'budget_recent_budget_files',
  RECENT_PL_FILES: 'budget_recent_pl_files',
  PREFERENCES: 'budget_preferences',
  LAST_SESSION: 'budget_last_session'
};

/**
 * Get recent budget files
 */
export const getRecentBudgetFiles = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RECENT_BUDGET_FILES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading recent budget files:', error);
    return [];
  }
};

/**
 * Add a budget file to recent files
 */
export const addRecentBudgetFile = (filePath, fileName) => {
  try {
    const recent = getRecentBudgetFiles();
    const newEntry = {
      path: filePath,
      name: fileName,
      timestamp: new Date().toISOString()
    };

    // Remove if already exists
    const filtered = recent.filter(f => f.path !== filePath);

    // Add to beginning and limit to 10 items
    const updated = [newEntry, ...filtered].slice(0, 10);

    localStorage.setItem(STORAGE_KEYS.RECENT_BUDGET_FILES, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error saving recent budget file:', error);
    return [];
  }
};

/**
 * Get recent P&L files
 */
export const getRecentPLFiles = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RECENT_PL_FILES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading recent P&L files:', error);
    return [];
  }
};

/**
 * Add a P&L file to recent files
 */
export const addRecentPLFile = (filePath, fileName) => {
  try {
    const recent = getRecentPLFiles();
    const newEntry = {
      path: filePath,
      name: fileName,
      timestamp: new Date().toISOString()
    };

    // Remove if already exists
    const filtered = recent.filter(f => f.path !== filePath);

    // Add to beginning and limit to 10 items
    const updated = [newEntry, ...filtered].slice(0, 10);

    localStorage.setItem(STORAGE_KEYS.RECENT_PL_FILES, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error saving recent P&L file:', error);
    return [];
  }
};

/**
 * Clear all recent files
 */
export const clearRecentFiles = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.RECENT_BUDGET_FILES);
    localStorage.removeItem(STORAGE_KEYS.RECENT_PL_FILES);
    return true;
  } catch (error) {
    console.error('Error clearing recent files:', error);
    return false;
  }
};

/**
 * Get user preferences
 */
export const getPreferences = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return stored ? JSON.parse(stored) : getDefaultPreferences();
  } catch (error) {
    console.error('Error loading preferences:', error);
    return getDefaultPreferences();
  }
};

/**
 * Default preferences
 */
const getDefaultPreferences = () => ({
  theme: 'light',
  currency: 'USD',
  dateFormat: 'MM/DD/YYYY',
  autoSave: true,
  showWelcomeScreen: true,
  chartAnimations: true,
  compactView: false
});

/**
 * Save user preferences
 */
export const savePreferences = (preferences) => {
  try {
    const current = getPreferences();
    const updated = { ...current, ...preferences };
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error saving preferences:', error);
    return null;
  }
};

/**
 * Save last session state
 */
export const saveLastSession = (budgetFile, plFile) => {
  try {
    const session = {
      budgetFile,
      plFile,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.LAST_SESSION, JSON.stringify(session));
    return true;
  } catch (error) {
    console.error('Error saving session:', error);
    return false;
  }
};

/**
 * Get last session state
 */
export const getLastSession = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LAST_SESSION);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading session:', error);
    return null;
  }
};

/**
 * Clear last session
 */
export const clearLastSession = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.LAST_SESSION);
    return true;
  } catch (error) {
    console.error('Error clearing session:', error);
    return false;
  }
};

/**
 * Export all data (for backup)
 */
export const exportAllData = () => {
  try {
    return {
      recentBudgetFiles: getRecentBudgetFiles(),
      recentPLFiles: getRecentPLFiles(),
      preferences: getPreferences(),
      lastSession: getLastSession(),
      exportDate: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error exporting data:', error);
    return null;
  }
};

/**
 * Import data (from backup)
 */
export const importAllData = (data) => {
  try {
    if (data.recentBudgetFiles) {
      localStorage.setItem(STORAGE_KEYS.RECENT_BUDGET_FILES, JSON.stringify(data.recentBudgetFiles));
    }
    if (data.recentPLFiles) {
      localStorage.setItem(STORAGE_KEYS.RECENT_PL_FILES, JSON.stringify(data.recentPLFiles));
    }
    if (data.preferences) {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(data.preferences));
    }
    if (data.lastSession) {
      localStorage.setItem(STORAGE_KEYS.LAST_SESSION, JSON.stringify(data.lastSession));
    }
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

/**
 * Clear all app data
 */
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
};
