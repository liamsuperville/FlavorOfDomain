import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="go-home-btn">
        Go to Homepage
      </Link>
    </div>
  );
}

export default NotFoundPage;