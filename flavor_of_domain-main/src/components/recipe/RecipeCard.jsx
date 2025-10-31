// src/components/recipe/RecipeCard.jsx
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  if (!recipe) {
    return null; // Prevent rendering if recipe is undefined
  }
  
  const { recipe_id, name, description, category_type, created_by, image_url } = recipe;

  return (
    <Link to={`/recipes/${recipe_id}`} className="recipe-card">
      <div 
        className="recipe-image" 
        style={{ backgroundImage: `url(${image_url})` }}
      >
        {category_type && <span className="recipe-category">{category_type}</span>}
      </div>
      <div className="recipe-content">
        <h3>{name || 'Unnamed Recipe'}</h3>
        <p className="recipe-description">
          {description && description.length > 100 
            ? `${description.substring(0, 100)}...` 
            : description || 'No description available'}
        </p>
        <div className="recipe-card-footer">
          <span className="recipe-author">By {created_by || 'Unknown'}</span>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;