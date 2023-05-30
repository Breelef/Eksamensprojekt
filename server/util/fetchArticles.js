import NewsAPI from "newsapi";
const newsapi = new NewsAPI(process.env.APIKEY)
function fetchArticlesWithPackage(query, category){
    newsapi.v2.topHeadlines({
        q:`${query}`,
        category: `${category}`,
        language: 'en',
        pageSize: 10,
        sortBy: 'relevancy'
    });
}
console.log(process.env.APIKEY);

async function fetchArticles(query){
    const response = await fetch(process.env.NEWS_URL + `?language=en&q=${query}&pageSize=10&apiKey=${process.env.APIKEY}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
const data = await response.json();
//const result = NewsObjectFilter(data);
//console.log(data.articles[0]);
return data;
}

export default fetchArticlesWithPackage;