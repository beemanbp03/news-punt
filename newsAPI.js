var articleObject = [];
var articleLimit = 100;


/* 
    This function runs once a team logo has been clicked on the slider created in index.js, cleans
    any existing results off the screen, and then gets new results by passing the function's parameter "teamName"
    through the getNewsResults function
*/
const handleSelectTeam = (teamName) => {
    console.log("Running handleSelectTeam method...");
    console.log(teamName);

    cleanResults();
    getNewsResults(teamName);
}

/*
    this function removes the existing object in the articleObject array,
    grabs the div containing all results, then removes it if it exists
*/
const cleanResults = () => {
    //Clean the articleObject array
    articleObject.pop();

    //Remove current results showing
    if (document.querySelector('#resultsShowing')) {
        const resultsShowingToDelete = document.querySelector('#resultsShowing');
        resultsShowingToDelete.remove();
    }

    //Remove current .news-card group of results from the DOM
    const newsCardsToDelete = document.querySelectorAll('.news-card');
    newsCardsToDelete.forEach(newsCard => {
        newsCard.remove();
    });
}


/*
    This function uses Axios GET to retrieve the selected team's news from the api

    source: rapidAPI ()
*/
const getNewsResults = (teamName) => {
    console.log(typeof teamName);

    const options = {
        method: 'GET',
        url: `https://nfl-news-feed.p.rapidapi.com/news/${teamName}`,
        headers: {
          'X-RapidAPI-Key': 'f412dabadbmsh6178f456828d5c5p11fb59jsn491d260a3482',
          'X-RapidAPI-Host': 'nfl-news-feed.p.rapidapi.com'
        }
      };

    //Run the API search for the nfl team that was selected
    axios.request(options).then((response) => {
    console.log("GET initiated");
    console.log(response.data);
    
    //Add new results set to array
    articleObject.push(response.data);

    //Call function to build the news results section on the page
    buildResultsSection();
    })
    .catch((err) => {
        console.log(err);
    })
    .then(() => console.log("GET complete"));
}

/* 
    This function builds the html required to display each news item from
    the articlesObject array
*/
const buildResultsSection = () => {
    const mainContainer = document.getElementById('news-container');

    //create results number range element
    resultsShowing = document.createElement('p');
    resultsShowing.setAttribute('id', 'resultsShowing');
    resultsShowing.innerHTML = `Results: 1 - ${articleLimit}`;

    mainContainer.appendChild(resultsShowing);


        //Article output loop
        for (var item in articleObject[0]) {

            itemObject = articleObject[0][item];
            //console.log(itemObject);

            //Create .news-card Div
            newsCard = document.createElement('a');
            newsCard.classList.add('news-card');
            newsCard.setAttribute('style', "text-decoration:none;color:inherit;");
            newsCard.setAttribute('href', itemObject.url);
            
            //Create H2 element
            title = document.createElement('h2');
            title.innerHTML = itemObject.title;

            //Create Image element
            thumbnail = document.createElement('img');
            thumbnail.classList.add('news-card-thumbnail');
            thumbnail.src = `${itemObject.thumbnail}`;
        
            //Create p "context" element
            context = document.createElement('p');
            context.innerHTML = `${itemObject.pubDate}`;
        
            //Append h2 and p elements to .news-card Div
            newsCard.appendChild(title);
            newsCard.appendChild(thumbnail);
            newsCard.appendChild(context);

        
            //Append .news-card Div to the main container div
            mainContainer.appendChild(newsCard);

        }
}
