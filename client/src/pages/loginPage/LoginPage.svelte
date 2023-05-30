<script>
    import { BASE_URL, user } from "../../../store/globalStore.js";
    import { useNavigate, useLocation } from "svelte-navigator";
    import { Input, Label, Helper, Checkbox, Button, A } from 'flowbite-svelte';
    const navigate = useNavigate();
	const location = useLocation();
    let username = '';
    let password = '';
    import { onMount } from "svelte";

    async function handleSubmit(event) {
        event.preventDefault();
        const data = { username, password };
        try{
                const response = await fetch($BASE_URL + "/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            });
            const userObject = await response.json();
            console.log(userObject);
                if (response.status === 200) {
                    user.set({ username, hasChosen: userObject.hasChosen, choice: userObject.choice });
                    if(userObject.hasChosen === 0){
                        const from = ($location.state && $location.state.from) || "/takePill";
                        navigate(from, { replace: true });
                    }else{
                        if(userObject.choice === 1){
                        const from = ($location.state && $location.state.from) || "/frontpageRedpill";
                        navigate(from, { replace: true });
                    }else{
                        const from = ($location.state && $location.state.from) || "/frontpageBluepill";
                        navigate(from, { replace: true });
                    }
                }
                }else {
                    alert('Invalid username or password');
                }
        }catch(error){
            console.error(error);
        }
    };
    function handleSignUp(){
        const from = ($location.state && $location.state.from) || "/signup";
        navigate(from, { replace: true });
    }
    onMount(() => {
        document.body.style.backgroundColor = "#000";
    })
</script>
<form class="form-signin flex flex-col items-center" on:submit={handleSubmit}>
    <img src="/matrixlogo.png" class="mb-4" width="500" height="300" alt="">
    <div class="gap-6">
      <div class="flex flex-col items-center">
        <Label for="inputUsername" class="mb-2 text-green-500">Username</Label>
        <Input defaultClass="bg-slate-950 text-green-500 text-bold appearance-none" type="text" bind:value={username} name="username" id="inputUsername" style="width: 300px; --webkit-text-fill-color: green !important; --webkit-box-shadow: 0 0 0 30px white inset !important;" required placeholder="Enter your username here" />
      </div>
      <div class="flex flex-col items-center mb-4">
        <Label for="inputPassword" class="mb-2 text-green-500">Password</Label>
        <Input defaultClass="bg-slate-950 text-green-500 text-bold" type="password" bind:value={password} name="password" id="inputPassword" style="width: 300px;" required placeholder="Enter your password here" />
      </div>
    </div>
    <Button btnClass="bg-green-600 text-white px-4 py-2 rounded" type="submit">Log in</Button>
</form>
<Button btnClass="bg-green-600 text-white px-4 py-2 rounded absolute top-0 right-0 mt-4 mr-4"color="green" on:click={handleSignUp}>Sign up</Button>
