import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAllCategory } from '../data/category';
import { getAllIngredient } from '../data/ingredient';
import { getRecipeById, insertRecipe, updateRecipe } from '../data/recipe';
import { getIngredientsByRecipeId, insertRecipeIngredient, deleteRecipeIngredient } from '../data/recipeIngredient';

function RecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [categories, setCategories] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    image_url: '',
    description: '',
    instructions: '',
    category_type: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: id ? `/recipes/edit/${id}` : '/recipes/create' } });
    }
  }, [currentUser, navigate, id]);

  // Fetch categories and ingredients when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch categories
        let categoriesData = [];
        try {
          categoriesData = await getAllCategory();
          console.log("Categories loaded:", categoriesData);
        } catch (catErr) {
          console.error("Error loading categories:", catErr);
        }
        
        // Fetch ingredients
        let ingredientsData = [];
        try {
          ingredientsData = await getAllIngredient();
          console.log("Ingredients loaded:", ingredientsData);
        } catch (ingErr) {
          console.error("Error loading ingredients:", ingErr);
        }
        
        // Ensure data is an array
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setAllIngredients(Array.isArray(ingredientsData) ? ingredientsData : []);
        
        // Check if data is missing
        let errorMsg = "";
        if (Array.isArray(categoriesData) && categoriesData.length === 0) {
          errorMsg += "No categories found in the database. ";
        }
        
        if (Array.isArray(ingredientsData) && ingredientsData.length === 0) {
          errorMsg += "No ingredients found in the database. ";
        }
        
        if (errorMsg) {
          setError(errorMsg + "Please ensure your database is properly populated.");
        }
        
        // If editing existing recipe, fetch its data
        if (id) {
          try {
            const recipeData = await getRecipeById(id);
            if (recipeData) {
              // Set form data from recipe
              setFormData({
                name: recipeData.name || '',
                image_url: recipeData.image_url || '',
                description: recipeData.description || '',
                instructions: recipeData.instructions || '',
                category_type: recipeData.category_type || '',
              });
              
              // Fetch recipe ingredients
              try {
                const recipeIngredients = await getIngredientsByRecipeId(id);
                if (recipeIngredients && recipeIngredients.length > 0) {
                  const ingredientNames = recipeIngredients.map(
                    ing => ing.ingredient_name || ing.name
                  );
                  setSelectedIngredients(ingredientNames);
                  setCurrentIngredients(ingredientNames);
                }
              } catch (ingredientsErr) {
                console.error("Error loading recipe ingredients:", ingredientsErr);
              }
            }
          } catch (recipeErr) {
            console.error("Error loading recipe:", recipeErr);
            setError('Recipe not found or could not be loaded');
          }
        }
      } catch (err) {
        console.error('Error in data fetching:', err);
        setError('Failed to load necessary data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIngredientToggle = (ingredientName) => {
    setSelectedIngredients(prev => {
      if (prev.includes(ingredientName)) {
        return prev.filter(name => name !== ingredientName);
      } else {
        return [...prev, ingredientName];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    // Validation
    if (!formData.name.trim()) {
      setError("Recipe name is required");
      return;
    }
    
    if (!formData.category_type) {
      setError("Please select a category");
      return;
    }
    
    if (!formData.description.trim()) {
      setError("Description is required");
      return;
    }
    
    if (!formData.instructions.trim()) {
      setError("Instructions are required");
      return;
    }
    
    if (selectedIngredients.length === 0) {
      setError("Please select at least one ingredient");
      return;
    }
    
    if (!currentUser) {
      setError("You must be logged in to create or edit recipes");
      return;
    }
    
    try {
      setSubmitting(true);
      
      const recipeData = {
        ...formData,
        created_by: currentUser.email,
      };
      
      let recipeId;
      console.log(id)
      if (id) {
        // Update existing recipe
        recipeData.recipe_id = parseInt(id, 10);
        await updateRecipe(recipeData);
        recipeId = id;
        setSuccess("Recipe updated successfully!");
      } else {
        // Create new recipe
        console.log(recipeData)
        const result = await insertRecipe(recipeData);
        console.log(result)
        recipeId = result.recipe_id;
        setSuccess("Recipe created successfully!");
      }
      
      // Handle ingredients
      // Remove ingredients that were deselected
      for (const ingredient of currentIngredients) {
        if (!selectedIngredients.includes(ingredient)) {
          await deleteRecipeIngredient({
            recipe_id: parseInt(recipeId, 10),
            ingredient_name: ingredient
          });
        }
      }

      console.log(`selectedIngredients ${selectedIngredients}`)
      console.log(`recipeId ${recipeId}`)
      
      // Add new ingredients
      for (const ingredient of selectedIngredients) {
        if (!currentIngredients.includes(ingredient)) {
          await insertRecipeIngredient({
            recipe_id: parseInt(recipeId, 10),
            ingredient_name: ingredient
          });
        }
      }
      
      // Navigate to the recipe detail page after successful submission
      setTimeout(() => {
        navigate(`/recipes/${recipeId}`);
      }, 2000);
    } catch (err) {
      console.error('Error saving recipe:', err);
      setError(`Failed to save recipe: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading recipe data...</p>
      </div>
    );
  }

  return (
    <div className="recipe-form-page">
      <h1>{id ? 'Edit Recipe' : 'Create New Recipe'}</h1>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form className="recipe-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Recipe Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image_url">Image Link (optional)</label>
          <input
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          ></input>
        </div>
        
        <div className="form-group">
          <label htmlFor="category_type">Category</label>
          <select
            id="category_type"
            name="category_type"
            value={formData.category_type}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.type} value={category.type}>
                {category.type}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
        </div>
        
        <div className="form-group">
          <label>Ingredients</label>
          {allIngredients.length === 0 ? (
            <p className="error-message">No ingredients available. Please add ingredients to the database first.</p>
          ) : (
            <div className="ingredients-selection">
              {allIngredients.map(ingredient => (
                <div key={ingredient.name} className="ingredient-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedIngredients.includes(ingredient.name)}
                      onChange={() => handleIngredientToggle(ingredient.name)}
                    />
                    {ingredient.name} {ingredient.calories ? `(${ingredient.calories} calories)` : ''}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={() => navigate(-1)} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="save-btn" disabled={submitting}>
            {submitting ? 'Saving...' : (id ? 'Update Recipe' : 'Create Recipe')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RecipeForm;