import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLoading } from '../contexts/LoadingContext';
import DietaryPreferences from '../components/user/DietaryPreferences';
import { updateUser , deleteUser} from '../data/users';
import { useNavigate } from 'react-router-dom';
import Activity from '../components/user/Activity';

function ProfilePage() {
  const { currentUser, isVerifiedChef, logout, login} = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    birthday: currentUser?.birthday || ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    startLoading('Updating profile...');
    
    try {
      const userData = {
        email: formData.email,
        password: currentUser.password,
        name: formData.name,
        birthday: formData.birthday,
        verified: currentUser.verified
      };
      await updateUser(userData)
      login(userData.email,userData.password)
      navigate('/profile')

      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      stopLoading();
    }
  };

  const navigate = useNavigate();
  const handleDeleteAccount = () => {
    deleteUser(currentUser.email)
    logout();
    navigate('/');
  };

  return (
    <div className="profile-page">
      <h1>Your Profile</h1>
      
      <section className="profile-section">
        <h2>Profile Information</h2>
        
        <div className="profile-info">
          <div className="info-group">
            <span className="info-label">Email:</span>
            <span>{currentUser?.email}</span>
          </div>
          
          <div className="info-group">
            <span className="info-label">Name:</span>
            <span>{currentUser?.name}</span>
          </div>
          
          <div className="info-group">
            <span className="info-label">Birthday:</span>
            <span>{currentUser?.birthday}</span>
          </div>
          
          <div className="info-group">
            <span className="info-label">Chef Status:</span>
            <span className={`status ${isVerifiedChef() ? 'verified' : 'not-verified'}`}>
              {isVerifiedChef() ? 'Verified Chef' : 'Not Verified'}
            </span>
          </div>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>
          
          <button type="submit" className="save-profile-btn">
            Save Changes
          </button>
        </form>
        <button onClick={handleDeleteAccount} className="delete-acc-btn">Delete Account</button>
      </section>
      
      <section className="profile-section">
        <DietaryPreferences />
      </section>
      
      <section className="profile-section">
        <Activity />
      </section>
    </div>
  );
}

export default ProfilePage;