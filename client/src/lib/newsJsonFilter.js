export function NewsObjectFilter(newsObject) {
    const newsArticle = {
        title: newsObject.articles[0].title,
        description: newsObject.articles[0].description,
        url: newsObject.articles[0].url,
        urlToImage: newsObject.articles[0].urlToImage,
        publishedAt: newsObject.articles[0].publishedAt,
        source: newsObject.articles[0].source.name,
        content: newsObject.articles[0].content
    }
    return newsArticle;
}