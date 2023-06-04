<script>
	import { useNavigate, useLocation } from "svelte-navigator";
	import { user, BASE_URL, isAuthenticated } from "../../store/globalStore.js";
	import { onMount } from "svelte";
	import { derived } from "svelte/store";
	import { checkSession } from "../utils/sessionUtil.js";
	
	const navigate = useNavigate();
	const location = useLocation();
	let locationValue;
	location.subscribe(value => locationValue = value);
	
	const currentUser = derived(user, ($user, set) => {
	  if ($user) {
		set($user);
	  }
	});
	
	let currentUserValue;
	currentUser.subscribe(value => currentUserValue = value);
	
	async function isAccessAllowed() {
	  try {
		const userData = await checkSession($BASE_URL);
		if (userData) {
		  if (
			(userData.hasChosen === 0 || userData.hasChosen === false) &&
			locationValue.pathname === "/takePill"
		  ) {
			return true;
		  } else if (
			(userData.choice === 1 || userData.choice === true) &&
			locationValue.pathname.includes("redpill/")
		  ) {
			return true;
		  } else if (
			(userData.choice === 0 || userData.choice === false) &&
			locationValue.pathname.includes("bluepill/")
		  ) {
			return true;
		  }
		}
	  } catch (error) {
		console.error("Error checking session:", error);
	  }
  
	  return false;
	}
  
	onMount(async () => {
	  const accessAllowed = await isAccessAllowed();
	  isAuthenticated.set(accessAllowed);
	  if (!accessAllowed) {
		const from = locationValue.state?.from || "/";
		navigate(from);
	  }
	});
	async function logout() {
        const response = await fetch(`${$BASE_URL}/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });

        const data = await response.json();

        if (data.message === 'User is logged out') {
            isAuthenticated.set(false);
            navigate('/');
        } else {
            console.error('Logout failed:', data.message);
        }
    }
  </script>
  
  {#if $isAuthenticated}
  <button class="bg-slate-600 text-white px-4 py-2 rounded absolute top-0 left-0 mt-4 ml-4" on:click={logout}>Logout</button>
  <slot />
{:else}
  <p>Access denied. Redirecting to home page...</p>
{/if}
  