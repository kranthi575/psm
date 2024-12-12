import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GetExisitingFnames from '../utils/GetExisitingFnames';

const CreateAcct = () => {
  const [userid, setUserid] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [familyid, setFamilyid] = useState('');
  const [profilename, setProfilename] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [msg, setMsg] = useState('');
  const [familyNames, setFamilyNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userid', userid);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('familyid', familyid);
    formData.append('profilename', profilename);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    const url = `http://localhost:8080/appUserRegister`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (response.status === 409) {
        setMsg('User already registered!');
        console.log('User already registered!');
      } else if (response.ok) {
        const result = await response.json();
        console.log('Registration successful:', result);
        setMsg(`${userid}: Registration successful in family ID => ${familyid}`);
      } else {
        throw new Error('Unexpected response');
      }
    } catch (error) {
      console.error('Error:', error);
      setMsg('Registration failed. Please try again.');
    }
  };

  useEffect(() => {
    const fetchFamilyNames = async () => {
      try {
        const names = await GetExisitingFnames();
        setFamilyNames(names);
      } catch (err) {
        setError('Failed to fetch family names');
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyNames();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create Account</h2>

        <form onSubmit={handleRegister} className="space-y-4" encType="multipart/form-data">
          <input
            type="text"
            placeholder="User ID"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div>
            <label className="block text-gray-700">Select Family ID:</label>
            <select
              value={familyid}
              onChange={(e) => setFamilyid(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a Family</option>
              {loading ? (
                <option value="">Loading family names...</option>
              ) : error ? (
                <option value="">Error loading family names</option>
              ) : (
                familyNames.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))
              )}
            </select>
          </div>

          <input
            type="text"
            placeholder="Profile Name"
            value={profilename}
            onChange={(e) => setProfilename(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div>
            <label className="block text-gray-700">Upload Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Register
          </button>

          {msg && <p className="text-center text-sm mt-2 text-gray-700">{msg}</p>}
        </form>

        <button
          onClick={() => navigate('/createFamilyGroup')}
          className="w-full py-2 mt-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
        >
          No FamilyId? Create FamilyId
        </button>

        <button
          onClick={() => navigate('/home')}
          className="w-full py-2 mt-4 bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default CreateAcct;
