export async function addNewUser(uname: string, email: string) {
    try {
      console.log(uname, email);
      const response = await fetch('/api/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uname, email }),
        credentials: 'include'
      });
  
      
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding new departement:', error);
      return null;
    }
  } 