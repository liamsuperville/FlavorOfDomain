import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUsers } from '../data/users';
import { getAllRecipe } from '../data/recipe';
import { getAllComment } from '../data/comment';
import { getAllCategory } from '../data/category';
import { getAllDietaryPreference } from '../data/dietaryPreference';
import { insertAdmin } from '../data/admin';
import { useLoading } from '../contexts/LoadingContext';

// Admin Sub-Components
function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { response, error } = await getUsers();
        
        if (error) {
          throw new Error(error.message);
        }
        
        setUsers(response || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleVerifyUser = (email) => {
    // TODO: Implement API call to verify user
    setUsers(prev => 
      prev.map(user => 
        user.email === email 
          ? { ...user, verified: 1 } 
          : user
      )
    );
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-tab-content">
      <h2>Manage Users</h2>
      
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Birthday</th>
              <th>Chef Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.birthday}</td>
                <td>
                  {user.verified === 1 
                    ? <span className="status verified">Verified</span> 
                    : <span className="status not-verified">Not Verified</span>}
                </td>
                <td className="table-actions">
                  {user.verified !== 1 && (
                    <button 
                      className="verify-btn"
                      onClick={() => handleVerifyUser(user.email)}
                    >
                      Verify as Chef
                    </button>
                  )}
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RecipesManagement() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { response, error } = await getAllRecipe();
        
        if (error) {
          throw new Error(error.message);
        }
        
        setRecipes(response || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-tab-content">
      <h2>Manage Recipes</h2>
      
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map(recipe => (
              <tr key={recipe.recipe_id}>
                <td>{recipe.recipe_id}</td>
                <td>{recipe.name}</td>
                <td>{recipe.category_type}</td>
                <td>{recipe.created_by}</td>
                <td className="table-actions">
                  <button className="approve-btn">Approve</button>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CommentsManagement() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { response, error } = await getAllComment();
        
        if (error) {
          throw new Error(error.message);
        }
        
        setComments(response || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-tab-content">
      <h2>Manage Comments</h2>
      
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Comment</th>
              <th>User</th>
              <th>Recipe ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(comment => (
              <tr key={comment.comment_id}>
                <td>{comment.comment_id}</td>
                <td className="comment-text">{comment.text}</td>
                <td>{comment.user_email}</td>
                <td>{comment.recipe_id}</td>
                <td className="table-actions">
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CategoriesManagement() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { response, error } = await getAllCategory();
        
        if (error) {
          throw new Error(error.message);
        }
        
        setCategories(response || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    
    // TODO: Implement API call to add category
    
    // For now, just update the state
    setCategories(prev => [...prev, { type: newCategory }]);
    setNewCategory('');
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-tab-content">
      <h2>Manage Categories</h2>
      
      <form className="add-category-form" onSubmit={handleAddCategory}>
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button type="submit">Add Category</button>
      </form>
      
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.type}>
                <td>{category.type}</td>
                <td className="table-actions">
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DietaryPreferencesManagement() {
  const [preferences, setPreferences] = useState([]);
  const [newPreference, setNewPreference] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const { response, error } = await getAllDietaryPreference();
        
        if (error) {
          throw new Error(error.message);
        }
        
        setPreferences(response || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  const handleAddPreference = (e) => {
    e.preventDefault();
    if (!newPreference.trim()) return;
    
    // TODO: Implement API call to add dietary preference
    
    // For now, just update the state
    setPreferences(prev => [...prev, { name: newPreference }]);
    setNewPreference('');
  };

  if (loading) return <div>Loading dietary preferences...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-tab-content">
      <h2>Manage Dietary Preferences</h2>
      
      <form className="add-category-form" onSubmit={handleAddPreference}>
        <input
          type="text"
          placeholder="New dietary preference"
          value={newPreference}
          onChange={(e) => setNewPreference(e.target.value)}
        />
        <button type="submit">Add Preference</button>
      </form>
      
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Preference Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {preferences.map(preference => (
              <tr key={preference.name}>
                <td>{preference.name}</td>
                <td className="table-actions">
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NewAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [ssn, setSsn] = useState('');
  const [birthday, setBirthday] = useState('');
  const [error, setError] = useState('');
  const { startLoading, stopLoading } = useLoading();

  const handleNewAdmin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    startLoading('Creating new Admin...');
    
    try {
      const userData = {
        email: email,
        password: password,
        name: name,
        birthday: birthday,
        ssn: ssn,
      };
      console.log(userData);
      await insertAdmin(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="admin-tab-content">
      <h2>Create New Admin User</h2>

      {error && <div className="error-message">{error}</div>}
      <form className="auth-form" onSubmit={handleNewAdmin}>
        <div className="form-group">
          <label htmlFor="email">Email </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password </label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name </label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthday">Birthday </label>
          <input
            type="date"
            placeholder="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ssn">SSN </label>
          <input
            type="number"
            placeholder="ssn"
            value={ssn}
            onChange={(e) => setSsn(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

// Main Admin Dashboard Component
function AdminDashboard() {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not an admin
    if (!currentUser || !isAdmin()) {
      navigate('/');
    }
  }, [currentUser, isAdmin, navigate]);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="admin-tabs">
        <NavLink 
          to="/admin" 
          end
          className={({isActive}) => 
            `admin-tab ${isActive ? 'active' : ''}`
          }
        >
          Users
        </NavLink>
        
        <NavLink 
          to="/admin/recipes" 
          className={({isActive}) => 
            `admin-tab ${isActive ? 'active' : ''}`
          }
        >
          Recipes
        </NavLink>
        
        <NavLink 
          to="/admin/comments" 
          className={({isActive}) => 
            `admin-tab ${isActive ? 'active' : ''}`
          }
        >
          Comments
        </NavLink>
        
        <NavLink 
          to="/admin/categories" 
          className={({isActive}) => 
            `admin-tab ${isActive ? 'active' : ''}`
          }
        >
          Categories
        </NavLink>
        
        <NavLink 
          to="/admin/dietary-preferences" 
          className={({isActive}) => 
            `admin-tab ${isActive ? 'active' : ''}`
          }
        >
          Dietary Preferences
        </NavLink>

        <NavLink 
          to="/admin/newAdmin" 
          className={({isActive}) => 
            `admin-tab ${isActive ? 'active' : ''}`
          }
        >
          Create New Admin
        </NavLink>
      </div>
      
      <Routes>
        <Route path="/" element={<UsersManagement />} />
        <Route path="/recipes" element={<RecipesManagement />} />
        <Route path="/comments" element={<CommentsManagement />} />
        <Route path="/categories" element={<CategoriesManagement />} />
        <Route path="/dietary-preferences" element={<DietaryPreferencesManagement />} />
        <Route path="/newAdmin" element={<NewAdmin />} />
      </Routes>
    </div>
  );
}

export default AdminDashboard;