<script>
    import { BASE_URL } from "../../../store/globalStore.js";
    import { useNavigate, useLocation } from "svelte-navigator";
    import { Label, Input, Button } from "flowbite-svelte";
    const navigate = useNavigate();
	const location = useLocation();
    let email = '';
    let username = '';
    let password = '';

    async function handleSubmit(event) {
        event.preventDefault();
        const data = { email, username, password };
        try{
                const response = await fetch($BASE_URL + "/signup", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
                if (response.status === 200) {
                    const from = ($location.state && $location.state.from) || "/";
                    navigate(from, { replace: true });
                }else {
                    alert('Invalid username or password');
                }
        }catch(error){
            console.error(error);
        } 
    };
</script>
<form class="form-signin" on:submit={handleSubmit}>
    <img src="/matrixlogo.png" class="mb-4" width="500" height="300" alt="">
    <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>
    <div class="mb-2 ">
        <Label for="inputUsername" class="sr-only">Email</Label>
        <Input type="text" bind:value={email} name="email" id="inputEmail"  style="width: 500px;" required placeholder="Enter your email here" />
    </div>
    <div class="mb-2">
        <Label for="inputUsername" class="sr-only">Username</Label>
        <Input type="text" bind:value={username} name="username" id="inputUsername"  style="width: 500px;" required placeholder="Enter your username here" />
    </div>
    <div class="mb-1">
        <Label for="inputPassword" class="sr-only">Password</Label>
        <Input type="password" bind:value={password} name="password" id="inputPassword" style="width: 500px;" required placeholder="Enter your password here" />
    </div>
    <Button class="btn btn-lg btn-inverse btn-primary btn-block" type="submit">Sign up!</Button>
  </form>
