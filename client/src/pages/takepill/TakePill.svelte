<script>
    import { BASE_URL, user } from "../../../store/globalStore";
    import { useNavigate, useLocation } from "svelte-navigator";
    import { onMount } from "svelte"

    const navigate = useNavigate();
	const location = useLocation();

    async function checkSession() {
    try {
      const response = await fetch(`${BASE_URL}/pageGuard`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        // Session is valid, allow access to the page
        const data = await response.json();
        console.log("User is logged in:", data);
      } else {
        // Session is not valid, redirect to login page or show an error message
        console.log("User is not logged in");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  }
  onMount(checkSession);
  
    async function handleClick(value){
        const data = {
            hasChosen: true,
            choice: value
            };
        if(value){
            user.set({ hasChosen: data.hasChosen, choice: 1 });
        }else{
            user.set({ hasChosen: data.hasChosen, choice: 0 });
        }
        await fetch($BASE_URL + "/users", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data)

        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error updating user.');
                }
                console.log('User updated successfully.');
            })
        .catch(error => {
            console.error(error);
        });
        if(value){
            const from = ($location.state && $location.state.from) || "/redpill/frontpage";
            navigate(from, { replace: true });
            }else { 
            const from = ($location.state && $location.state.from) || "/bluepill/frontpage";
            navigate(from, { replace: true });
        }
    }
    function handleImageKeyDown(event) {
    if (event.key === "Enter") {
        
    }
  }
</script>
<div>
    <h1 class= "mb-3 pb-3 text-green-600">Choose wisely</h1>
    <div class="row">
        <div class= "col-6">
            <img src="/redpill.png" class="mb-4" width="300" height="400" alt="" on:click={() => handleClick(true)} on:keydown={handleImageKeyDown}>
        </div>
        <div class= "col-6">
            <img src="/bluepill.png" class="mb-4" width="300" height="400" alt="" on:click={() => handleClick(false)} on:keydown={handleImageKeyDown}>
        </div>
    </div>
    
</div>