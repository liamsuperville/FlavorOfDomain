// src/pages/ReportsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLoading } from '../contexts/LoadingContext';
import {
  getSystemStatistics,
  getUserActivityReport,
  getRecipePerformanceReport,
  getDietaryPreferenceReport,
  getUserDetailedReport,
  getManagementSummaryReport,
  exportReportAsCsv
} from '../data/reportingUtils';

function ReportsPage() {
  const { currentUser, isAdmin } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('system');
  const [reportData, setReportData] = useState(null);
  const [timeframe, setTimeframe] = useState('monthly');
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  
  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: '/reports' } });
    } else {
      setUserEmail(currentUser.email);
    }
  }, [currentUser, navigate]);
  
  // Load report data based on active tab
  useEffect(() => {
    const loadReportData = async () => {
      setError(null);
      
      try {
        startLoading('Loading report data...');
        
        let data = null;
        
        switch(activeTab) {
          case 'system':
            data = await getSystemStatistics();
            break;
            
          case 'user-activity':
            data = await getUserActivityReport(timeframe);
            break;
            
          case 'recipe-performance':
            data = await getRecipePerformanceReport();
            break;
            
          case 'dietary-analysis':
            data = await getDietaryPreferenceReport();
            break;
            
          case 'user-detailed':
            if (userEmail) {
              data = await getUserDetailedReport(userEmail);
            }
            break;
            
          default:
            setError('Unknown report type.');
        }
        
        setReportData(data);
      } catch (err) {
        console.error('Error loading report data:', err);
        setError(`Failed to load report data: ${err.message}`);
      } finally {
        stopLoading();
      }
    };
    
    if (currentUser) {
      loadReportData();
    }
  }, [activeTab, timeframe, userEmail, currentUser, startLoading, stopLoading]);
  
  const handleExportCsv = () => {
    if (!reportData) return;
    
    try {
      let csvData;
      let fileName;
      
      switch(activeTab) {
        case 'system':
          csvData = exportReportAsCsv(reportData, 'system-stats');
          fileName = 'system-statistics.csv';
          break;
          
        case 'user-activity':
          csvData = exportReportAsCsv(reportData, 'user-activity');
          fileName = `user-activity-${timeframe}.csv`;
          break;
          
        case 'recipe-performance':
          csvData = exportReportAsCsv(reportData, 'recipe-stats');
          fileName = 'recipe-performance.csv';
          break;
          
        case 'dietary-analysis':
          csvData = exportReportAsCsv(reportData, 'dietary-preference-stats');
          fileName = 'dietary-analysis.csv';
          break;
          
        default:
          throw new Error('Export not available for this report type.');
      }
      
      // Create download link
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error exporting report:', err);
      setError(`Failed to export report: ${err.message}`);
    }
  };
  
  return (
    <div className="reports-page">
      <h1>Reporting Dashboard</h1>
      
      <div className="reports-tabs">
        <button 
          className={`report-tab ${activeTab === 'system' ? 'active' : ''}`}
          onClick={() => setActiveTab('system')}
        >
          System Statistics
        </button>
        
        <button 
          className={`report-tab ${activeTab === 'user-activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('user-activity')}
        >
          User Activity
        </button>
        
        <button 
          className={`report-tab ${activeTab === 'recipe-performance' ? 'active' : ''}`}
          onClick={() => setActiveTab('recipe-performance')}
        >
          Recipe Performance
        </button>
        
        <button 
          className={`report-tab ${activeTab === 'dietary-analysis' ? 'active' : ''}`}
          onClick={() => setActiveTab('dietary-analysis')}
        >
          Dietary Analysis
        </button>
        
        <button 
          className={`report-tab ${activeTab === 'user-detailed' ? 'active' : ''}`}
          onClick={() => setActiveTab('user-detailed')}
        >
          User Detailed Report
        </button>
      </div>
      
      <div className="report-controls">
        {activeTab === 'user-activity' && (
          <div className="timeframe-selector">
            <label htmlFor="timeframe">Timeframe:</label>
            <select 
              id="timeframe" 
              value={timeframe} 
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        )}
        
        {activeTab === 'user-detailed' && (
          <div className="user-selector">
            <label htmlFor="user-email">User Email:</label>
            <input 
              type="email" 
              id="user-email" 
              value={userEmail} 
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter user email"
            />
          </div>
        )}
        
        <button className="export-csv-btn" onClick={handleExportCsv}>
          Export as CSV
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="report-content">
        {reportData && (
          <>
            {activeTab === 'system' && <SystemStatisticsReport data={reportData} />}
            {activeTab === 'user-activity' && <UserActivityReport data={reportData} timeframe={timeframe} />}
            {activeTab === 'recipe-performance' && <RecipePerformanceReport data={reportData} />}
            {activeTab === 'dietary-analysis' && <DietaryAnalysisReport data={reportData} />}
            {activeTab === 'user-detailed' && <UserDetailedReport data={reportData} />}
          </>
        )}
      </div>
    </div>
  );
}

// System Statistics Report Component
function SystemStatisticsReport({ data }) {
  if (!data) return null;
  
  return (
    <div>
      <h2>System Overview</h2>
      
      <h3>User & Content Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Users</h4>
          <div className="stat-value">{data.totalUsers}</div>
          <div className="stat-detail">
            <div>{data.verifiedChefs} verified chefs</div>
            <div>{data.newUsersLast30Days} new in last 30 days</div>
          </div>
        </div>
        
        <div className="stat-card">
          <h4>Total Recipes</h4>
          <div className="stat-value">{data.totalRecipes}</div>
          <div className="stat-detail">
            <div>{data.newRecipesLast30Days} new in last 30 days</div>
          </div>
        </div>
        
        <div className="stat-card">
          <h4>Engagement</h4>
          <div className="stat-value">{data.totalComments + data.totalRatings}</div>
          <div className="stat-detail">
            <div>{data.totalComments} comments</div>
            <div>{data.totalRatings} ratings</div>
          </div>
        </div>
        
        <div className="stat-card">
          <h4>Average Rating</h4>
          <div className="stat-value">{data.averageRating}</div>
          <div className="stat-detail">
            <div className="star-rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < Math.round(data.averageRating) ? "star filled" : "star"}>★</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <h3>User Activity</h3>
      <div className="stats-highlight">
        <div className="highlight-value">
          {data.activeUsersLast30Days} active users in last 30 days
          <span className="percentage">
            ({Math.round((data.activeUsersLast30Days / data.totalUsers) * 100)}% of total)
          </span>
        </div>
      </div>
      
      <h3>Recipe Categories Distribution</h3>
      <div className="simple-data-table">
        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Count</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {data.categoryDistribution?.labels.map((label, index) => {
              const count = data.categoryDistribution.data[index];
              const total = data.categoryDistribution.data.reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : '0.0';
              
              return (
                <tr key={index}>
                  <td>{label}</td>
                  <td>{count}</td>
                  <td>{percentage}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <h3>Dietary Preferences</h3>
      <div className="stats-highlight">
        <div className="highlight-value">
          {data.dietaryPreferences} dietary preferences available
        </div>
      </div>
    </div>
  );
}

// User Activity Report Component
function UserActivityReport({ data, timeframe }) {
  if (!data) return null;

  // Get title based on timeframe
  const getChartTitle = () => {
    switch (timeframe) {
      case 'weekly':
        return 'Weekly User Activity (Last 7 Days)';
      case 'yearly':
        return 'Yearly User Activity (Last 12 Months)';
      case 'monthly':
      default:
        return 'Monthly User Activity (Last 30 Days)';
    }
  };

  return (
    <div>
      <h2>User Activity Report</h2>
      
      <h3>User Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Users</h4>
          <div className="stat-value">{data.totalUsers}</div>
        </div>
        
        <div className="stat-card">
          <h4>Active Users</h4>
          <div className="stat-value">{data.activeUsers}</div>
          <div className="stat-detail">
            <div className="percentage">
              ({Math.round((data.activeUsers / data.totalUsers) * 100)}% of total)
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <h4>User Growth</h4>
          <div className="stat-value">{data.userGrowth}</div>
        </div>
      </div>
      
      <h3>{getChartTitle()}</h3>
      <div className="simple-data-table">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Active Users</th>
            </tr>
          </thead>
          <tbody>
            {data.activityTimeline?.labels.map((label, index) => (
              <tr key={index}>
                <td>{label}</td>
                <td>{data.activityTimeline.data[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <h3>Activity Insights</h3>
      <div className="insights-container">
        <p>
          This report displays user activity patterns over the selected time period. 
          Activity includes logins, recipe views, ratings, comments, and other interactions.
        </p>
        <p>
          Understanding these patterns can help identify peak usage times and track the 
          impact of new features or marketing campaigns.
        </p>
      </div>
    </div>
  );
}

// Recipe Performance Report Component
function RecipePerformanceReport({ data }) {
  if (!data) return null;

  // Calculate total recipes for percentage
  const totalCategory = data.recipesByCategory?.data.reduce((total, count) => total + count, 0) || 0;

  return (
    <div>
      <h2>Recipe Performance Analytics</h2>
      
      <h3>Recipe Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Recipes</h4>
          <div className="stat-value">{data.totalRecipes}</div>
        </div>
        
        <div className="stat-card">
          <h4>Approval Rate</h4>
          <div className="stat-value">{data.approvalStats.approvalRate.toFixed(1)}%</div>
          <div className="stat-detail">
            <div>{data.approvalStats.approved} approved recipes</div>
            <div>{data.approvalStats.pending} pending recipes</div>
          </div>
        </div>
      </div>
      
      <h3>Recipes by Category</h3>
      <div className="simple-data-table">
        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Count</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {data.recipesByCategory?.labels.map((label, index) => {
              const count = data.recipesByCategory.data[index];
              const percentage = totalCategory > 0 ? ((count / totalCategory) * 100).toFixed(1) : '0.0';
              
              return (
                <tr key={index}>
                  <td>{label}</td>
                  <td>{count}</td>
                  <td>{percentage}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <h3>Recipe Approval Status</h3>
      <div className="approval-status">
        <div className="approval-progress">
          <div 
            className="approval-bar" 
            style={{
              width: `${data.approvalStats.approvalRate}%`,
              backgroundColor: '#0088FE'
            }}
          ></div>
        </div>
        <div className="approval-stats">
          <div className="approval-rate">
            <span className="label">Approval Rate:</span>
            <span className="value">{data.approvalStats.approvalRate.toFixed(1)}%</span>
          </div>
          <div className="approval-details">
            <div>
              <span className="approved-dot"></span>
              <span>Approved: {data.approvalStats.approved}</span>
            </div>
            <div>
              <span className="pending-dot"></span>
              <span>Pending: {data.approvalStats.pending}</span>
            </div>
          </div>
        </div>
      </div>
      
      <h3>Top Rated Recipes</h3>
      <div className="top-recipes-table">
        <table className="data-table">
          <thead>
            <tr>
              <th>Recipe</th>
              <th>Rating</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            {data.topRatedRecipes?.map(recipe => (
              <tr key={recipe.id}>
                <td>{recipe.title}</td>
                <td>
                  <div className="rating-display">
                    {recipe.rating} <span className="star">★</span>
                  </div>
                </td>
                <td>{recipe.views.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <h3>Recipe Creation Trend</h3>
      <div className="simple-data-table">
        <table className="data-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>New Recipes</th>
            </tr>
          </thead>
          <tbody>
            {data.recipeCreationTrend?.labels.map((label, index) => (
              <tr key={index}>
                <td>{label}</td>
                <td>{data.recipeCreationTrend.data[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Dietary Analysis Report Component
function DietaryAnalysisReport({ data }) {
  if (!data) return null;

  // Calculate total for percentages
  const totalPreferences = data.preferencesDistribution?.data.reduce((total, count) => total + count, 0) || 0;

  return (
    <div>
      <h2>Dietary Preference Analysis</h2>
      
      <h3>Dietary Preferences Distribution</h3>
      <div className="simple-data-table">
        <table className="data-table">
          <thead>
            <tr>
              <th>Preference</th>
              <th>Users</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {data.preferencesDistribution?.labels.map((label, index) => {
              const count = data.preferencesDistribution.data[index];
              const percentage = totalPreferences > 0 ? ((count / totalPreferences) * 100).toFixed(1) : '0.0';
              
              return (
                <tr key={index}>
                  <td>{label}</td>
                  <td>{count}</td>
                  <td>{percentage}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <h3>Most Restricted Ingredients</h3>
      <div className="restricted-ingredients-table">
        <table className="data-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Restriction Count</th>
            </tr>
          </thead>
          <tbody>
            {data.mostRestrictedIngredients?.map((ingredient, index) => (
              <tr key={index}>
                <td>{ingredient.name}</td>
                <td>{ingredient.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <h3>Recipes Available Per Dietary Preference</h3>
      <div className="simple-data-table">
        <table className="data-table">
          <thead>
            <tr>
              <th>Preference</th>
              <th>Recipe Count</th>
            </tr>
          </thead>
          <tbody>
            {data.recipesPerDietaryPreference?.labels.map((label, index) => (
              <tr key={index}>
                <td>{label}</td>
                <td>{data.recipesPerDietaryPreference.data[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <h3>Dietary Preference Insights</h3>
      <div className="insights-container">
        <p>
          This analysis helps identify the most common dietary preferences among users 
          and the availability of compatible recipes for each preference.
        </p>
        <p>
          Understanding the distribution of dietary preferences and the most restricted 
          ingredients allows for more targeted recipe development and better user experience.
        </p>
        <p>
          The data suggests that {data.preferencesDistribution?.labels[0]} is the most common 
          dietary preference, while {data.mostRestrictedIngredients?.[0]?.name} is the most 
          commonly restricted ingredient.
        </p>
      </div>
    </div>
  );
}

// User Detailed Report Component
function UserDetailedReport({ data }) {
  if (!data) return null;

  return (
    <div>
      <h2>User Detailed Report</h2>
      
      <h3>User Profile</h3>
      <div className="user-profile-card">
        <div className="user-profile-info">
          <div className="info-row">
            <span className="info-label">Name:</span>
            <span className="info-value">{data.userInfo.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{data.userInfo.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Registration Date:</span>
            <span className="info-value">{data.userInfo.registrationDate}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Chef Status:</span>
            <span className={`status-badge ${data.userInfo.isVerifiedChef ? 'verified' : 'not-verified'}`}>
              {data.userInfo.isVerifiedChef ? 'Verified Chef' : 'Not Verified'}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Last Active:</span>
            <span className="info-value">{data.userInfo.lastLoginDate}</span>
          </div>
        </div>
      </div>
      
      <h3>Activity Summary</h3>
      <div className="activity-stats-grid">
        <div className="stats-row">
          <div className="stat-card">
            <h4>Recipes Created</h4>
            <div className="stat-value">{data.activitySummary.recipesCreated}</div>
          </div>
          
          <div className="stat-card">
            <h4>Comments Posted</h4>
            <div className="stat-value">{data.activitySummary.commentsPosted}</div>
          </div>
          
          <div className="stat-card">
            <h4>Ratings Given</h4>
            <div className="stat-value">{data.activitySummary.ratingsGiven}</div>
          </div>
          
          <div className="stat-card">
            <h4>Meal Plans Created</h4>
            <div className="stat-value">{data.activitySummary.mealPlansCreated}</div>
          </div>
        </div>
        
        <div className="stats-row">
          <div className="stat-card">
            <h4>Average Rating Given</h4>
            <div className="stat-value">{data.activitySummary.averageRatingGiven}</div>
            <div className="star-rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <span 
                  key={i} 
                  className={i < Math.round(data.activitySummary.averageRatingGiven) ? "star filled" : "star"}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          
          <div className="stat-card">
            <h4>Average Rating Received</h4>
            <div className="stat-value">{data.activitySummary.averageRatingReceived}</div>
            <div className="star-rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <span 
                  key={i} 
                  className={i < Math.round(data.activitySummary.averageRatingReceived) ? "star filled" : "star"}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          
          <div className="stat-card">
            <h4>Total Recipe Views</h4>
            <div className="stat-value">{data.activitySummary.totalRecipeViews.toLocaleString()}</div>
          </div>
        </div>
      </div>
      
      <h3>Dietary Preferences</h3>
      <div className="dietary-preferences-container">
        {data.dietaryPreferences && data.dietaryPreferences.length > 0 ? (
          <div className="preference-tags">
            {data.dietaryPreferences.map((preference, index) => (
              <span key={index} className="preference-tag">{preference}</span>
            ))}
          </div>
        ) : (
          <p>No dietary preferences set.</p>
        )}
      </div>
      
      <h3>Top Recipes</h3>
      <div className="top-recipes-table">
        {data.topRecipes && data.topRecipes.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Recipe</th>
                <th>Rating</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {data.topRecipes.map(recipe => (
                <tr key={recipe.id}>
                  <td>{recipe.title}</td>
                  <td>
                    <div className="rating-display">
                      {recipe.rating} <span className="star">★</span>
                    </div>
                  </td>
                  <td>{recipe.views.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No recipes created yet.</p>
        )}
      </div>
    </div>
  );
}

export default ReportsPage;