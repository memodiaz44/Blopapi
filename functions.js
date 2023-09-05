export async function sendCommentToServer(commentData) {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
  
      if (response.ok) {
        console.log('Comment saved successfully');
        // Perform any UI updates you want
      } else {
        console.error('Failed to save comment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  