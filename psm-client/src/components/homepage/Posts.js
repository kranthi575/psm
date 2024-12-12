import React, { useEffect, useState } from 'react';
import CurrentUserFamilyIdsPosts from '../utils/CurrentUserFamilyIdsPosts';

const Posts = ({createPostStatus}) => {


  console.log("Posts called :: ");
  return (
    <div className="w-1/2 bg-white p-4">
      <div className="space-y-6">
        {/* Post 1 */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold">User 1</h3>
          <p>This is a sample post.</p>
          <button className="mt-2 text-blue-500">Like</button>
          <button className="mt-2 ml-4 text-blue-500">Comment</button>
        </div>
        
        {/* Add more posts here */}
        {<CurrentUserFamilyIdsPosts createPostStatus={createPostStatus}/>}
      </div>
    </div>
  );
};

export default Posts;
