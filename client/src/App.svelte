<script>
  import { Router, Link, Route } from "svelte-navigator";
  import LoginPage from "./pages/loginPage/LoginPage.svelte";
  import TakePillPage from "./pages/takepill/TakePill.svelte";
  import PrivateRoute from "./PrivateRoute.svelte";
  import SignupPage from "./pages/signupPage/SignupPage.svelte";
  import BluePillPage from "./pages/bluepillpage/BluePillPage.svelte";
  import RedPillPage from "./pages/redpillpage/RedPillPage.svelte";
  import RedpillAdmin from "./pages/redpillAdmin/RedpillAdmin.svelte";
</script>

<Router>
  <Route path="/" component={LoginPage} />
  <PrivateRoute path="/takePill" let:location>
    <TakePillPage />
  </PrivateRoute>
  <PrivateRoute path="/frontpageBluepill" let:location>
    <BluePillPage />
  </PrivateRoute>
  <PrivateRoute path="/frontpageRedpill" let:location>
    <RedPillPage />
  </PrivateRoute>
  <Route path="/redpillAdmin" component={RedpillAdmin} />
  <Route path="/signup" component={SignupPage} />
</Router>

