export async function shareWithUser(fileId: number, email: string) {
    try {
      console.log(fileId, email);
      const response = await fetch('/api/shareToReceiver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileId, email }),
        credentials: 'include'
      });
  
      
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding new departement:', error);
      return null;
    }
  } 