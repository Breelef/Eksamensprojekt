<script>
    import io from "socket.io-client"
    import { onMount, afterUpdate } from "svelte";
    import { chatMessagesRedpill, user, BASE_URL, BluepillAccounts } from "../../../store/globalStore";
    import { derived } from "svelte/store";
    import { Button, Input, Listgroup, ListgroupItem, Modal, Textarea, Label} from "flowbite-svelte";
    import { checkSession } from "../../utils/sessionUtil.js";
    let formModal = false;
    let socket;
    let newMessage = "";
    let title = '';
    let description = '';
    const username = derived(user, ($user) => $user ? $user.username : null);

    onMount(() => {
        document.body.style.backgroundColor = "#000";
        socket = io("localhost:8080/redpill");
        socket.on("Redpill admin chat messages", (data) => {
            chatMessagesRedpill.update((messages) => [...messages, data]);
        });
        getAllBluePillUsers();
        getUsername();
    });
    async function getAllBluePillUsers(){
      const result = await fetch($BASE_URL + "/users", {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
      });
      const data = await result.json();
      data.forEach(element => {
          if(element.choice === 0){
            BluepillAccounts.update(list => {
              list.push({
                id: element.id,
                username: element.username,
                email: element.email,
                choice: element.choice 
              });
              return list;
            });
          }
      });
    }
    async function getUsername(){
      const userData = await checkSession($BASE_URL);
      localStorage.setItem('username', userData.username);
    }

    function sendChatMessage(){
        const message = newMessage.trim();
        const username = localStorage.getItem("username");
        if(newMessage.trim() !== ""){
            const data = {
                message: message,
                username: username
            };
           socket.emit("Send redpill admin chat messages", data); 
           newMessage = "";
        }
    };
    async function sumbitArticle(event){
      event.preventDefault();
      const currentDate = new Date();
      const publishedAt = currentDate.toISOString().slice(0, -5) + 'Z';
      const userData = await checkSession($BASE_URL);
      const thisUser = await fetch($BASE_URL + "/users/" + userData.username, {
        method: "GET",
        credentials: "include"
      });
      const thisUserJson = await thisUser.json();
      const publisherID = thisUserJson.id;
      const data = { title, description, publishedAt, publisherID };
      console.log(data);
      const response = await fetch($BASE_URL + "/articles", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      const result = await response.json();
      if(response.ok){
        alert(result.message);
      }else{
        alert(result.message);
      }
    }
    function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendChatMessage();
    }
  }
  let chatContainer;

  afterUpdate(() => {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  });

  let textareaprops = {
    id: 'description',
    name: 'description',
    label: 'Your description',
    rows: 4,
    placeholder: 'Description.....',
  };
</script>
<style>
    .chat-container {
      max-height: 400px;
      overflow-y: auto;
    }
  
    .message {
      margin-bottom: 10px;
    }
  </style>
  <h1 class="text-green-500 mb-10">Redpill community page</h1>
  <div class="flex">
    <div class="w-2/3 ml-auto">
      <div class="chat-container bg-slate-950 p-4 rounded border border-white" bind:this={chatContainer}>
        {#each $chatMessagesRedpill as message}
          <div class="message bg-green-600 p-2 rounded mb-2">
            <strong>{message.username}:</strong> {message.message}
          </div>
        {/each}
      </div>
      <div class="flex items-center mt-4">
        <Input defaultClass="bg-slate-950 text-green-500 text-bold flex-grow" type="text" bind:value={newMessage} name="message" style="width: 300px;" placeholder="Message...." />
        <Button btnClass="bg-green-600 text-white px-4 py-2 rounded ml-4" on:click="{sendChatMessage}" on:keydown={handleKeyDown}>Send</Button>
      </div>
    </div>
    <div class="w-1/4 ml-4">
      <Listgroup active class="w-70 bg-black" style="background-color: black !important;">
        <h3 class="p-1 text-center text-xl font-medium text-green-500">BluePillers</h3>
        {#each $BluepillAccounts as account }
          <ListgroupItem class="text-base font-semibold gap-2">
            <p class="text-green-500">ID: {account.id} - Username: {account.username}</p>
          </ListgroupItem>
        {/each}
      </Listgroup>
    </div>
  </div>
<Button btnClass="bg-green-600 text-white px-4 py-2 rounded mt-4 mr-4" on:click={() => formModal = true}>Write Article</Button>

<Modal bind:open={formModal} size="md" autoclose={false} class="w-full" defaultClass="bg-black" style="background-color: black !important; width: 100%;">
  <form class="flex flex-col space-y-6" on:submit={sumbitArticle}>
    <h3 class="mb-4 text-xl font-medium text-green-500">Write an article for the bluepillers</h3>
    <Label class="space-y-2 text-green-500">
      <span>Title</span>
      <Input defaultClass="bg-slate-950 text-green-500" type="text" name="title" placeholder="Title" bind:value={title} required />
    </Label>
    <Label class="space-y-2 text-green-500">
      <span>Description</span>
      <Textarea defaultClass="bg-slate-950 text-green-500" {...textareaprops} required bind:value={description} />
    </Label>
    <Button btnClass="bg-green-600 text-white px-4 py-2 rounded" type="submit" class="w-full1">Submit article</Button>
  </form>
</Modal>

