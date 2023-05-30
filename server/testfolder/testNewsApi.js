import NewsApi from "newsapi";


const APIKEY = "508f13be86a44b23a5d6041b1db7d914";
const url = "https://newsapi.org/v2/everything";
const query = "football"
const newsapi = new NewsApi(APIKEY);
newsapi.v2.everything({
    q: 'sports OR movies OR "TV shows" OR celebrities OR "new record" -strike',
    language: 'en',
    pageSize: 10,
    sortBy: 'relevancy',
    excludeDomains: 'lifehacker.com'
}).then(response => {
    console.log(response);
});

// async function getNews(){
//     const response = await fetch(url + `?language=en&q=${query}&pageSize=1&apiKey=${APIKEY}`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//     });
//     const data = await response.json();
//     console.log(data.articles[0]);
//     console.log(data.articles[0].source.name);
//     const source = data.articles[0].source;
//     console.log(source)
// }
// getNews();