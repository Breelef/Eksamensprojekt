<script>
    import io, { Socket } from "socket.io-client"
    import { onMount, afterUpdate } from "svelte";
    import { chatMessagesRedpill, user } from "../../../store/globalStore";
    import { derived } from "svelte/store";
    import { Button, Input } from "flowbite-svelte";

    let socket;
    let newMessage = "";
    const username = derived(user, ($user) => $user ? $user.username : null);

    onMount(() => {
        socket = io("localhost:8080/redpill");
        socket.on("Redpill admin chat messages", (data) => {
            console.log("Data recieved", data)
            chatMessagesRedpill.update((messages) => [...messages, data]);
            console.log("Updated: ", $chatMessagesRedpill);
        });
    });
    function sendChatMessage(){
        const message = newMessage.trim();
        if(newMessage.trim() !== ""){
            const data = {
                message: message,
                username: $username
            };
           socket.emit("Send redpill admin chat messages", data); 
           newMessage = "";
        }
    };
    function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendChatMessage();
    }
  }
  let chatContainer;

  afterUpdate(() => {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  });

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
  <h1>This is redpill admin</h1>
  <div class="chat-container bg-slate-950 p-4" bind:this={chatContainer}>
    {#each $chatMessagesRedpill as message}
      <div class="message bg-green-600 p-2 rounded mb-2">
        <strong>{message.username}:</strong> {message.message}
      </div>
    {/each}
  </div>
  
  <div class="flex items-center mt-4">
    <Input defaultClass="bg-slate-950 text-green-500 text-bold" type="text" bind:value={newMessage} name="message" style="width: 300px;" placeholder="Message...." />
    <Button btnClass="bg-green-600 text-white px-4 py-2 rounded" on:click="{sendChatMessage}" on:keydown={handleKeyDown}>Send</Button>
  </div>