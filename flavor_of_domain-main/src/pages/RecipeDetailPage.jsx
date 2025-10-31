import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getRecipeById, deleteRecipe } from '../data/recipe';
import { getIngredientsByRecipeId } from '../data/recipeIngredient';
import { getUserRatingForRecipe, insertRating, updateRating } from '../data/rating';
import { insertMealPlans } from '../data/mealPlans';
import { useAuth } from '../contexts/AuthContext';
import StarRating from '../components/recipe/StarRating';
import CommentList from '../components/recipe/CommentList';

function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const { currentUser, isVerifiedChef } = useAuth();
  
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const recipeData = await getRecipeById(id);
        console.log(recipeData)
        if (recipeData) {
          setRecipe(recipeData);
          setUserRating(0);
        } else {
          throw new Error('Recipe not found');
        }
      } catch (err) {
        setError(err.message);
        // Go to not found page
        navigate("*");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);
  
  // Fetch ingredients when recipe is loaded
  useEffect(() => {
    const fetchIngredients = async () => {
      if (!recipe) return;
      
      try {
        // Try to get ingredients for this recipe
        const ingredientsData = await getIngredientsByRecipeId(id);
        console.log(ingredientsData);
        setIngredients(ingredientsData || []);
      } catch (err) {
        console.error("Error fetching ingredients:", err);
      }
    };

    fetchIngredients();
  }, [recipe, id]);

  // Fetch rating when recipe is loaded
  useEffect(() => {
    const fetchRating = async () => {
      if (!currentUser || !recipe) return;

      try {
        const ratingData = await getUserRatingForRecipe(currentUser.email, id)
        console.log(ratingData.number_of_stars);
        setUserRating(ratingData.number_of_stars || 0);
      }catch (err) {
        console.error("Error fetching user rating:", err);
      }
    }

    fetchRating();
  }, [recipe, currentUser])

  const handleRatingChange = async (newRating) => {
    if (!currentUser) {
      alert("Please log in to rate recipes");
      return;
    }
    
    if (userRating == 0){
      // Create new rating
      try {
        console.log("Saving rating:", {
          user_email: currentUser.email,
          recipe_id: parseInt(id, 10),
          number_of_stars: newRating
        });
        
        // Try to insert a new rating
        await insertRating({
          user_email: currentUser.email,
          recipe_id: parseInt(id, 10),
          number_of_stars: newRating
        });
        console.log(`Rating saved: ${newRating} stars for recipe ${id}`);
      } catch (err) {
        console.error('Error saving rating:', err);
      }
    } else {
      // Update existing rating
      try {
        await updateRating({
          user_email: currentUser.email,
          recipe_id: parseInt(id, 10),
          number_of_stars: newRating
        });
        console.log(`Rating updated: ${newRating} stars for recipe ${id}`);
      } catch (updateErr) {
        console.error('Error updating rating:', updateErr);
      }
    }
    setUserRating(newRating);
  };

  const handleAddToMealPlan = async () => {
    if (!currentUser) {
      alert("Please log in to add recipes to your meal plan");
      return;
    }
    
    try {
      const mealPlanData = {
        user_email: currentUser.email,
        recipe_id: parseInt(id, 10)
      };
      
      console.log("Adding to meal plan:", mealPlanData);
      
      await insertMealPlans(mealPlanData);
      alert('Recipe added to your meal plan!');
    } catch (err) {
      console.error('Error adding to meal plan:', err);
      alert(`Failed to add recipe to meal plan. Please try again. Error: ${err.message}`);
    }
  };

  const handleDeleteRecipe = async () => {
    if (!currentUser) return;
    
    // Check if the current user is the creator of the recipe or a chef
    if (recipe.created_by !== currentUser.email && !isVerifiedChef()) {
      alert("You don't have permission to delete this recipe.");
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      try {
        await deleteRecipe(id);
        alert('Recipe deleted successfully!');
        navigate('/recipes');
      } catch (err) {
        console.error('Error deleting recipe:', err);
        alert(`Failed to delete recipe: ${err.message}`);
      }
    }
  };

  const handleApproveRecipe = async () => {
    if (!currentUser || !isVerifiedChef()) return;
    
    // This would be implemented with an API call to approve the recipe
    alert('Recipe approval functionality will be implemented soon!');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading recipe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading recipe: {error}</p>
        <Link to="/recipes" className="back-link">Back to Recipes</Link>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="not-found-container">
        <h2>Recipe not found</h2>
        <p>The recipe you're looking for doesn't exist or has been removed.</p>
        <Link to="/recipes" className="back-link">Browse Recipes</Link>
      </div>
    );
  }

  return (
    <div className="recipe-detail-page">
      <div className="recipe-header">
        <h1>{recipe.name}</h1>
        <div className="recipe-meta">
          {recipe.category_type && (
            <span className="recipe-category">{recipe.category_type}</span>
          )}
          <span className="recipe-author">By {recipe.created_by}</span>
        </div>
      </div>
      
      <div className="recipe-content">
        <div className="recipe-left">
          <div 
            className={`recipe-image ${!recipe.image_url ? 'missing-image' : ''}`}
            style={{ backgroundImage: recipe.image_url ? `url(${recipe.image_url})` : 'none' }}
          >
            {!recipe.image_url && <span>No image available</span>}
          </div>
          
          <div className="recipe-actions">
            {currentUser && (
              <>
                <div className="recipe-rating">
                  <span>Your Rating:</span>
                  <StarRating 
                    rating={userRating} 
                    onChange={handleRatingChange} 
                  />
                </div>
                
                <button 
                  className="recipe-action-btn"
                  onClick={handleAddToMealPlan}
                >
                  <span className="btn-icon">➕</span> Add to Meal Plan
                </button>

                {/* Add delete button if user is the creator or a chef */}
                {(recipe.created_by === currentUser.email || isVerifiedChef()) && (
                  <button 
                    className="recipe-action-btn delete-btn"
                    onClick={handleDeleteRecipe}
                  >
                    <span className="btn-icon">🗑️</span> Delete Recipe
                  </button>
                )}
              </>
            )}
            
            {isVerifiedChef && isVerifiedChef() && (
              <button 
                className="recipe-action-btn approve-btn"
                onClick={handleApproveRecipe}
              >
                <span className="btn-icon">✓</span> Approve Recipe
              </button>
            )}
          </div>
          
          <div className="recipe-description">
            <h3>Description</h3>
            <p>{recipe.description || "No description available."}</p>
          </div>
        </div>
        
        <div className="recipe-right">
          <div className="recipe-ingredients">
            <h3>Ingredients</h3>
            {ingredients && ingredients.length > 0 ? (
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.ingredient_name || ingredient.name}
                    {ingredient.calories && ` (${ingredient.calories} calories)`}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-ingredients-message">No ingredients listed for this recipe.</p>
            )}
          </div>
          
          <div className="recipe-instructions">
            <h3>Instructions</h3>
            <p>{recipe.instructions || "No instructions available."}</p>
          </div>
        </div>
      </div>
      
      <div className="recipe-comments-section">
        <h2>Comments</h2>
        <CommentList recipeId={id} />
      </div>
    </div>
  );
}

export default RecipeDetailPage;