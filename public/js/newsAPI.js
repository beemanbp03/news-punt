const userFavoriteTeam = document.currentScript.getAttribute("teamName");
console.log("USER: " + userFavoriteTeam);
const articleObject = [];
const articleLimit = 100;
const buttonsToDisable = document.querySelectorAll('.team-logo');
const searchAllButton = document.getElementById('searchAll');
const searchAfcButton = document.getElementById('searchAfc');
const searchNfcButton = document.getElementById('searchNfc');
var searchAll = false;

/* 
    This function runs once a team logo has been clicked on the slider created in index.js, cleans
    any existing results off the screen, and then gets new results by passing the function's parameter "teamName"
    through the getNewsResults function
*/
const handleSelectTeam = (division, teamName, color1, color2) => {
    searchAll = false;
    console.log("Running handleSelectTeam method...");
    cleanResults();
    getNewsResults(division, teamName, color1, color2);
}

/*
    this function removes the existing object in the articleObject array,
    grabs the div containing all results, then removes it if it exists
*/
const cleanResults = () => {
    //Clean the articleObject array

    articleObject.length = 0;

    //Remove current results showing
    if (document.querySelector('#resultsTeamTitle')) {
        const resultsShowingToDelete = document.querySelector('#resultsTeamTitle');
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
const getNewsResults = (division, teamName, color1, color2) => {
    var options = {};
    console.log("inside getNewsResults");
    if (teamName) {
        if (teamName === "AFC" || teamName === "NFC") {
            options = {
                method: 'GET',
                url: `https://nfl-news-feed.p.rapidapi.com/news/${division}`,
                headers: {
                  'X-RapidAPI-Key': 'f412dabadbmsh6178f456828d5c5p11fb59jsn491d260a3482',
                  'X-RapidAPI-Host': 'nfl-news-feed.p.rapidapi.com'
                }
              };
        } else {
            options = {
                method: 'GET',
                url: `https://nfl-news-feed.p.rapidapi.com/news/${division}/${teamName}`,
                headers: {
                  'X-RapidAPI-Key': 'f412dabadbmsh6178f456828d5c5p11fb59jsn491d260a3482',
                  'X-RapidAPI-Host': 'nfl-news-feed.p.rapidapi.com'
                }
              };
        }
    } else {
        console.log("inside getNewsResults.ALL");
        options = {
            method: 'GET',
            url: `https://nfl-news-feed.p.rapidapi.com/news`,
            headers: {
              'X-RapidAPI-Key': 'f412dabadbmsh6178f456828d5c5p11fb59jsn491d260a3482',
              'X-RapidAPI-Host': 'nfl-news-feed.p.rapidapi.com'
            }
          };
    }

    //Run the API search
    axios.request(options).then((response) => {
    console.log("GET initiated");
    //console.log(response.data);

    //Add new result-set to array
    articleObject.push(response.data);
    console.log(response.data);

    //console.log("articleObject: " + articleObject);

    //Call function to build the news results section on the page
    if (articleObject.length == 1) {
        if (teamName && searchAll == false) {
            buildResultsSection(division, makeTeamNameCapitalized(teamName), color1, color2);
        } else {
            buildResultsSection("League", "All News", "#ffffff", "#000000");
        }
        
    }
    })
    .catch((err) => {
        console.log(err);
    })
    .then(() => {
        console.log("GET complete");
    });
}

/* 
    This function builds the html required to display each news item from
    the articlesObject array
*/
const buildResultsSection = (division, teamName, color1, color2) => {
    var colorMain = "#" + color1 ;
    var colorSecondary = "#" + color2;
    console.log(colorSecondary);


    //find the main element
    const main = document.getElementById('main');
    main.style.backgroundColor = colorSecondary;

    //Build .main-container for all news card
    const mainContainer = document.createElement('div');
    mainContainer.setAttribute('id', 'news-container');
    main.appendChild(mainContainer);
    


    //change title of page to reflect team name of results section (example: News Punt | Green Bay Packers)
    document.title = `News Punt | ${teamName}`;

    
    //create results number range element
    resultsTeamTitle = document.createElement('h1');
    resultsTeamTitle.setAttribute('id', 'resultsTeamTitle');
    resultsTeamTitle.innerHTML = teamName;
    resultsTeamTitle.style.color = colorMain;

    mainContainer.appendChild(resultsTeamTitle);


        //Article output loop
        for (var item in articleObject[0]) {

            itemObject = articleObject[0][item];
            //console.log(itemObject);

            //Create .news-card a element
            newsCard = document.createElement('a');
            newsCard.classList.add('news-card');
            newsCard.setAttribute('style', `text-decoration:none;color:inherit;box-shadow:inset 0px 0px 40px -2px ${colorMain};`);
            newsCard.setAttribute('href', itemObject.url);
            newsCard.setAttribute('target', '_blank');
            
            //Create H2 element
            title = document.createElement('h2');
            title.innerHTML = itemObject.title;

            //Create Image element
            thumbnail = document.createElement('img');
            thumbnail.classList.add('news-card-thumbnail');
            thumbnail.src = `${itemObject.thumbnail}`;
        
            //Create p "publish date" element
            pubDate = document.createElement('p');
            pubDate.innerHTML = `${itemObject.pubDate}`;
        
            //Append h2 and p elements to .news-card Div
            newsCard.appendChild(title);
            newsCard.appendChild(thumbnail);
            newsCard.appendChild(pubDate);

        
            //Append .news-card Div to the main container div
            mainContainer.appendChild(newsCard);

        }
    //Remove loading bar once results section is built
    
    const loader = document.querySelector('.loader');
    main.removeChild(loader);

}

const makeTeamNameCapitalized = teamName => {
    let teamNameArray = teamName.split("-");
    let result = '';
    
    teamNameArray.forEach((item, index) => {
        item = item[0].toUpperCase() + item.substr(1);
        result = result + " " + item;
        
    });

    return result.trim();
}


//Initiated the GET for NFL news when paige loads
if (userFavoriteTeam && searchAll == false) {
    getNewsResults(userFavoriteTeam, color1, color2);
} else {
    getNewsResults();
}

//Initiate GET for NFL news if ALL/AFC/NFC buttons are pressed
searchAllButton.addEventListener('click', () => {
    searchAll = true;
    cleanResults();
    const main = document.getElementById('main');
    main.style.backgroundColor = "#F7F7F7";
    getNewsResults();
    console.log("searchAll = " + searchAll);
});

searchAfcButton.addEventListener('click', () => {
    cleanResults();
    const main = document.getElementById('main');
    main.style.backgroundColor = "#F7F7F7";
    getNewsResults("afc", "AFC", "null", "null");
});

searchNfcButton.addEventListener('click', () => {
    cleanResults();
    const main = document.getElementById('main');
    main.style.backgroundColor = "#F7F7F7";
    getNewsResults("nfc", "NFC", "null", "null");
});

