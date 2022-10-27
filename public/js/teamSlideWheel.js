
const user = document.currentScript.getAttribute("userExists");
var color1;
var color2;
const nflTeamsArray = [
    {
        name:"arizona-cardinals",
        colorCodes:["97233f", "000000"],
        logo:"images/nfl-logos/arizona-cardinals.png",
    },
    {
        name:"atlanta-falcons",
        colorCodes:["a71930", "000000"],
        logo:"images/nfl-logos/atlanta-falcons.png",
    },
    {
        name:"baltimore-ravens",
        colorCodes:["241773", "000000"],
        logo:"images/nfl-logos/baltimore-ravens.png",
    },
    {
        name:"buffalo-bills",
        colorCodes:["00338d", "c60c30"],
        logo:"images/nfl-logos/buffalo-bills.png",
    },
    {
        name:"carolina-panthers",
        colorCodes:["0085ca", "000000"],
        logo:"images/nfl-logos/carolina-panthers.png",
    },
    {
        name:"chicago-bears",
        colorCodes:["c83803", "0b162a"],
        logo:"images/nfl-logos/chicago-bears.png",
    },
    {
        name:"cincinnati-bengals",
        colorCodes:["fb4f14", "000000"],
        logo:"images/nfl-logos/cincinnati-bengals.png",
    },
    {
        name:"cleveland-browns",
        colorCodes:["311d00", "ff3c00"],
        logo:"images/nfl-logos/cleveland-browns.png",
    },
    {
        name:"dallas-cowboys",
        colorCodes:["002244", "869397"],
        logo:"images/nfl-logos/dallas-cowboys.png",
    },
    {
        name:"denver-broncos",
        colorCodes:["002244", "FB4F14"],
        logo:"images/nfl-logos/denver-broncos.png",
    },
    {
        name:"detroit-lions",
        colorCodes:["0076B6", "B0B7BC"],
        logo:"images/nfl-logos/detroit-lions.png",
    },
    {
        name:"green-bay-packers",
        colorCodes:["FFB612", "203731"],
        logo:"images/nfl-logos/green-bay-packers.png",
    },
    {
        name:"houston-texans",
        colorCodes:["A71930", "03202F"],
        logo:"images/nfl-logos/houston-texans.png",
    },
    {
        name:"indianapolis-colts",
        colorCodes:["002C5F", "ffffff"],
        logo:"images/nfl-logos/indianapolis-colts.png",
    },
    {
        name:"jacksonville-jaguars",
        colorCodes:["006778", "D7A22A"],
        logo:"images/nfl-logos/jacksonville-jaguars.png",
    },
    {
        name:"kansas-city-chiefs",
        colorCodes:["FFB612", "e31837"],
        logo:"images/nfl-logos/kansas-city-chiefs.png",
    },
    {
        name:"las-vegas-raiders",
        colorCodes:["000000", "a5acaf"],
        logo:"images/nfl-logos/las-vegas-raiders.png",
    },
    {
        name:"los-angeles-chargers",
        colorCodes:["0073cf", "ffb612"],
        logo:"images/nfl-logos/los-angeles-chargers.png",
    },
    {
        name:"los-angeles-rams",
        colorCodes:["003594", "fed02a"],
        logo:"images/nfl-logos/los-angeles-rams.png",
    },
    {
        name:"miami-dolphins",
        colorCodes:["008e97", "f26a24"],
        logo:"images/nfl-logos/miami-dolphins.png",
    },
    {
        name:"minnesota-vikings",
        colorCodes:["4f2683", "ffc62f"],
        logo:"images/nfl-logos/minnesota-vikings.png",
    },
    {
        name:"new-england-patriots",
        colorCodes:["002244", "c60c30"],
        logo:"images/nfl-logos/new-england-patriots.png",
    },
    {
        name:"new-orleans-saints",
        colorCodes:["d3bc8d", "D3BC8D"],
        logo:"images/nfl-logos/new-orleans-saints.png",
    },
    {
        name:"new-york-giants",
        colorCodes:["0b2265", "a71930"],
        logo:"images/nfl-logos/new-york-giants.png",
    },
    {
        name:"new-york-jets",
        colorCodes:["003f2d", "ffffff"],
        logo:"images/nfl-logos/new-york-jets.png",
    },
    {
        name:"philadelphia-eagles",
        colorCodes:["004c54", "a5acaf"],
        logo:"images/nfl-logos/philadelphia-eagles.png",
    },
    {
        name:"pittsburgh-steelers",
        colorCodes:["FFB612", "000000"],
        logo:"images/nfl-logos/pittsburgh-steelers.png",
    },
    {
        name:"san-francisco-49ers",
        colorCodes:["aa0000", "b3995d"],
        logo:"images/nfl-logos/san-francisco-49ers.png",
    },
    {
        name:"seattle-seahawks",
        colorCodes:["002244", "69be28"],
        logo:"images/nfl-logos/seattle-seahawks.png",
    },
    {
        name:"tampa-bay-buccaneers",
        colorCodes:["d50a0a", "34302b"],
        logo:"images/nfl-logos/tampa-bay-buccaneers.png",
    },
    {
        name:"tennessee-titans",
        colorCodes:["002244", "4b92db"],
        logo:"images/nfl-logos/tennessee-titans.png",
    },
    {
        name:"washington-commanders",
        colorCodes:["FFB612", "773141"],
        logo:"images/nfl-logos/washington-commanders.png",
    }
];

//
const slideWrapper = document.querySelector("#slideWrapper");
const wheelDiv = document.createElement('div');
wheelDiv.setAttribute('id', 'teamSlideWheel');

//Check if user exists
if (user) {
    for (let i = 0; i < nflTeamsArray.length - 1; i++) {
        if (nflTeamsArray[i].name === user) {
            let name = nflTeamsArray[i].name;
            color1 = nflTeamsArray[i].colorCodes[0];
            color2 = nflTeamsArray[i].colorCodes[1];
            window.addEventListener('load', () => {handleSelectTeam(`${name}`, `${color1}`, `${color2}`);});
        }
    }
}

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
    teamLogo.setAttribute('onclick', `handleSelectTeam( "${item.name.toString()}", "${item.colorCodes[0]}", "${item.colorCodes[1]}" )`);
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

