export interface RegisterUserData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  role: string;
}

export async function registerUser(data: RegisterUserData) {
  const response = await fetch("/api/users/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Registration failed");
  }
  return response.json();
} 