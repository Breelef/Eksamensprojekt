import { readable, writable } from "svelte/store";

export const BASE_URL = readable("http://localhost:8080");
export const ArticleListBluePill = writable([]);
export const ArticleListRedpill = writable([]);
export const chatMessagesRedpill = writable([]);
export const BluepillAccounts = writable([]);
export const isEmailUsed = writable(false);
export const isUsernameUsed = writable(false);
export const isAuthenticated = writable(false);
export const user = writable(null);