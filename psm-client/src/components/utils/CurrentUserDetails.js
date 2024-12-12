import { ValidateToken } from "./ValidateToken";
import { useNavigate } from "react-router-dom";

const CurrentUserDetails=()=>{

    //function to call api and retrive user data
    async function fetchUserData(username, token) {
        const url = `http://localhost:8080/getUserData?username=${encodeURIComponent(username)}`;
      
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Add the Bearer token in the Authorization header
            }
          });
      
          if (!response.ok) {
            console.log("request failed :: CurrentUserDetails :: "+response)
            throw new Error(`Request failed with status ${response.status}`);
            
          }
      
          // Parse the response as JSON if successful
          const data = await response.json();
          console.log("API Response:CurrentUserDetails :: ", data);
          return data;
        } catch (error) {
          console.error("Error fetching user data:CurrentUserDetails ::", error);
        }
      }

    //retriving current user details from local storage
    const storedAuthData = localStorage.getItem("authData");

        // Parse it back to an object if it exists
        if (storedAuthData!==null) {
        const authData = JSON.parse(storedAuthData);
        return fetchUserData(authData.username, authData.jwttoken)
    
    }

}
export default CurrentUserDetails;