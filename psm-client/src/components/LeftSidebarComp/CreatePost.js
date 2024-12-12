import React, { useEffect, useState } from 'react';
import SavePost from './SavePost';
import CurrentUserDetails from '../utils/CurrentUserDetails';

const CreatePost = ({setCreatePostPopUp,setcreatePostStatus}) => {
  // State for controlling popup visibility
  const [isPopupVisible, setPopupVisible] = useState(true);
   // console.log("CreatePost Status::"+isPopupVisible)
  // State for form inputs
  const [postTitle, setPostTitle] = useState('');
  const [familyId, setFamilyId] = useState('');
  const [postContent, setPostContent] = useState('');
  const [familyIds, setFamilyIds] = useState([]); // example family IDs

  async function getFamilyIds(){

    //retriving all family id of particular user
    const userData = await CurrentUserDetails(); // Replace with your actual user data fetching logic

            if (!userData) {
                throw new Error("Missing family ID or JWT token.");
            }else{
              console.log("Createpost familyids"+userData.familyid);
              setFamilyIds((prevFamilyIds) => {
                // Add only if familyid is not already in the array
                if (!prevFamilyIds.includes(userData.familyid)) {
                  return [...prevFamilyIds, userData.familyid];
                }
                return prevFamilyIds; // No changes if it's already present
              });
            }

  }

  async function savepost(){
    try{
    const postStatus=await SavePost(postTitle,postContent,familyId);
     console.log("post created!!"+postStatus)
    if(postStatus===200){
        //console.log("setted response true")
        setcreatePostStatus(true)}
        else{
           // console.log("setted response false")
            setcreatePostStatus(false);
        }

    }catch(error){

        console.log("error in creating post!!");
        setcreatePostStatus(false);
    }
    
    }

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); 
  
    // Close the popup after submission
    setPopupVisible(false);
    setCreatePostPopUp(false);
    
    savepost();
  };

  useEffect(()=>{
    getFamilyIds();
  },[]);
 
  //activating popup
  return (
    <div>
      
     
      {/* Popup Form */}
      {isPopupVisible && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
            <form onSubmit={handleSubmit}>
              {/* Input for Post Title */}
              <div className="mb-4">
                <label htmlFor="postTitle" className="block mb-2">Post Title</label>
                <input
                  type="text"
                  id="postTitle"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter post title"
                />
              </div>

              {/* Select for Family ID */}
              <div className="mb-4">
                <label htmlFor="familyId" className="block mb-2">Select Family ID</label>
                <select
                  id="familyId"
                  value={familyId}
                  onChange={(e) => setFamilyId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Family ID</option>
                  {familyIds.map((fid) => (
                    <option key={fid} value={fid}>
                      {fid}
                    </option>
                  ))}
                </select>
              </div>

              {/* Textarea for Post Content */}
              <div className="mb-4">
                <label htmlFor="postContent" className="block mb-2">Post Content</label>
                <textarea
                  id="postContent"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter post content"
                  rows="4"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => {setPopupVisible(false);setCreatePostPopUp(false);}}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
