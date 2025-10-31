import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getMealPlansByUserEmail, deleteMealPlans } from '../data/mealPlans';
import { getAllRecipe } from '../data/recipe';

function MealPlansPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [mealPlans, setMealPlans] = useState([]);
  const [recipes, setRecipes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect if not logged in
    if (!currentUser) {
      navigate('/login', { state: { from: '/meal-plans' } });
      return;
    }
    
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch recipes to get details
        const recipesData = await getAllRecipe();
        const recipesMap = {};
        
        // Create a map of recipes by ID for easy lookup
        if (recipesData && Array.isArray(recipesData)) {
          recipesData.forEach(recipe => {
            recipesMap[recipe.recipe_id] = recipe;
          });
        }
        
        setRecipes(recipesMap);
        
        // Get user's meal plans
        const userMealPlans = await getMealPlansByUserEmail(currentUser.email);

        console.log(userMealPlans)
        
        // Enrich meal plans with recipe details
        const enrichedMealPlans = Array.isArray(userMealPlans) 
          ? userMealPlans.map(plan => ({
              ...plan,
              recipe: recipesMap[plan.recipe_id] || {}
            }))
          : [];
        
        setMealPlans(enrichedMealPlans);
        console.log(mealPlans)
      } catch (err) {
        console.error("Error fetching meal plans:", err);
        setError("Failed to load meal plans. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser, navigate]);

  const handleRemoveFromMealPlan = async (recipeId) => {
    if (!currentUser) return;
    
    try {
      await deleteMealPlans({
        user_email: currentUser.email,
        recipe_id: parseInt(recipeId)
      });
      
      // Update state to remove the meal plan
      setMealPlans(prev => prev.filter(plan => plan.recipe_id !== recipeId));
    } catch (err) {
      console.error("Error removing from meal plan:", err);
      setError("Failed to remove recipe from meal plan. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your meal plans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="meal-plans-page">
      <h1>Your Meal Plans</h1>
      
      {mealPlans.length > 0 ? (
        <div className="meal-plans-list">
          {mealPlans.map(plan => (
            <div key={plan.recipe_id} className="meal-plan-item">
              <div className="meal-plan-info">
                <h3>{plan.recipe?.name || 'Recipe'}</h3>
                <p>{plan.recipe?.description || 'No description available'}</p>
                {plan.recipe?.category_type && (
                  <span className="meal-plan-category">{plan.recipe.category_type}</span>
                )}
              </div>
              
              <div className="meal-plan-actions">
                <Link 
                  to={`/recipes/${plan.recipe_id}`} 
                  className="view-recipe-btn"
                >
                  View Recipe
                </Link>
                <button 
                  className="remove-plan-btn"
                  onClick={() => handleRemoveFromMealPlan(plan.recipe_id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-meal-plans">
          <h2>You haven't added any recipes to your meal plan yet.</h2>
          <p>Browse recipes and add them to your meal plan to get started.</p>
          <Link to="/recipes" className="browse-recipes-btn">
            Browse Recipes
          </Link>
        </div>
      )}
    </div>
  );
}

export default MealPlansPage;