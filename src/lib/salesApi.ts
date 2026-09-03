// lib/salesApi.ts
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

export async function createSaleListing(formData: FormData) {
  const res = await fetch(`${BASE_URL}/api/product-salls`, {
    method: "POST",
    credentials: "include", // cookie automatically mokalse
    body: formData,
    // Content-Type header NA nakho, FormData automatically set kare chhe
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message || `Request failed with status ${res.status}`);
  }

  return res.json();
}

export async function getSaleListings() {
  const res = await fetch(`${BASE_URL}/api/product-salls`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json();
}

export async function getMySaleListings() {
  const res = await fetch(`${BASE_URL}/api/product-salls/my`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch your listings");
  return res.json();
}

export async function getSaleListingById(id: string) {
  const res = await fetch(`${BASE_URL}/api/product-salls/${id}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    if (res.status === 404) return undefined;
    throw new Error("Failed to fetch listing");
  }
  return res.json();
}

export async function updateSaleListing(id: string, formData: FormData) {
  const res = await fetch(`${BASE_URL}/api/product-salls/${id}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function deleteSaleListing(id: string) {
  const res = await fetch(`${BASE_URL}/api/product-salls/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}