<script>
    import { Input, Label, Helper } from 'flowbite-svelte';
</script>
<form>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <Label for="inputUsername" class="mb-2">Username</Label>
        <Input type="text" bind:value={username} name="username" id="inputUsername"  style="width: 250px;" required placeholder="Enter your username here" />
      </div>
      <div>
        <Label for="inputPassword" class="mb-2">Password</Label>
        <Input type="password" bind:value={password} name="password" id="inputPassword" style="width: 250px;" required placeholder="Enter your password here"/>
      </div>
    <Checkbox class="mb-6 space-x-1" required>I agree with the <A href="/">terms and conditions</A>.</Checkbox>
    <Button type="submit">Submit</Button>
  </form>