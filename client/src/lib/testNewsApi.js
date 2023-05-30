const APIKEY = "508f13be86a44b23a5d6041b1db7d914";
const url = "https://newsapi.org/v2/everything";
const query = "entertainment"
import { derived } from "svelte/store";
import { NewsObjectFilter } from "./newsJsonFilter.js";
import { user } from "../../store/globalStore.js"

export function getNews(){
    
    let username = null;

    // Subscribe to the derived store and update the username
    user.subscribe(($user) => {
      username = $user ? $user.username : null;
    });
    
    // Example usage
    console.log(username); // Output the username
}