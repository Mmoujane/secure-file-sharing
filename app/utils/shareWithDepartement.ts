export async function shareWithDepatement(fileId: number) {
    try {
      console.log(fileId);
      const response = await fetch('/api/shareToDepartement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileId }),
        credentials: 'include'
      });
  
      
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding new departement:', error);
      return null;
    }
  } 