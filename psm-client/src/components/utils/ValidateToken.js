// authUtils.js
export async function ValidateToken(username, jwttoken) {
    const url = `http://localhost:8080/validateToken?username=${encodeURIComponent(username)}&jwttoken=${encodeURIComponent(jwttoken)}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return response;
  
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  }
  