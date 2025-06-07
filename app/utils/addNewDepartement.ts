export async function addNewDepartement(departement: string, admin: string, email: string) {
    try {
      console.log(departement, admin, email);
      const response = await fetch('/api/addDepartement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ departement, admin, email }),
        credentials: 'include'
      });
  
      
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding new departement:', error);
      return null;
    }
  } 