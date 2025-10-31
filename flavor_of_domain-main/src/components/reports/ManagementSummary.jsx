// src/components/reports/ManagementSummary.jsx
import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ManagementSummary({ data }) {
  if (!data) return null;

  // Format user growth data for chart
  const userGrowthData = data.userGrowth.labels.map((label, index) => ({
    month: label,
    users: data.userGrowth.data[index]
  }));

  // Format content growth data for chart
  const contentGrowthData = data.contentGrowth.labels.map((label, index) => ({
    month: label,
    recipes: data.contentGrowth.data[index]
  }));

  return (
    <div className="report-container management-summary">
      <h2>Management Summary Report</h2>
      
      <div className="report-section">
        <h3>Growth Metrics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>User Growth</h4>
            <div className="stat-value">{data.userGrowth.growthRate}</div>
            <div className="stat-detail">
              <div>From {data.userGrowth.data[0]} to {data.userGrowth.data[data.userGrowth.data.length - 1]} users</div>
            </div>
          </div>
          
          <div className="stat-card">
            <h4>Content Growth</h4>
            <div className="stat-value">{data.contentGrowth.growthRate}</div>
            <div className="stat-detail">
              <div>From {data.contentGrowth.data[0]} to {data.contentGrowth.data[data.contentGrowth.data.length - 1]} recipes</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="report-section">
        <h3>User Growth Trend</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="users" 
                name="Total Users" 
                stroke="#8884d8" 
                strokeWidth={2}
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="report-section">
        <h3>Content Growth Trend</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={contentGrowthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="recipes" 
                name="Total Recipes" 
                stroke="#82ca9d" 
                strokeWidth={2}
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="report-section">
        <h3>Engagement Metrics</h3>
        <div className="engagement-stats">
          <div className="engagement-stat">
            <span className="label">Comments Per Recipe:</span>
            <span className="value">{data.engagementMetrics.commentsPerRecipe}</span>
          </div>
          <div className="engagement-stat">
            <span className="label">Ratings Per Recipe:</span>
            <span className="value">{data.engagementMetrics.ratingsPerRecipe}</span>
          </div>
          <div className="engagement-stat">
            <span className="label">Average User Session:</span>
            <span className="value">{data.engagementMetrics.averageUserSession}</span>
          </div>
          <div className="engagement-stat">
            <span className="label">Return Rate:</span>
            <span className="value">{data.engagementMetrics.returnRate}</span>
          </div>
        </div>
      </div>
      
      <div className="report-section">
        <h3>Moderation Activity</h3>
        <div className="moderation-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Comments Flagged</h4>
              <div className="stat-value">{data.moderationActivity.commentsFlagged}</div>
            </div>
            
            <div className="stat-card">
              <h4>Comments Removed</h4>
              <div className="stat-value">{data.moderationActivity.commentsRemoved}</div>
            </div>
            
            <div className="stat-card">
              <h4>Users Verified</h4>
              <div className="stat-value">{data.moderationActivity.usersVerified}</div>
            </div>
            
            <div className="stat-card">
              <h4>Recipes Approved</h4>
              <div className="stat-value">{data.moderationActivity.recipesApproved}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="report-section">
        <h3>Platform Health</h3>
        <div className="platform-health-stats">
          <div className="health-stat">
            <span className="label">Uptime:</span>
            <span className="value">{data.platformHealth.uptime}</span>
          </div>
          <div className="health-stat">
            <span className="label">Average Response Time:</span>
            <span className="value">{data.platformHealth.averageResponseTime}</span>
          </div>
          <div className="health-stat">
            <span className="label">Error Rate:</span>
            <span className="value">{data.platformHealth.errorRate}</span>
          </div>
          <div className="health-stat">
            <span className="label">API Calls Per Day:</span>
            <span className="value">{data.platformHealth.apiCallsPerDay.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="report-section">
        <h3>Insights and Recommendations</h3>
        <div className="insights-container">
          <div className="insight-item">
            <h4>User Growth</h4>
            <p>
              The platform has shown a steady growth rate of {data.userGrowth.growthRate} over the past few months.
              To maintain this trajectory, consider implementing referral programs and enhanced social sharing features.
            </p>
          </div>
          
          <div className="insight-item">
            <h4>Content Quality</h4>
            <p>
              With an average of {data.engagementMetrics.commentsPerRecipe} comments and {data.engagementMetrics.ratingsPerRecipe} ratings per recipe,
              user engagement is strong. Focus on encouraging more professional chef verifications to enhance content quality further.
            </p>
          </div>
          
          <div className="insight-item">
            <h4>Platform Performance</h4>
            <p>
              The platform maintains a healthy {data.platformHealth.uptime} uptime with an average response time of {data.platformHealth.averageResponseTime}.
              Continue monitoring error rates and optimize database queries for frequently accessed content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagementSummary;