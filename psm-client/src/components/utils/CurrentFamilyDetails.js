const CurrentFamilyDetails=(familyid)=>{

    //calling api to fetch family groups user presents 
    //calling api to fetch individual family group memebers

    //return one map two lists inside it : one list contains family groups and othe list contains family group memebers
    // { family_groups:[], family_group_members:[]}
    const currentFamilyDetails={};

    async function getFamilyGrps(username,jwttoken){
        //pass userid/email and jwt token through api
        //return all familyids of particular user
        //add all to one list


    }

    async function getFamilyGrpMembers(familyid,jwtToken){
        //pass familyid and jwttoken through api 
        //return all users assigned with that familyID

        
            const url = `http://localhost:8080/getFamilyIdUsers?familyid=${encodeURIComponent(familyid)}`; // Replace with your API endpoint
          
            try {
              const response = await fetch(url, {
                method: 'GET', // Or 'POST' depending on your API
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                  'Content-Type': 'application/json',
                },
              });
          
              if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
              }
          
              const data = await response.json(); // Assuming the response contains a list of users
              return data; // Return the list of users
            } catch (error) {
              console.error('Error fetching users:', error);
              return []; // Return an empty array in case of an error
            }
        
          
        //return as list
    }



    //retriving current user details from local storage
    const storedAuthData = localStorage.getItem("authData");

        // Parse it back to an object if it exists
        if (storedAuthData!==null) {
        const authData = JSON.parse(storedAuthData);
        
        //calling getFamilyGrps
         const family_groups_list= getFamilyGrpMembers(familyid,authData.jwttoken);

         
         return family_groups_list;
        //     currentFamilyDetails.add({"familyGrps":family_groups_list})

        //  //passing one by one familyid
        //  family_groups_list.map((famId)=>{

        //  });
        }

}
export default CurrentFamilyDetails;