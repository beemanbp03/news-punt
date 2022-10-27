
const nflTeamsArray = [
    {
        name:"arizona-cardinals",
        logo:"images/nfl-logos/arizona-cardinals.png",
    },
    {
        name:"atlanta-falcons",
        logo:"images/nfl-logos/atlanta-falcons.png",
    },
    {
        name:"baltimore-ravens",
        logo:"images/nfl-logos/baltimore-ravens.png",
    },
    {
        name:"buffalo-bills",
        logo:"images/nfl-logos/buffalo-bills.png",
    },
    {
        name:"carolina-panthers",
        logo:"images/nfl-logos/carolina-panthers.png",
    },
    {
        name:"chicago-bears",
        logo:"images/nfl-logos/chicago-bears.png",
    },
    {
        name:"cincinnati-bengals",
        logo:"images/nfl-logos/cincinnati-bengals.png",
    },
    {
        name:"cleveland-browns",
        logo:"images/nfl-logos/cleveland-browns.png",
    },
    {
        name:"dallas-cowboys",
        logo:"images/nfl-logos/dallas-cowboys.png",
    },
    {
        name:"denver-broncos",
        logo:"images/nfl-logos/denver-broncos.png",
    },
    {
        name:"detroit-lions",
        logo:"images/nfl-logos/detroit-lions.png",
    },
    {
        name:"green-bay-packers",
        logo:"images/nfl-logos/green-bay-packers.png",
    },
    {
        name:"houston-texans",
        logo:"images/nfl-logos/houston-texans.png",
    },
    {
        name:"indianapolis-colts",
        logo:"images/nfl-logos/indianapolis-colts.png",
    },
    {
        name:"jacksonville-jaguars",
        logo:"images/nfl-logos/jacksonville-jaguars.png",
    },
    {
        name:"kansas-city-chiefs",
        logo:"images/nfl-logos/kansas-city-chiefs.png",
    },
    {
        name:"las-vegas-raiders",
        logo:"images/nfl-logos/las-vegas-raiders.png",
    },
    {
        name:"los-angeles-chargers",
        logo:"images/nfl-logos/los-angeles-chargers.png",
    },
    {
        name:"los-angeles-rams",
        logo:"images/nfl-logos/los-angeles-rams.png",
    },
    {
        name:"miami-dolphins",
        logo:"images/nfl-logos/miami-dolphins.png",
    },
    {
        name:"minnesota-vikings",
        logo:"images/nfl-logos/minnesota-vikings.png",
    },
    {
        name:"new-england-patriots",
        logo:"images/nfl-logos/new-england-patriots.png",
    },
    {
        name:"new-orleans-saints",
        logo:"images/nfl-logos/new-orleans-saints.png",
    },
    {
        name:"new-york-giants",
        logo:"images/nfl-logos/new-york-giants.png",
    },
    {
        name:"new-york-jets",
        logo:"images/nfl-logos/new-york-jets.png",
    },
    {
        name:"philadelphia-eagles",
        logo:"images/nfl-logos/philadelphia-eagles.png",
    },
    {
        name:"pittsburgh-steelers",
        logo:"images/nfl-logos/pittsburgh-steelers.png",
    },
    {
        name:"san-francisco-49ers",
        logo:"images/nfl-logos/san-francisco-49ers.png",
    },
    {
        name:"seattle-seahawks",
        logo:"images/nfl-logos/seattle-seahawks.png",
    },
    {
        name:"tampa-bay-buccaneers",
        logo:"images/nfl-logos/tampa-bay-buccaneers.png",
    },
    {
        name:"tennessee-titans",
        logo:"images/nfl-logos/tennessee-titans.png",
    },
    {
        name:"washington-commanders",
        logo:"images/nfl-logos/washington-commanders.png",
    }
];

//
const slideWrapper = document.querySelector("#slideWrapper");
const wheelDiv = document.createElement('div');
wheelDiv.setAttribute('id', 'teamSlideWheel');

//add nfl teams to #teamSlideWheel div
nflTeamsArray.forEach(item => {
    //console.log(item.name);

    //team div
    var teamDiv = document.createElement('div');
    teamDiv.setAttribute('class', 'team');

    //team name <p>
    var teamLogo = document.createElement('img');
    teamLogo.setAttribute('src', item.logo);
    teamLogo.setAttribute('class', 'team-logo');
    teamLogo.setAttribute('onclick', `handleSelectTeam( "${item.name.toString()}" )`);
    teamDiv.appendChild(teamLogo);

    wheelDiv.appendChild(teamDiv);
});

//Add next/prev buttons for teamWheel
const buttonDiv = document.createElement('div');
const lineBreak = document.createElement('br');
const nextButton = document.createElement('button');
const prevButton = document.createElement('button');
const allNewsButton = document.createElement('button');
buttonDiv.setAttribute('id', 'btns');
nextButton.setAttribute('class', 'btn btn-next');
prevButton.setAttribute('class', 'btn btn-prev');
allNewsButton.setAttribute('id', 'btn-all-news');
nextButton.innerHTML = ">";
prevButton.innerHTML = "<";
allNewsButton.innerHTML = "Search All NFL News";

buttonDiv.appendChild(prevButton);
buttonDiv.appendChild(nextButton);


slideWrapper.appendChild(wheelDiv);
slideWrapper.appendChild(buttonDiv);



//Make team selection carousel
// Select all slides
const teams = document.querySelector('.team');

// select next/prev team button
const nextTeam = document.querySelector(".btn-next");
const prevTeam = document.querySelector(".btn-prev");


//Add functionality to next/prev buttons
nextTeam.addEventListener('click', () => {
    const slideAmount = teams.clientWidth * 3;
    wheelDiv.scrollLeft += slideAmount;
});

nextTeam.addEventListener('wheel', (event) => {
    const slideAmount = teams.clientWidth * 3;
    wheelDiv.scrollLeft += slideAmount;
});


prevTeam.addEventListener('click', () => {
    const slideAmount = teams.clientWidth * 3;
    wheelDiv.scrollLeft -= slideAmount;
});

