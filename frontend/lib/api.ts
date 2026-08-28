export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_URL}/health`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return { success: false, message: 'Backend is offline' };
  }
}
