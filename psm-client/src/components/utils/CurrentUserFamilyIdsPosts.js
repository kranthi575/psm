import React, { useEffect, useState } from 'react';
import CurrentUserDetails from './CurrentUserDetails';

const CurrentUserFamilyIdsPosts = ({setrefreshPosts,refreshPosts}) => {


    console.log("currentfamilyid posts ::"+refreshPosts);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    // Function to fetch posts from the API
    const fetchPostsFromAPI = async (familyid, jwtToken) => {
        const apiUrl = `http://localhost:8080/getFamilyIdPosts?familyid=${encodeURIComponent(familyid)}`;
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("No posts Found!!");
            //throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    };

    // Function to fetch posts data
    const fetchPosts = async () => {
        try {
            const authData = localStorage.getItem("authData");
            if (!authData) throw new Error("No authData found.");

            const parsedAuthData = JSON.parse(authData);
            const userData = await CurrentUserDetails(); // Replace with your actual user data fetching logic

            if (!userData.familyid || !parsedAuthData.jwttoken) {
                throw new Error("Missing family ID or JWT token.");
            }

            const postsData = await fetchPostsFromAPI(userData.familyid, parsedAuthData.jwttoken);
            setPosts(postsData); // Save fetched posts to state
            setError(null);
        } catch (error) {
            console.error("Error fetching posts:", error.message);
            setError(error.message);
        }
    };

    // Fetch posts when component mounts
    useEffect(() => {
        fetchPosts();
        // Function to update the time
        setrefreshPosts(false);
        
    }, [refreshPosts]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Posts</h3>
      
        {error!==null && (
          <p className="text-red-500 text-sm mb-4">Error: {error}</p>
        )}
      
        {posts.length > 0 ? (
          <ul className="space-y-4">
            {posts.map((post) => {
              // Format combined DateTime
              const formattedDateTime = new Date(post.postdate).toLocaleString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              });
      
              return (
                <li
                  key={post.postid}
                  className="p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Title */}
                  <h4 className="text-xl font-semibold text-blue-600 mb-2">
                    {post.posttitle}
                  </h4>
      
                  {/* Description */}
                  <p className="text-gray-700 mb-2">
                    {post.postdesc}
                  </p>
      
                  {/* Remaining Details */}
                  <div className="text-sm text-gray-500 flex justify-between items-center border-t pt-2 mt-2">
                    <span><strong>Owner:</strong> {post.postowner}</span>
                    <span><strong>Family:</strong> {post.postfamily}</span>
                    <span>
                      <strong>DateTime:</strong> {formattedDateTime}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-600 text-center mt-4">No posts found</p>
        )}
      </div>
      

      
    );
};

export default CurrentUserFamilyIdsPosts;
