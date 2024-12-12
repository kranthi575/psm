import axios from "axios";

const GetExisitingFnames = async () => {
  try {
    const response = await axios.get('http://localhost:8080/getAllExistingFamilyNames', {
      headers: {
        // If you're using JWT for authentication, you can add it here like this:
        // 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, 
      },
    });

    // Check if the response is successful and contains data
    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data; // Assuming the response data is an array of family names
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error fetching family names:', error);
    // Optional: You can display a more user-friendly error message here if needed.
    throw new Error('Failed to fetch family names');
  }
};

export default GetExisitingFnames;
