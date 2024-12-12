import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFamilyGrp = () => {
  const [familyName, setFamilyName] = useState('');
  const [familyDesc, setFamilyDesc] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const naviagte= useNavigate();
  // Handle form data changes
  const handleFamilyNameChange = (e) => setFamilyName(e.target.value);
  const handleFamilyDescChange = (e) => setFamilyDesc(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!familyName || !familyDesc || !file) {
      setMessage('Please fill in all fields and select a file');
      return;
    }

    setLoading(true);
    setMessage('');

    // Create form data object to send to backend
    const formData = new FormData();
    formData.append('familyName', familyName);
    formData.append('familyDesc', familyDesc);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/createFamilyGroup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle response
      if (response.status === 200) {
        setMessage(`Family Group created successfully! CID: ${response.data.cid}`);
      } else {
        setMessage('Error creating Family Group');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while uploading');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create Family Group</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium">Family Name:</label>
          <input
            type="text"
            value={familyName}
            onChange={handleFamilyNameChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Family Description:</label>
          <input
            type="text"
            value={familyDesc}
            onChange={handleFamilyDescChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-4 p-3 text-white font-semibold rounded-lg focus:outline-none ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {loading ? 'Uploading...' : 'Create Family Group'}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-red-500">{message}</p>}

      <br/>
      <button
          type="submit"
          onClick={()=>naviagte("/")}
          className="w-full mt-4 p-3 text-white font-semibold rounded-lg focus:outline-none 'bg-blue-500 hover:bg-blue-600"
        
        >
        Back to Registration page
         </button>
    </div>
  );
};

export default CreateFamilyGrp;
