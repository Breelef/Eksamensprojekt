<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    const navigate = useNavigate();
	const location = useLocation();
    import { Button } from "flowbite-svelte";
    import { ArticleListRedpill } from "../../../store/globalStore";
    import io from "socket.io-client"
    import { onMount } from "svelte";

    let socket;
    

    onMount(() => {
        socket = io("localhost:8080/redpill");

        socket.on("redpillarticles", (data) => {
            const articles = data.articles.map((article, index) => ({
                ...article,
                key: index.toString()
            }));
            ArticleListRedpill.set(articles);
        });
        socket.emit("requestArticlesredpill");
        document.body.style.backgroundColor = "#000";
    });
    function adminPage(){
        const from = ($location.state && $location.state.from) || "/redpill/admin";
        navigate(from, { replace: true });
    }
</script>
<Button btnClass="bg-green-600 text-white px-4 py-2 rounded absolute top-0 right-0 mt-4 mr-4"color="green" on:click={adminPage}>Admin</Button>
<div class="flex flex-wrap">
    {#each $ArticleListRedpill as article (article.key)}
            <div class="dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg dark:border-gray-700 shadow-md flex max-w-sm flex-col relative m-2" style="background-color: #1CA152;">
                <img class="rounded-t-lg" src="{decodeURIComponent(article.urlToImage)}" alt="">
                <div class="p-4 sm:p-6">
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white pb-3">{article.title}</h5>
                    <h5 class="mb-2 text-lg tracking-tight text-gray-900 dark:text-white pb-3">{article.description}</h5>
                    <p class="absolute bottom-0 left-0 m-2 text-gray-500">{article.publishedAt}</p>
                    <a href="{decodeURIComponent(article.url)}" target="_blank" class="inline-flex items-center text-black hover:underline absolute bottom-0 right-0 mr-5 mb-2">
                    Go to article
                    </a>
                </div>
            </div> 
    {/each}
</div>