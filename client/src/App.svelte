<script>
  import { Router, Link, Route } from "svelte-navigator";
  import LoginPage from "./pages/LoginPage/LoginPage.svelte";
  import TakePillPage from "./pages/Takepill/TakePill.svelte";
  import PrivateRoute from "./PrivateRoute.svelte";
  import SignupPage from "./pages/SignupPage/SignupPage.svelte";
  import BluePillPage from "./pages/Bluepillpage/BluePillPage.svelte";
  import RedPillPage from "./pages/Redpillpage/RedPillPage.svelte";
  import RedpillAdmin from "./pages/RedpillAdmin/RedpillAdmin.svelte";
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

