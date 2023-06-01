<script>
    import { BASE_URL, user, isEmailUsed } from "../../../store/globalStore.js";
    import { useNavigate, useLocation } from "svelte-navigator";
    import { Input, Label, Helper, Checkbox, Button, A } from 'flowbite-svelte';
    const navigate = useNavigate();
	const location = useLocation();
    import { onMount } from "svelte";

    let email = '';

    let newPassword = '';
    let confirmNewPassword = '';
    let timeoutID = null;

    async function handleSubmit(event) {
        event.preventDefault();
        const data = { password: newPassword, confirmPassword: confirmNewPassword };
        console.log("New password: ", newPassword);
        console.log("New confirm password: ", confirmNewPassword);
        console.log("Email: ", email);
        try{
                const response = await fetch(`${$BASE_URL}/users/${email}`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
                if (response.status === 200) {
                    const from = ($location.state && $location.state.from) || "/";
                    navigate(from, { replace: true });
                }else {
                    alert("Not valid credentials")
                }
        }catch(error){
            console.error(error);
        } 
    };

    async function checkAvailability(){
        if(timeoutID) {
            clearTimeout(timeoutID);
        }
        timeoutID = setTimeout(async () => {
            const data = { email }
            console.log(data);
            try{
                const result = await fetch($BASE_URL + "/users/checkAvailability", {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data),
                });
                if(result.status === 200){
                    const { emailUsed } = await result.json();
                    isEmailUsed.set(emailUsed);
                }

            }catch(error){
                console.error(error)
            }
            timeoutID = null;
        }, 1500)
    }
    function handleEmailInput(){
        isEmailUsed.set(false);
        checkAvailability();
    }
    onMount(() => {
        document.body.style.backgroundColor = "#000";
    })
</script>

<form class="form-signin flex flex-col items-center" on:submit={handleSubmit}>
    <img src="/matrixlogo.png" class="mb-4" width="500" height="300" alt="">
    <div class="gap-6">
      <div class="flex flex-col items-center mb-4">
        <Label for="inputUsername" class="mb-2 text-green-500">Email</Label>
        <Input defaultClass="bg-slate-950 text-green-500 text-bold appearance-none" type="text" bind:value={email} name="email" id="inputEmail" style="width: 300px;" required placeholder="Enter your Email here" on:input={handleEmailInput} />
        {#if !$isEmailUsed}
                <p class="text-red-500">No account with that email</p>
        {/if}
      </div>
      {#if $isEmailUsed}
        <div class="flex flex-col items-center mb-4">
            <Label for="inputNewPassword" class="mb-2 text-green-500">New password</Label>
            <Input defaultClass="bg-slate-950 text-green-500 text-bold" type="password" bind:value={newPassword} name="newPassword" id="inputNewPassword" style="width: 300px;" required placeholder="Enter your new password here" />
        </div>   
        <div class="flex flex-col items-center mb-4">
            <Label for="inputConfirmPassword" class="mb-2 text-green-500">Confirm new password</Label>
            <Input defaultClass="bg-slate-950 text-green-500 text-bold" type="password" bind:value={confirmNewPassword} name="confirmNewP+assword" id="inputConfirmPassword" style="width: 300px;" required placeholder="Confirm your new password here" />
        </div>
        {#if !(newPassword === confirmNewPassword)}
                <p class="text-red-500">Passwords don't match</p>
        {/if} 
        {/if}
    </div>
    {#if newPassword === confirmNewPassword && newPassword && confirmNewPassword}
    <Button btnClass="bg-green-600 text-white px-4 py-2 rounded" type="submit">Confirm</Button>
    {/if}
</form>