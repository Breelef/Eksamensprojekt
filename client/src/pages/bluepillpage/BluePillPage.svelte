<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { Card } from "flowbite-svelte";
    import { ArticleListBluePill } from "../../../store/globalStore";
    const navigate = useNavigate();
	const location = useLocation();
    import io, { Socket } from "socket.io-client"
    import { onMount } from "svelte";

    let socket;
    document.body.style.backgroundColor = "#5D8DD6";
    onMount(() => {
        socket = io("localhost:8080/bluepill");

        socket.on("bluepillarticles", (data) => {
            console.log(data);
            const articles = data.articles.map((article, index) => ({
                ...article,
                key: index.toString()
            }));
            ArticleListBluePill.set(articles);
            console.log($ArticleListBluePill);
        });
        socket.emit("requestArticlesbluepill");
    });
    function handleArticles(){
        socket.emit("requestArticlesbluepill");
    }

</script>
<h1>This is blue pill page</h1>
<button on:click={handleArticles}>Fetch Articles</button>
<div class="flex flex-wrap">
    {#each $ArticleListBluePill as article (article.key)}
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

