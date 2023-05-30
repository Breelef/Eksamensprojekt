<script>
    import { BASE_URL } from "../../../store/globalStore.js";
    import { useNavigate, useLocation } from "svelte-navigator";
    import { Label, Input, Button, Checkbox, A } from "flowbite-svelte";
    const navigate = useNavigate();
	const location = useLocation();
    import { onMount } from "svelte";
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
    onMount(() => {
        document.body.style.backgroundColor = "#000";
    })
</script>
<form class="form-signin flex flex-col items-center" on:submit={handleSubmit}>
    <img src="/matrixlogo.png" class="mb-4" width="500" height="300" alt="">
    <div class="gap-6">
        <div class="flex flex-col items-center">
            <Label for="inputEmail" class="mb-2 text-green-500">Email</Label>
            <Input defaultClass="bg-slate-950 text-green-500 text-bold appearance-none" type="text" bind:value={email} name="email" id="inputEmail" style="width: 300px;" required placeholder="Enter your Email here" />
          </div>
        <div class="flex flex-col items-center">
            <Label for="inputUsername" class="mb-2 text-green-500">Username</Label>
            <Input defaultClass="bg-slate-950 text-green-500 text-bold appearance-none" type="text" bind:value={username} name="username" id="inputUsername" style="width: 300px;" required placeholder="Enter your username here" />
        </div>
        <div class="flex flex-col items-center mb-4">
            <Label for="inputPassword" class="mb-2 text-green-500">Password</Label>
            <Input defaultClass="bg-slate-950 text-green-500 text-bold" type="password" bind:value={password} name="password" id="inputPassword" style="width: 300px;" required placeholder="Enter your password here" />
        </div>
    </div>
    <Checkbox class="mb-6 space-x-1 text-green-500" required>I agree with the <A href="/">terms and conditions</A>.</Checkbox>
    <Button btnClass="bg-green-600 text-white px-4 py-2 rounded" type="submit">Sign Up!</Button>
</form>