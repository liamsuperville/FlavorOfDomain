import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAllRecipe, getAllRecipesForUser } from '../data/recipe';
import RecipeCard from '../components/recipe/RecipeCard';

function HomePage() {
  const { currentUser } = useAuth();
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        setLoading(true);
        const recipesData = (currentUser) ? await getAllRecipesForUser(currentUser.email) : await getAllRecipe();
        setFeaturedRecipes(recipesData.slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedRecipes();
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover & Share Amazing Recipes</h1>
          <p>Join our community of food enthusiasts to find, share, and rate delicious recipes for every occasion.</p>
          <Link to="/recipes" className="cta-button">Explore Recipes</Link>
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured Recipes</h2>
        
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading featured recipes...</p>
          </div>
        )}
        
        {error && (
          <div className="error-container">
            <p>Error loading recipes: {error}</p>
          </div>
        )}
        
        {!loading && !error && featuredRecipes && featuredRecipes.length > 0 && (
          <div className="recipe-grid">
            {featuredRecipes.map((recipe, index) => (
              recipe && <RecipeCard key={recipe.recipe_id || index} recipe={recipe} />
            ))}
          </div>
        )}
        
        {!loading && !error && (!featuredRecipes || featuredRecipes.length === 0) && (
          <div className="no-recipes">
            No featured recipes available yet.
          </div>
        )}
        
        <div className="view-all-container">
          <Link to="/recipes" className="view-all-link">View All Recipes →</Link>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Discover</h3>
            <p>Browse through our collection of recipes from various categories and cuisines.</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>Cook</h3>
            <p>Follow detailed instructions and ingredient lists to prepare delicious meals.</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Share</h3>
            <p>Create an account to rate recipes, leave comments, and share your own creations.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;