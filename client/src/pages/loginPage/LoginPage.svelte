<script>
    import { BASE_URL, user } from "../../../store/globalStore.js";
    import { useNavigate, useLocation } from "svelte-navigator";
    import { Input, Label, Helper, Checkbox, Button, A } from 'flowbite-svelte';
    const navigate = useNavigate();
	const location = useLocation();
    let username = '';
    let password = '';

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
</script>
<form class="form-signin" on:submit={handleSubmit}>
    <img src="/matrixlogo.png" class="mb-4" width="500" height="300" alt="">
        <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
                <Label for="inputUsername" class="mb-2">Username</Label>
                <Input type="text" bind:value={username} name="username" id="inputUsername"  style="width: 250px;" required placeholder="Enter your username here" />
            </div>
            <div>
                <Label for="inputPassword" class="mb-2">Password</Label>
                <Input type="password" bind:value={password} name="password" id="inputPassword" style="width: 250px;" required placeholder="Enter your password here"/>
            </div>
        </div>
    <Checkbox class="mb-6 space-x-1" required>I agree with the <A href="/">terms and conditions</A>.</Checkbox>
    <Button type="submit">Log in</Button>
</form>
<br>
<p>Have you not signed up yet?</p>
<Button on:click={handleSignUp}>Sign up</Button>