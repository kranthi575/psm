import React, { useEffect, useState } from 'react';
import LeftSidebar from './LeftSidebar';
import Posts from './Posts';
import RightSidebar from './RightSidebar';
import Validation, { ValidateToken } from '../utils/ValidateToken';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../LeftSidebarComp/CreatePost';
import { useRef } from 'react';
import CurrentUserFamilyIdsPosts from '../utils/CurrentUserFamilyIdsPosts';

const HomePage = () => {
  


  //creating post
  const [isCreatePost,setCreatePostPopUp]=useState(false);
  const [refreshPosts,setrefreshPosts]=useState(false);
  const [createPostStatus,setcreatePostStatus]=useState(null);
  const navigate=useNavigate();

  

   async  function tokenvalidation(){
        const storedAuthData = localStorage.getItem("authData");
        if(storedAuthData==undefined){
          navigate("/")
        }

        // Parse it back to an object if it exists
        if (storedAuthData) {
        const authData = JSON.parse(storedAuthData);
        const response = await ValidateToken(authData.username,authData.jwttoken)
        if(response.status !== 200 ){
              localStorage.setItem("authData",null);
                navigate('/')
        }else{
            console.log("user verified allowed for home page");
        }
        }
    }

    useEffect(()=>{
        tokenvalidation();
     },[]);
    
  return (
    <div className="flex min-h-screen">

        
      {/* Left Sidebar */}
      <LeftSidebar setCreatePostPopUp={setCreatePostPopUp} />

      {/* Middle Section for Posts */}
      
      <CurrentUserFamilyIdsPosts setrefreshPosts={setrefreshPosts} refreshPosts={refreshPosts} />
      {createPostStatus === true ? (
          <>
          
            {alert("Posted successfully!")}
            {setcreatePostStatus(null)}
            {setrefreshPosts(true)}
          </>
        ) : null
      }
      {createPostStatus === false ? (
          <>
            {alert("Error in creating post!")}
            {setcreatePostStatus(null)}
          </>
        ) : null
      }
      
      {isCreatePost?<CreatePost setCreatePostPopUp={setCreatePostPopUp} setcreatePostStatus={setcreatePostStatus}/>:null}

      {/* Right Section for User Info and Suggestions */}
      <RightSidebar />
    </div>
  );
};

export default HomePage;
