function ErrorScreen({ message = 'An error occurred.' }) {
    return (
      <div className="error-screen">
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }
  
  export default ErrorScreen;