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
          </div>
        </div>
        
        <div className="stat-card">
          <h4>Total Recipes</h4>
          <div className="stat-value">{data.totalRecipes}</div>
        </div>
        
        <div className="stat-card">
          <h4>Total Comments</h4>
          <div className="stat-value">{data.totalComments}</div>
        </div>
        
        <div className="stat-card">
          <h4>Dietary Preferences</h4>
          <div className="stat-value">{data.dietaryPreferences}</div>
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
    </div>
  );
}

// User Activity Report Component
function UserActivityReport({ data, timeframe }) {
  if (!data) return null;

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
          <h4>Total Recipes</h4>
          <div className="stat-value">{data.totalRecipes}</div>
        </div>
        
        <div className="stat-card">
          <h4>Total Comments</h4>
          <div className="stat-value">{data.totalComments}</div>
        </div>
        
        <div className="stat-card">
          <h4>Total Meal Plans</h4>
          <div className="stat-value">{data.totalMealPlans}</div>
        </div>
      </div>
      
      <h3>Time-based Activity ({timeframe})</h3>
      <div className="insights-container">
        <p>

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
          <h4>Verified Chefs</h4>
          <div className="stat-value">{data.verifiedChefs}</div>
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
    </div>
  );
}

// Dietary Analysis Report Component
function DietaryAnalysisReport({ data }) {
  if (!data) return null;

  return (
    <div>
      <h2>Dietary Preference Analysis</h2>
      
      <h3>Available Dietary Preferences</h3>
      <div className="simple-data-table">
        <table className="data-table">
          <thead>
            <tr>
              <th>Preference Name</th>
            </tr>
          </thead>
          <tbody>
            {data.dietaryPreferences?.map((preference, index) => (
              <tr key={index}>
                <td>{preference.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <h3>Dietary Preference Notes</h3>
      <div className="insights-container">
        <p>

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
            <span className="info-label">Birthday:</span>
            <span className="info-value">{data.userInfo.birthday}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Chef Status:</span>
            <span className={`status-badge ${data.userInfo.isVerifiedChef ? 'verified' : 'not-verified'}`}>
              {data.userInfo.isVerifiedChef ? 'Verified Chef' : 'Not Verified'}
            </span>
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
            <h4>Meal Plans Created</h4>
            <div className="stat-value">{data.activitySummary.mealPlansCreated}</div>
          </div>
        </div>
      </div>
      
      <h3>User's Recipes</h3>
      <div className="user-recipes">
        {data.recipes && data.recipes.length > 0 ? (
          <div className="simple-data-table">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Recipe Name</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {data.recipes.map((recipe, index) => (
                  <tr key={index}>
                    <td>{recipe.name}</td>
                    <td>{recipe.category_type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No recipes created by this user.</p>
        )}
      </div>

      <h3>User's Comments</h3>
      <div className="user-comments">
        {data.comments && data.comments.length > 0 ? (
          <div className="simple-data-table">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Recipe ID</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {data.comments.map((comment, index) => (
                  <tr key={index}>
                    <td>{comment.recipe_id}</td>
                    <td>{comment.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No comments posted by this user.</p>
        )}
      </div>

      <h3>User's Meal Plans</h3>
      <div className="user-meal-plans">
        {data.mealPlans && data.mealPlans.length > 0 ? (
          <div className="simple-data-table">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Recipe ID</th>
                </tr>
              </thead>
              <tbody>
                {data.mealPlans.map((plan, index) => (
                  <tr key={index}>
                    <td>{plan.recipe_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No meal plans created by this user.</p>
        )}
      </div>
    </div>
  );
}

export default ReportsPage;