const APIKEY = "508f13be86a44b23a5d6041b1db7d914";
const url = "https://newsapi.org/v2/everything";
const query = "politics"


async function getNews(){
    const response = await fetch(url + `?language=en&q=${query}&apiKey=${APIKEY}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    console.log(data);
    //const source = data.articles[0].source;
    //console.log(source)
}
getNews();