const apiKey = '';
const searchField = document.getElementById('search-input');
const blogContainer = document.getElementById('block-container');
const searchButton = document.getElementById('search-button');




async function fetchRaondomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }
    catch (e) {
        console.error("Error fetching random news", e);
        return [];
    }

}

searchButton.addEventListener('click', async () => {
    const querry = searchField.value.trim();
    if (querry !== '') {
        try {
            const articles = await fetchNewsFromQuerry(querry);
            displayBlocks(articles);

        } catch (e) {
            console.log('error', e);

        }
    }
    else {
        alert("No data to search");
    }
    console.log(querry)

}
)

async function fetchNewsFromQuerry(querry) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${querry}&pageSize=10&apiKey=${apiKey}`
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }
    catch (e) {
        console.error("Error fetching random news", e);
        return [];
    }

}
function displayBlocks(articles) {
    blogContainer.innerHTML = ""
    articles.forEach(article => {
        if (article.title !== null && article.urlToImage !== null && article.description !== null) {
            const blogCard = document.createElement('div');
            blogCard.classList.add('blog-card');
            const image = document.createElement('img');

            image.src = article.urlToImage;
            image.alt = article.title;
            const title = document.createElement('h2');
            TrunkatedTitle = article.title.length > 30 ? article.title.slice(0, 31) + "..." :
                article.title;
            title.textContent = TrunkatedTitle;
            const desc = document.createElement('p');
            trunkatedDescription = article.description.length > 120 ? article.description.slice(0, 120) + "..." :
                article.description;
            desc.textContent = trunkatedDescription;
            blogCard.appendChild(image);
            blogCard.appendChild(title);
            blogCard.appendChild(desc);
            blogCard.addEventListener('click', () => {
                window.open(article.url, "__blank")

            }
            )
            blogContainer.appendChild(blogCard);
        }



    });

}


(async () => {
    try {
        const articles = await fetchRaondomNews();
        console.log(articles);
        displayBlocks(articles);


    }
    catch (e) {
        console.error("Error fetching random news", e);

    }


}
)();