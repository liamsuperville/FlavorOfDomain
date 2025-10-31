function LoadingScreen({ message = 'Loading...' }) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <h2>{message}</h2>
      </div>
    );
  }
  
  export default LoadingScreen;