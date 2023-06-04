<script>
    import { Card } from "flowbite-svelte";
    import { ArticleListBluePill, BASE_URL } from "../../../store/globalStore";
    import io from "socket.io-client"
    import { onMount } from "svelte";

    let socket;
    let articleCount = 0;
    document.body.style.backgroundColor = "#5D8DD6";
    onMount(() => {
        socket = io("localhost:8080/bluepill");

        socket.on("bluepillarticles", async (data) => {
            const articles = data.articles.map((article) => ({
                ...article,
                key: (articleCount++).toString()
            }));
            const otherArticles = await fetchOtherArticles();
            const allArticles = [...articles, ...otherArticles];
            const shuffledArticles = allArticles.sort(() => 0.5 - Math.random());
            ArticleListBluePill.set(shuffledArticles);
        });
        socket.emit("requestArticlesbluepill");
    });
    async function fetchOtherArticles(){
        let currentLength;
        ArticleListBluePill.subscribe(value => { currentLength = value.length; })();
        const response = await fetch($BASE_URL + "/articles", {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        const articles = data.map((article) => ({
            title: article.title,
            description: article.description,
            urlToImage: "/redpill.png", 
            publishedAt: article.publishedAt,
            url: '',
            key: (articleCount++).toString() 
        }));
        return articles;
    }

</script>
<div class="flex flex-wrap">
    {#each $ArticleListBluePill as article (article.key)}
        <Card class="relative m-2" img="{decodeURIComponent(article.urlToImage)}">
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white pb-3">{article.title}</h5>
            <h5 class="mb-2 text-lg tracking-tight text-gray-900 dark:text-white pb-3">{article.description}</h5>
            <p class="absolute bottom-0 left-0 m-2 text-gray-500">{article.publishedAt}</p>
            <a href="{decodeURIComponent(article.url)}" target="_blank" class="inline-flex items-center text-blue-600 hover:underline absolute bottom-0 right-0 mr-5 mb-2">
                Go to article
            </a>
        </Card>
    {/each}
</div>

