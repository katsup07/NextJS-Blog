export async function sendContactData(contactDetails){
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    }
  });


  const responseData = await response.json();
  if(!response.ok)
    throw new Error(responseData.message || 'Something went wrong when sending a message.');
  
  return responseData;
}