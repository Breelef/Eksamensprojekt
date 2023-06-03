<script>
  import { Router, Link, Route } from "svelte-navigator";
  import LoginPage from "./pages/LoginPage/LoginPage.svelte";
  import TakePillPage from "./pages/Takepill/TakePill.svelte";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import SignupPage from "./pages/SignupPage/SignupPage.svelte";
  import BluePillPage from "./pages/Bluepillpage/BluePillPage.svelte";
  import RedPillPage from "./pages/Redpillpage/RedPillPage.svelte";
  import RedpillAdmin from "./pages/RedpillAdmin/RedpillAdmin.svelte";
  import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.svelte";
</script>

<Router>
  <Route path="/" component={LoginPage} />
  <PrivateRoute path="/takePill" let:location>
    <TakePillPage />
  </PrivateRoute>
  <PrivateRoute path="/bluepill/frontpage" let:location>
    <BluePillPage />
  </PrivateRoute>
  <PrivateRoute path="/redpill/frontpage" let:location>
    <RedPillPage />
  </PrivateRoute>
  <PrivateRoute path="/redpill/admin" let:location>
      <RedpillAdmin />
  </PrivateRoute>
  <Route path="/forgotpassword" component={ForgotPassword} />
  <Route path="/signup" component={SignupPage} />
</Router>

