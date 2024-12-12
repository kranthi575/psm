
const ActiveFamilyCid=(familyId)=>{

    async function fetchFamilyCid(familyId,token){

        //calling api to fetch cid
        const url = `http://localhost:8080/getFamilyCid?familyname=${encodeURIComponent(familyId)}`;
      
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}` // Add the Bearer token in the Authorization header
            }
          });
      
          if (!response.ok) {
            console.log("request failed :: ActiveFamilyCid :: "+response.data)
            throw new Error(`ActiveFamilyCid :: Request failed with status ${response.status}`);
            
          }
      
          // Parse the response as JSON if successful
          const data = await response.text();
          console.log("API Response: fetchFamilyCid :: ",data);
          return data;
        } catch (error) {
          console.error("Error fetching Cid: ::", error);
        }

    }

    //retriving the stored auth info
    //retriving current user details from local storage
    const storedAuthData = localStorage.getItem("authData");

        // Parse it back to an object if it exists
        if (storedAuthData!==null) {
        const authData = JSON.parse(storedAuthData);

        console.log("familyId :"+familyId+"  :: auth"+authData.jwttoken)
        return   fetchFamilyCid(familyId, authData.jwttoken)

    
    }



}
export default ActiveFamilyCid;