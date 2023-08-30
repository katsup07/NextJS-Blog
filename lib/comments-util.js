export async function postComment(commentData){
  const response = await fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({commentData}),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const responseData = await response.json();
  if(!response.ok)
    throw new Error(responseData.message ||  'Something went wrong when adding a comment.');
  
  return responseData;
}

export async function filterCommentsByPostId(id){
 const allComments = await getComments();
 return allComments.data.filter(comment => comment.postId === id).reverse();
}

export async function getComments(){
  const response = await fetch('/api/comment');
  const responseData = await response.json();

  if(!response.ok)
    throw new Error(responseData.message || 'Something went wrong when getting comments.');

  return responseData;
}