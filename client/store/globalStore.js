import { readable, writable } from "svelte/store";

export const BASE_URL = readable("http://localhost:8080");
export const ArticleListBluePill = writable([]);
export const ArticleListRedpill = writable([]);
export const isAuthenticated = writable(false);
export const user = writable(null);