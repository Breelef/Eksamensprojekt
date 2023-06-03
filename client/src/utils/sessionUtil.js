import { navigate } from "svelte-navigator";

export async function checkSession(BASE_URL) {
  try {
    const response = await fetch(BASE_URL + "/pageGuard", {
      method: "GET",
      credentials: "include",
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error checking session:", error);
    return null;
  }
}
