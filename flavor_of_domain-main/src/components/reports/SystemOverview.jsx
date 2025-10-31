// src/components/reports/SystemOverview.jsx
import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

function SystemOverview({ data }) {
  if (!data) return null;
  
  // Transform category distribution for chart
  const categoryData = data.categoryDistribution?.labels.map((label, index) => ({
    name: label,
    value: data.categoryDistribution.data[index]
  })) || [];

  return (
    <div className="report-container system-overview">
      <h2>System Overview</h2>
      
      <div className="report-section">
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
      </div>
      
      <div className="report-section">
        <h3>User Activity</h3>
        <div className="stats-highlight">
          <div className="highlight-value">
            {data.activeUsersLast30Days} active users in last 30 days
            <span className="percentage">
              ({Math.round((data.activeUsersLast30Days / data.totalUsers) * 100)}% of total)
            </span>
          </div>
        </div>
      </div>
      
      <div className="report-section">
        <h3>Recipe Categories Distribution</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={70} 
                interval={0}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Number of Recipes" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="report-section">
        <h3>Dietary Preferences</h3>
        <div className="stats-highlight">
          <div className="highlight-value">
            {data.dietaryPreferences} dietary preferences available
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemOverview;