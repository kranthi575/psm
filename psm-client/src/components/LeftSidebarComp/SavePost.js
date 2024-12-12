const SavePost=(postTitle,postContent,familyId)=>{


  //const [post,po]=savePost();
     //retriving current user details from local storage
     const storedAuthData = localStorage.getItem("authData");

     // Parse it back to an object if it exists
     if (storedAuthData!==null) {
     const authData = JSON.parse(storedAuthData);
     
     return savePost(postTitle,postContent,authData.username,familyId, authData.jwttoken);
    }

    async function savePost(postTitle, postDesc, postOwner, postFamily, jwtToken) {
        const baseUrl = "http://localhost:8080/savepost"; // Replace with your actual API endpoint
      
        console.log("savepost"+jwtToken);
        // Construct the request body
        const requestBody = {
          postTitle,
          postDesc,
          postOwner,
          postFamily,
        };
      
       // console.log("SavePost request body"+postDesc)
        try {
          // Make the API call
          const response = await fetch(baseUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Specify JSON content type
              Authorization: `Bearer ${jwtToken}`, // Add Bearer token for authorization
            },
            body: JSON.stringify(requestBody), // Convert the body to JSON string
          });
      
          // Check if the response is successful
          if (response.status==200) {
            const data = await response.text();
            // console.log("Post saved successfully:", data);
            // console.log("post response"+response.status)
            return response.status; // Return response data if needed
          } else {
            console.error("Failed to save post. Status:", response.status);
            const errorData = await response.json();
            console.error("Error details:", errorData);
            //throw new Error(errorData.message || "Error saving post");
            return response.status;
          }
        } catch (error) {
          console.error("Error in savePost:", error.message);
          throw error; // Re-throw error for caller to handle
        }
      }
      
      

}
export default SavePost;