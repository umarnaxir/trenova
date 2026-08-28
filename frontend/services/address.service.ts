import { useAuthStore } from "@/hooks/stores/authStore";
import type { Address } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

function getHeaders() {
  const token = useAuthStore.getState().token;
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
}

export async function getAddresses(): Promise<Address[]> {
  const res = await fetch(`${API_URL}/user/addresses`, { headers: getHeaders() });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

export async function addAddress(address: Partial<Address>): Promise<Address> {
  const res = await fetch(`${API_URL}/user/addresses`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(address)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to add address");
  return json.data;
}

export async function updateAddress(id: string, address: Partial<Address>): Promise<Address> {
  const res = await fetch(`${API_URL}/user/addresses/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(address)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to update address");
  return json.data;
}

export async function deleteAddress(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/user/addresses/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to delete address");
}
