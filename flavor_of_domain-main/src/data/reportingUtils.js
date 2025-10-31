// src/data/reportingUtils.js
import { getAllRecipe } from './recipe';
import { getUsers } from './users';
import { getAllComment } from './comment';
import { getAllCategory } from './category';
import { getAllDietaryPreference } from './dietaryPreference';
import { getMealPlansByUserEmail, getAllMealPlans } from './mealPlans';
import { getRatingsByRecipeId } from './rating';
import { getIngredientsByRecipeId } from './recipeIngredient';

/**
 * Generates statistical system overview report
 * 
 * @returns {Promise<Object>} System statistics
 */
export async function getSystemStatistics() {
  try {
    // Fetch data using existing endpoints
    const recipes = await getAllRecipe();
    const users = await getUsers();
    const comments = await getAllComment();
    const categories = await getAllCategory();
    const dietaryPreferences = await getAllDietaryPreference();
    
    // Process data - only use what we can get from the real endpoints
    const verifiedChefs = users.filter(user => user.verified === 1).length;
    
    // Get category distribution - real data from the database
    const categoryDistribution = getCategoryDistribution(recipes, categories);
    
    // Return only real data, no mocks
    return {
      totalUsers: users.length,
      verifiedChefs,
      totalRecipes: recipes.length,
      totalComments: comments.length,
      categoryDistribution,
      dietaryPreferences: dietaryPreferences.length
    };
  } catch (error) {
    console.error('Error generating system statistics:', error);
    throw error;
  }
}

/**
 * Generates user activity report
 * 
 * @param {string} timeframe - 'weekly', 'monthly', or 'yearly'
 * @returns {Promise<Object>} User activity data
 */
export async function getUserActivityReport(timeframe = 'monthly') {
  try {
    // Only fetch data that exists in the real endpoints
    const users = await getUsers();
    const recipes = await getAllRecipe();
    const comments = await getAllComment();
    const mealPlans = await getAllMealPlans();
    
    // Generate timeline labels - this isn't fake data, just formatting dates
    const labels = generateTimelineLabels(timeframe);
    
    // Return only real data - we don't have time-based activity data
    // so we can only return aggregate counts
    return {
      totalUsers: users.length,
      totalRecipes: recipes.length,
      totalComments: comments.length,
      totalMealPlans: mealPlans.length,
      timeframe,
      timeLabels: labels
    };
  } catch (error) {
    console.error('Error generating user activity report:', error);
    throw error;
  }
}

/**
 * Generates recipe performance report
 * 
 * @returns {Promise<Object>} Recipe performance statistics
 */
export async function getRecipePerformanceReport() {
  try {
    // Only fetch data that exists in the real endpoints
    const recipes = await getAllRecipe();
    const categories = await getAllCategory();
    const users = await getUsers();
    
    // Get real category distribution
    const recipesByCategory = getCategoryDistribution(recipes, categories);
    
    // Return only real data
    return {
      totalRecipes: recipes.length,
      recipesByCategory,
      verifiedChefs: users.filter(user => user.verified === 1).length
    };
  } catch (error) {
    console.error('Error generating recipe performance report:', error);
    throw error;
  }
}

/**
 * Generates dietary preference analysis report
 * 
 * @returns {Promise<Object>} Dietary preference statistics
 */
export async function getDietaryPreferenceReport() {
  try {
    // Only fetch data that exists in the real endpoints
    const dietaryPreferences = await getAllDietaryPreference();
    
    // Return only the data we can get from real endpoints
    return {
      dietaryPreferences
    };
  } catch (error) {
    console.error('Error generating dietary preference report:', error);
    throw error;
  }
}

/**
 * Generates detailed user report
 * 
 * @param {string} userEmail - Email of the user
 * @returns {Promise<Object>} Detailed user report
 */
export async function getUserDetailedReport(userEmail) {
  try {
    // Fetch real user data
    const users = await getUsers();
    const user = users.find(u => u.email === userEmail);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Fetch all real data we can get for this user from existing endpoints
    const recipes = await getAllRecipe();
    const userRecipes = recipes.filter(recipe => recipe.created_by === userEmail);
    
    // Get user's meal plans using the existing endpoint
    const userMealPlans = await getMealPlansByUserEmail(userEmail);
    
    // Get all comments and filter for this user
    const allComments = await getAllComment();
    const userComments = allComments.filter(comment => comment.user_email === userEmail);
    
    // Filter all data we have access to for this specific user
    return {
      userInfo: {
        email: user.email,
        name: user.name,
        birthday: user.birthday,
        isVerifiedChef: user.verified === 1
      },
      activitySummary: {
        recipesCreated: userRecipes.length,
        commentsPosted: userComments.length,
        mealPlansCreated: userMealPlans ? userMealPlans.length : 0
      },
      recipes: userRecipes,
      mealPlans: userMealPlans,
      comments: userComments
    };
  } catch (error) {
    console.error('Error generating user detailed report:', error);
    throw error;
  }
}

/**
 * Export report data as CSV
 * 
 * @param {Object} data - Report data to export
 * @param {string} reportType - Type of report
 * @returns {string} CSV formatted string
 */
export function exportReportAsCsv(data, reportType) {
  // Flatten data structure based on report type
  let flattenedData = [];
  let headers = [];
  
  switch(reportType) {
    case 'system-stats':
      headers = ['Metric', 'Value'];
      flattenedData = Object.entries(data).map(([key, value]) => {
        if (typeof value === 'object') return null;
        return {
          Metric: formatHeader(key),
          Value: value
        };
      }).filter(item => item !== null);
      break;
      
    case 'user-activity':
      headers = ['Total Users', 'Total Recipes', 'Total Comments', 'Total Meal Plans'];
      flattenedData = [{
        'Total Users': data.totalUsers,
        'Total Recipes': data.totalRecipes,
        'Total Comments': data.totalComments,
        'Total Meal Plans': data.totalMealPlans
      }];
      break;
      
    case 'recipe-stats':
      if (data.recipesByCategory) {
        headers = ['Category', 'Recipe Count'];
        flattenedData = data.recipesByCategory.labels.map((label, index) => ({
          Category: label,
          'Recipe Count': data.recipesByCategory.data[index]
        }));
      }
      break;
      
    case 'dietary-preference-stats':
      headers = ['Dietary Preference'];
      flattenedData = data.dietaryPreferences.map(preference => ({
        'Dietary Preference': preference.name
      }));
      break;
      
    default:
      return 'No data available for export';
  }
  
  // Convert to CSV
  const csvRows = [];
  
  // Add headers
  csvRows.push(headers.join(','));
  
  // Add data rows
  for (const row of flattenedData) {
    const values = headers.map(header => {
      const value = row[header] ?? '';
      // Escape quotes and wrap in quotes if the value contains a comma
      return typeof value === 'string' && value.includes(',') 
        ? `"${value.replace(/"/g, '""')}"` 
        : value;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
}

// Helper functions

function formatHeader(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace(/([a-z])([A-Z])/g, '$1 $2');
}

function getCategoryDistribution(recipes, categories) {
  const distribution = {};
  
  // Initialize with all categories
  categories.forEach(category => {
    distribution[category.type] = 0;
  });
  
  // Count recipes per category
  recipes.forEach(recipe => {
    if (recipe.category_type && distribution[recipe.category_type] !== undefined) {
      distribution[recipe.category_type]++;
    }
  });
  
  return {
    labels: Object.keys(distribution),
    data: Object.values(distribution)
  };
}

function generateTimelineLabels(timeframe) {
  const now = new Date();
  const labels = [];
  
  switch(timeframe) {
    case 'weekly':
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        labels.push(dayNames[date.getDay()]);
      }
      break;
      
    case 'yearly':
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(date.getMonth() - i);
        labels.push(monthNames[date.getMonth()]);
      }
      break;
      
    case 'monthly':
    default:
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        labels.push(`${(date.getMonth() + 1)}/${date.getDate()}`);
      }
  }
  
  return labels;
}