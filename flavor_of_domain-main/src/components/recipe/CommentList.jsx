import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getAllComment, insertComment, deleteComment } from '../../data/comment';

function CommentList({ recipeId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const commentsData = await getAllComment();
        
        // Filter comments for this recipe
        const recipeComments = commentsData.filter(
          comment => comment.recipe_id === parseInt(recipeId, 10)
        );
        
        setComments(recipeComments || []);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [recipeId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert('Please log in to post a comment');
      return;
    }
    
    if (!newComment.trim()) {
      return;
    }
    
    // Generate a random ID for the comment 
    const tempId = Date.now();
    
    try {
      const commentData = {
        comment_id: tempId,
        text: newComment,
        images: null,
        user_email: currentUser.email,
        recipe_id: parseInt(recipeId, 10),
        monitored_by: null
      };
      
      console.log("Posting comment:", commentData);
      await insertComment(commentData);
      
      // Add the new comment to the list
      setComments([...comments, commentData]);
      
      // Clear the form
      setNewComment('');
    } catch (err) {
      console.error("Error posting comment:", err);
      alert(`Error posting comment: ${err.message}`);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!currentUser) return;
    
    try {
      await deleteComment(commentId);
      
      // Remove the comment from the list
      setComments(comments.filter(comment => comment.comment_id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
      alert(`Error deleting comment: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="comments-loading">
        Loading comments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="comments-error">
        Error loading comments: {error}
      </div>
    );
  }

  return (
    <div className="comments-container">
      {currentUser && (
        <div className="comment-form">
          <h3>Add a Comment</h3>
          <form onSubmit={handleSubmitComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts about this recipe..."
              required
            ></textarea>
            <button type="submit" className="submit-comment-btn">
              Post Comment
            </button>
          </form>
        </div>
      )}
      
      <div className="comments-list">
        <h3>{comments.length > 0 ? `Comments (${comments.length})` : 'No comments yet'}</h3>
        
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.comment_id} className="comment">
              <p>{comment.text}</p>
              <div className="comment-author">
                {comment.user_email}
              </div>
              {currentUser && currentUser.email === comment.user_email && (
                <button 
                  onClick={() => handleDeleteComment(comment.comment_id)}
                  className="delete-comment-btn"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="no-comments">
            Be the first to share your thoughts on this recipe!
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentList;