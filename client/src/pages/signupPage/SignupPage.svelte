<script>
    import { BASE_URL } from "../../../store/globalStore.js";
    import { useNavigate, useLocation } from "svelte-navigator";
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
    <div class="mb-2">
        <label for="inputUsername" class="sr-only">
        <input type="text" bind:value={email} name="username" id="inputUsername"  style="width: 250px;" required placeholder="Enter your email here" />
    </label>
    </div>
    <div class="mb-2">
        <label for="inputUsername" class="sr-only">
        <input type="text" bind:value={username} name="username" id="inputUsername"  style="width: 250px;" required placeholder="Enter your username here" />
    </label>
    </div>
    <div class="mb-1">
        <label for="inputPassword" class="sr-only">
        <input type="password" bind:value={password} name="password" id="inputPassword" style="width: 250px;" required placeholder="Enter your password here" />
        </label>
    </div>
    <button class="btn btn-lg btn-inverse btn-primary btn-block" type="submit">Sign up!</button>
  </form>

<style>
    .btn-primary.btn-inverse {
    color: #fff;
    background-image: url("/matrixlogo.png");
    background-repeat: no-repeat;
    background-size: 300px 100px;
    border-color: #0d0208;
}
</style>