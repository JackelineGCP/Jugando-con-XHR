const form = $('#search-form');
const searchField = $('#search-keyword');
const responseContainer = $('#response-container');
let searchedForText;

form.submit(function (e) {
  e.preventDefault();
  responseContainer.html('');
  searchedForText = searchField.val();
  getNews();
});

function getNews() {
  $.ajax({
      url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=c685e23f34b74c619a0895e03bf08727`
    }).done(addNews)
    .fail(handleError);
}

function handleError() {
  console.log('Se ha presentado un error');
}

function addNews(news) {
  const articles = news.response.docs;

  articles.forEach(function (article) {
    const title = article.headline.main;
    const snippet = article.snippet;
    
    
    let li = $('<li />').text(snippet);
    li.className = 'li'
    responseContainer.append(li);
  })
}