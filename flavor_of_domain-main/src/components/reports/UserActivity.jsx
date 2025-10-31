// src/components/reports/UserActivity.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function UserActivity({ data, timeframe }) {
  if (!data) return null;

  // Format data for chart
  const chartData = data.activityTimeline?.labels.map((label, index) => ({
    date: label,
    users: data.activityTimeline.data[index]
  })) || [];

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
    <div className="report-container user-activity">
      <h2>User Activity Report</h2>
      
      <div className="report-section">
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
      </div>
      
      <div className="report-section">
        <h3>{getChartTitle()}</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                angle={-45} 
                textAnchor="end" 
                height={70} 
                interval={timeframe === 'monthly' ? 2 : 0}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="users" 
                name="Active Users" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="report-section">
        <h3>Activity Insights</h3>
        <div className="insights-container">
          <p>
            This chart displays user activity patterns over the selected time period. 
            Activity includes logins, recipe views, ratings, comments, and other interactions.
          </p>
          <p>
            Understanding these patterns can help identify peak usage times and track the 
            impact of new features or marketing campaigns.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserActivity;