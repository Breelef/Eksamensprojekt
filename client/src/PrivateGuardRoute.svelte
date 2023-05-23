<script>
	import { useNavigate, useLocation } from "svelte-navigator";
	import { user } from "../store/globalStore.js";
	import { derived } from "svelte/store";

	const navigate = useNavigate();
	const location = useLocation();

	const currentUser = derived(user, ($user, set) => {
		if ($user) {
			set($user);
		}
	});

	const isAccessAllowed = derived([currentUser, location], ([$currentUser, $location]) => {
		console.log(currentUser)
	if ($currentUser && ($currentUser.choice === 1 || $location.pathname === "/takePill")) {
		return true;
	} else if ($currentUser && $currentUser.choice === 0 && $location.pathname === "/frontpageBluepill") {
		return true;
	} else if ($currentUser && $currentUser.choice === 1 && $location.pathname === "/frontpageRedpill") {
		return true;
	}
	return false;
});


	if (!isAccessAllowed) {
		navigate("/", {
			state: { from: location.pathname },
			replace: true,
		});
	}
</script>

{#if $isAccessAllowed}
	<slot />
{/if}
