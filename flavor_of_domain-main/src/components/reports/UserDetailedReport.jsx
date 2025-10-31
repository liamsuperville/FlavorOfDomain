// src/components/reports/UserDetailedReport.jsx
import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function UserDetailedReport({ data }) {
  if (!data) return null;

  // Format activity data for chart
  const activityData = [
    { name: 'Recipes', value: data.activitySummary.recipesCreated },
    { name: 'Comments', value: data.activitySummary.commentsPosted },
    { name: 'Ratings', value: data.activitySummary.ratingsGiven },
    { name: 'Meal Plans', value: data.activitySummary.mealPlansCreated }
  ];

  return (
    <div className="report-container user-detailed">
      <h2>User Detailed Report</h2>
      
      <div className="report-section">
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
      </div>
      
      <div className="report-section">
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
        
        <div className="activity-chart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="report-section">
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
      </div>
      
      <div className="report-section">
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
    </div>
  );
}

export default UserDetailedReport;