import axios from "axios";

const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c'; // Consider moving sensitive data like API keys to environment variables
const BASE_URL = 'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1';
const BEARER = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k';
export const getBanners = () => {
  return axios.get(`${BASE_URL}/banners`, {
    headers: { 'apiKey': API_KEY }
  });
}

export const getCategories = () => {
  return axios.get(`${BASE_URL}/categories`, {
    headers: { 'apiKey': API_KEY }
  });
}

export const getPromos = () => {
  return axios.get(`${BASE_URL}/promos`, {
    headers: { 'apiKey': API_KEY }
  });
}

export const getActivities = () => {
  return axios.get(`${BASE_URL}/activities`, {
    headers: { 'apiKey': API_KEY }
  });
}

export const login = (payload) => {
  return axios.post(`${BASE_URL}/login`, payload, {
    headers: { 'apiKey': API_KEY }
  });
};

export const register = (payload) => {
  return axios.post(`${BASE_URL}/register`, payload, {
    headers: { 'apiKey': API_KEY }
  });
}

export const getActivityById = (id) => {
  return axios.get(`${BASE_URL}/activity/${id}`, {
    headers: { 'apiKey': API_KEY }
  });
}

export const getOfferById = (id) => {
  return axios.get(`${BASE_URL}/promo/${id}`, {
    headers: { 'apiKey': API_KEY }
  });
}

export const getCategoryById = (id) => {
  return axios.get(`${BASE_URL}/category/${id}`, {
    headers: { 'apiKey': API_KEY }
  });
}
export const getActivitiesByCategory = (id) => {
  return axios.get(`${BASE_URL}/activities-by-category/${id}`, {
    headers: { 'apiKey': API_KEY }
  });
}

export const getBannerById = (id) => {
  return axios.get(`${BASE_URL}/banner/${id}`, {
    headers: { 'apiKey': API_KEY }
  });
}

export const postImage = (payload) => {
  return axios.post(`${BASE_URL}/upload-image`, payload, {
    headers: {
      "content-type": "multipart/form-data",
      "Authorization": BEARER,
      'apiKey': API_KEY,
    },
  });
}



export const getLogin = () => {
  return axios.get(`${BASE_URL}/user`, {
  
  });
}

export const getUser = async (token) => {
  
  const response = await axios.get(`${BASE_URL}/user`, { 
      headers: {
          'Authorization': `Bearer ${token}`,
          'apiKey': API_KEY, 
          'Content-Type': 'application/json'
      }
   });
  return response.data;
};

export const fetchLogin = async () => {
  const token = localStorage.getItem('token');
  const headers = {
      'Authorization': `Bearer ${token}`,
      'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
      'Content-Type': 'application/json'
  };

  try {
      const response = await axios.get(`${BASE_URL}/user`, { headers });
      return response.data.data;
  } catch (error) {
      console.error('Failed to fetch login:', error);
      throw new Error('Failed to fetch login. Please try again later.');
  }
};

export const fetchAllUser = async () => {
  const token = localStorage.getItem("token");
  const API_URL = 'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user';
  const headers = {
      'Authorization': `Bearer ${token}`,
      'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
      'Content-Type': 'application/json'
  };

  try {
      const response = await axios.get(API_URL, { headers });
      return response.data.data;
  } catch (error) {
      console.error('Failed to fetch data:', error);
      throw new Error('Failed to fetch data. Please try again later.');
  }
};





export const updateProfile = async (data, token) => {
 
  const response = await axios.post(`${BASE_URL}/update-profile`, data, { 
      headers: {
          'Authorization': `Bearer ${token}`,
          'apiKey': API_KEY, 
          'Content-Type': 'application/json'
      }
   });
  return response.data;
};

export const getLogout = async () => {
  try {
      const response = await axios.get(`${BASE_URL}/logout`, {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'apiKey': API_KEY, 
              'Content-Type': 'application/json'
          }
      });

      if (response.status === 200) {
          console.log('Logged out successfully');
          return true;
      } else {
          console.error('Failed to log out');
          return false;
      }
  } catch (error) {
      console.error('Logout error:', error);
      return false;
  }
}

export const getAllProfile = async () => {
  const response = await axios.get(`${BASE_URL}/all-user`, { 
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'apiKey': API_KEY, 
          'Content-Type': 'application/json'
      }
   });
  return response.data;
};
export const fetchUser = async (token) => {
  const headers = {
      'Authorization': `Bearer ${token}`,
      'apiKey': API_KEY,
      'Content-Type': 'application/json'
  };
  return axios.get(`${BASE_URL}/user`, { headers });
};

export const uploadProfilePicture = async (file, token) => {
  const formData = new FormData();
  formData.append('image', file);
  const headers = {
      'Content-Type': 'multipart/form-data',
      'apiKey': API_KEY,
      'Authorization': `Bearer ${token}`
  };
  return axios.post(`${BASE_URL}/upload-image`, formData, { headers });
};

export const updateUserProfile = async (userInfo, token) => {
  const headers = {
      'Authorization': `Bearer ${token}`,
      'apiKey': API_KEY,
      'Content-Type': 'application/json'
  };
  return axios.post(`${BASE_URL}/update-profile`, userInfo, { headers });
};

export const updateUserRole = async (selectedUserId, formData) => {
  const { role } = formData;
  if (selectedUserId && role) {
      const API_URL = `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${selectedUserId}`;
      const headers = {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          'Content-Type': 'application/json'
      };
      const data = { role };

      try {
          const res = await axios.post(API_URL, data, { headers });
          return res.data;
      } catch (error) {
          console.error('Failed to update role:', error);
          throw new Error('Failed to update role. Please try again later.');
      }
  }
};

export const deleteBanner = async (bannerId) => {
  const API_URL = `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-banner/${bannerId}`;
  const headers = {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
      'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
      'Content-Type': 'application/json'
  };

  try {
      await axios.delete(API_URL, { headers });
      return; // Return success
  } catch (error) {
      console.error('Error deleting banner:', error);
      throw new Error('Failed to delete banner. Please try again later.');
  }
};


export const deleteCategory = async (selectedCategoryId, fetchCategory, setShowModal, setError) => {
  const API_URL = `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-category/${selectedCategoryId}`;
  const headers = {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
      'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
      'Content-Type': 'application/json'
  };

  try {
      await axios.delete(API_URL, { headers });
      return { success: true };
  } catch (error) {
      console.error('Error deleting category:', error);
      setError('Failed to delete category. Please try again later.');
      return { success: false };
  }
};

export const deletePromo = async (selectedPromoId) => {
  const API_URL = `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${selectedPromoId}`;
  const headers = {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
      'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
      'Content-Type': 'application/json'
  };

  try {
      await axios.delete(API_URL, { headers });
  } catch (error) {
      console.error('Error deleting promo:', error);
      throw new Error('Failed to delete promo. Please try again later.');
  }
};
export const deleteActivity = async (selectedActivityId) => {
  const API_URL = `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${selectedActivityId}`;
  const headers = {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
      'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
      'Content-Type': 'application/json'
  };

  try {
      await axios.delete(API_URL, { headers });
  } catch (error) {
      console.error('Error deleting activity:', error);
      throw new Error('Failed to delete activity. Please try again later.');
  }
};