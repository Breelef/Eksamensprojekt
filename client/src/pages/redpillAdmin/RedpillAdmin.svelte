<script>
    import io, { Socket } from "socket.io-client"
    import { onMount } from "svelte";
    import { chatMessagesRedpill, user } from "../../../store/globalStore";
    import { derived } from "svelte/store";

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
  <div class="chat-container bg-gray-100 p-4">
    {#each $chatMessagesRedpill as message}
      <div class="message bg-white p-2 rounded mb-2">
        <strong>{message.username}:</strong> {message.message}
      </div>
    {/each}
  </div>
  
  <div class="flex items-center mt-4">
    <input type="text" class="rounded-l p-2 flex-grow border border-gray-300" bind:value="{newMessage}" placeholder="Type your message..." />
    <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r" on:click="{sendChatMessage}" on:keydown={handleKeyDown}>Send</button>
  </div>