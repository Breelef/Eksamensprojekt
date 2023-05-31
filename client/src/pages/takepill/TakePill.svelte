<script>
    import { BASE_URL, user } from "../../../store/globalStore";
    import { useNavigate, useLocation } from "svelte-navigator";
    const navigate = useNavigate();
	const location = useLocation();
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
            console.log("You are now redpilled");
            const from = ($location.state && $location.state.from) || "/frontpageRedpill";
            navigate(from, { replace: true });
            }else {
            console.log("You remain blue pilled");
            const from = ($location.state && $location.state.from) || "/frontpageBluepill";
            navigate(from, { replace: true });
        }
    }
    function handleImageKeyDown(event) {
    // Handle the keydown event here
    // You can check for a specific key, like Enter, using event.key
    if (event.key === "Enter") {
      console.log("Enter key pressed on the image!");
      // Perform your desired action or update component state
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