import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GetExisitingFnames from '../utils/GetExisitingFnames';

const RegisterForm = () => {
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

  // Handle the registration logic
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
        setMsg("User already registered!");
        console.log("User already registered!");
      }

      if (response.ok) {
        const result = await response.json();
        console.log('Registration successful:', result);
        setMsg(`${userid}: Registration successful in family ID => ${familyid}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMsg('Registration failed. Please try again.');
    }
  };

  // Fetch family names when the component mounts
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
    <div>
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

        {/* File Upload for Profile Picture */}
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

        {msg && <p>{msg}</p>}
      </form>

      <button
        onClick={() => navigate("/createFamilyGroup")}
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
      >
        No FamilyId found? Create FamilyId
      </button>
    </div>
  );
};

export default RegisterForm;
