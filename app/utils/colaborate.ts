export async function colaborate(departement: string) {
    try {
      console.log(departement);
      const response = await fetch('/api/colaborate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ departement }),
        credentials: 'include'
      });
  
      
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in colaboration:', error);
      return null;
    }
  } 