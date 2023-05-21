<script>
  import { Router, Link, Route } from "svelte-navigator";
  import LoginPage from "./pages/loginPage/LoginPage.svelte";
  import Frontpage from "./pages/Frontpage/Frontpage.svelte";
  import PrivateRoute from "./PrivateRoute.svelte";
  import SignupPage from "./pages/signupPage/SignupPage.svelte";
</script>

<Router>
  <Route path="/" component={LoginPage} />
  <PrivateRoute path="/frontpage" let:location>
    <Frontpage />
  </PrivateRoute>
  <Route path="/signup" component={SignupPage} />
</Router>

