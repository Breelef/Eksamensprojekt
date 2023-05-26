<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    const navigate = useNavigate();
	const location = useLocation();
    import { Card } from "flowbite-svelte";
    import { ArticleListRedpill } from "../../../store/globalStore";
    import io, { Socket } from "socket.io-client"
    import { onMount } from "svelte";

    let socket;

    onMount(() => {
        socket = io("localhost:8080/redpill");

        socket.on("redpillarticles", (data) => {
            console.log(data);
            const articles = data.articles.map((article, index) => ({
                ...article,
                key: index.toString()
            }));
            ArticleListRedpill.set(articles);
            console.log($ArticleListRedpill);
        });
        socket.emit("requestArticlesredpill");
    });
    function handleArticles(){
        socket.emit("requestArticlesbluepill");
    }
</script>
<h1>This is redpill page</h1>
<button on:click={handleArticles}>Fetch Articles</button>
<div class="flex flex-wrap">
    {#each $ArticleListRedpill as article (article.key)}
        <Card class="relative m-2">
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white pb-3">{article.title}</h5>
            <h5 class="mb-2 text-lg tracking-tight text-gray-900 dark:text-white pb-3">{article.description}</h5>
            <p class="absolute bottom-0 left-0 m-2 text-gray-500">{article.publishedAt}</p>
            <a href="{decodeURIComponent(article.url)}" target="_blank" class="inline-flex items-center text-blue-600 hover:underline absolute bottom-0 right-0 mr-5 mb-2">
                Go to article
            </a>
        </Card>
    {/each}
</div>