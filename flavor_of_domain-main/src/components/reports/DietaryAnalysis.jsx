// src/components/reports/DietaryAnalysis.jsx
import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

function DietaryAnalysis({ data }) {
  if (!data) return null;

  // Format preferences distribution for chart
  const preferencesData = data.preferencesDistribution?.labels.map((label, index) => ({
    name: label,
    value: data.preferencesDistribution.data[index]
  })) || [];

  // Format recipes per dietary preference for chart
  const recipesPerPreferenceData = data.recipesPerDietaryPreference?.labels.map((label, index) => ({
    name: label,
    count: data.recipesPerDietaryPreference.data[index]
  })) || [];

  return (
    <div className="report-container dietary-analysis">
      <h2>Dietary Preference Analysis</h2>
      
      <div className="report-section">
        <h3>Dietary Preferences Distribution</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <Pie
                data={preferencesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {preferencesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="report-section">
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
      </div>
      
      <div className="report-section">
        <h3>Recipes Available Per Dietary Preference</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={recipesPerPreferenceData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
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
              <Bar dataKey="count" name="Number of Recipes" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="report-section">
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
    </div>
  );
}

export default DietaryAnalysis;