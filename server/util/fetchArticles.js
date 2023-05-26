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

export default fetchArticles;