const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('flexistudy_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  // Auth
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    localStorage.setItem('flexistudy_token', data.token);
    return data;
  },

  register: async (payload) => {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  // Subjects & Modules
  getSubjects: async () => {
    const res = await fetch(`${API_URL}/subjects`, { headers: getHeaders() });
    return res.json();
  },

  createSubject: async (subjectData) => {
    const res = await fetch(`${API_URL}/subjects`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(subjectData)
    });
    return res.json();
  },

  deleteSubject: async (id) => {
    const res = await fetch(`${API_URL}/subjects/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.json();
  },

  getModules: async () => {
    const res = await fetch(`${API_URL}/modules`, { headers: getHeaders() });
    return res.json();
  },

  createModule: async (moduleData) => {
    const res = await fetch(`${API_URL}/modules`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(moduleData)
    });
    return res.json();
  },

  updateModule: async (id, moduleData) => {
    const res = await fetch(`${API_URL}/modules/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(moduleData)
    });
    return res.json();
  },

  saveSubModule: async (subModuleData) => {
    const res = await fetch(`${API_URL}/submodules`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(subModuleData)
    });
    return res.json();
  },

  deleteModule: async (id) => {
    const res = await fetch(`${API_URL}/modules/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.json();
  },

  // Activities & Progress
  getActivities: async (email) => {
    const res = await fetch(`${API_URL}/activities/${email}`, { headers: getHeaders() });
    return res.json();
  },

  saveQuizAttempt: async (attemptData) => {
    const res = await fetch(`${API_URL}/quiz-attempts`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(attemptData)
    });
    return res.json();
  },

  markMaterialRead: async (payload) => {
    const res = await fetch(`${API_URL}/progress/mark-read`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  getUsers: async () => {
    const res = await fetch(`${API_URL}/users`, { headers: getHeaders() });
    return res.json();
  },

  getQuizAttempts: async (email) => {
    const res = await fetch(`${API_URL}/quiz-attempts/${email}`, { headers: getHeaders() });
    return res.json();
  }
};
