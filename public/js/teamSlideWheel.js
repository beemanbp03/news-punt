
const user = document.currentScript.getAttribute("userExists");
var color1;
var color2;
const nflTeamsArray = [
    {division:"afc", teams: [
        {
            name:"baltimore-ravens",
            colorCodes:["241773", "000000"],
            logo:"images/nfl-logos/baltimore-ravens.png",
        },
        {
            name:"buffalo-bills",
            colorCodes:["c60c30", "00338d96"],
            logo:"images/nfl-logos/buffalo-bills.png",
        },
        {
            name:"cincinnati-bengals",
            colorCodes:["fb4f14", "000000"],
            logo:"images/nfl-logos/cincinnati-bengals.png",
        },
        {
            name:"cleveland-browns",
            colorCodes:["ff3c00", "311d00"],
            logo:"images/nfl-logos/cleveland-browns.png",
        },
        {
            name:"denver-broncos",
            colorCodes:["FB4F14", "002244"],
            logo:"images/nfl-logos/denver-broncos.png",
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
            colorCodes:["D7A22A", "006778"],
            logo:"images/nfl-logos/jacksonville-jaguars.png",
        },
        {
            name:"kansas-city-chiefs",
            colorCodes:["FFB612", "ffffff"],
            logo:"images/nfl-logos/kansas-city-chiefs.png",
        },
        {
            name:"las-vegas-raiders",
            colorCodes:["000000", "a5acaf"],
            logo:"images/nfl-logos/las-vegas-raiders.png",
        },
        {
            name:"los-angeles-chargers",
            colorCodes:["ffb612", "0073cf"],
            logo:"images/nfl-logos/los-angeles-chargers.png",
        },
        {
            name:"miami-dolphins",
            colorCodes:["f26a24", "008e9796"],
            logo:"images/nfl-logos/miami-dolphins.png",
        },
        {
            name:"new-england-patriots",
            colorCodes:["c60c30", "002244"],
            logo:"images/nfl-logos/new-england-patriots.png",
        },
        {
            name:"new-york-jets",
            colorCodes:["003f2d", "ffffff"],
            logo:"images/nfl-logos/new-york-jets.png",
        },
        {
            name:"pittsburgh-steelers",
            colorCodes:["FFB612", "000000"],
            logo:"images/nfl-logos/pittsburgh-steelers.png",
        },
        {
            name:"tennessee-titans",
            colorCodes:["FF0000", "4b92db96"],
            logo:"images/nfl-logos/tennessee-titans.png",
        }
    ]},
    {division:"nfc", teams: [
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
            name:"carolina-panthers",
            colorCodes:["000000", "0085ca"],
            logo:"images/nfl-logos/carolina-panthers.png",
        },
        {
            name:"chicago-bears",
            colorCodes:["c83803", "0b162a"],
            logo:"images/nfl-logos/chicago-bears.png",
        },
        {
            name:"dallas-cowboys",
            colorCodes:["869397", "002244"],
            logo:"images/nfl-logos/dallas-cowboys.png",
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
            name:"los-angeles-rams",
            colorCodes:["fed02a", "003594"],
            logo:"images/nfl-logos/los-angeles-rams.png",
        },
        {
            name:"minnesota-vikings",
            colorCodes:["ffc62f", "4f2683"],
            logo:"images/nfl-logos/minnesota-vikings.png",
        },
        {
            name:"new-orleans-saints",
            colorCodes:["D3BC8D", "ffffff"],
            logo:"images/nfl-logos/new-orleans-saints.png",
        },
        {
            name:"new-york-giants",
            colorCodes:["a71930", "0b2265"],
            logo:"images/nfl-logos/new-york-giants.png",
        },
        {
            name:"philadelphia-eagles",
            colorCodes:["004c54", "a5acaf"],
            logo:"images/nfl-logos/philadelphia-eagles.png",
        },
        {
            name:"san-francisco-49ers",
            colorCodes:["aa0000", "b3995d"],
            logo:"images/nfl-logos/san-francisco-49ers.png",
        },
        {
            name:"seattle-seahawks",
            colorCodes:["69be28", "002244"],
            logo:"images/nfl-logos/seattle-seahawks.png",
        },
        {
            name:"tampa-bay-buccaneers",
            colorCodes:["d50a0a", "34302b96"],
            logo:"images/nfl-logos/tampa-bay-buccaneers.png",
        },
        {
            name:"washington-commanders",
            colorCodes:["FFB612", "773141"],
            logo:"images/nfl-logos/washington-commanders.png"
        }
    ]}
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
    item.teams.forEach(team => {
        //console.log(item.division);

        //team div
        var teamDiv = document.createElement('div');
        teamDiv.setAttribute('class', 'team');

        //team name <p>
        var teamLogo = document.createElement('img');
        teamLogo.setAttribute('src', team.logo);
        teamLogo.setAttribute('class', 'team-logo');
        teamLogo.setAttribute('onclick', `handleSelectTeam( "${item.division.toString()}", "${team.name.toString()}", "${team.colorCodes[0]}", "${team.colorCodes[1]}" )`);
        teamDiv.appendChild(teamLogo);

        //console.log("Division: " + item.division + ", Name: " + team.name + ", Color1: " + team.colorCodes[0] + ", Color2: " + team.colorCodes[1]);

        wheelDiv.appendChild(teamDiv);
    });
});

//Add next/prev buttons for teamWheel
const buttonDiv = document.createElement('div');
const lineBreak = document.createElement('br');
const allNewsButton = document.createElement('button');
const afcNewsButton = document.createElement('button');
const nfcNewsButton = document.createElement('button');
allNewsButton.setAttribute('class', 'btn-all-news');
afcNewsButton.setAttribute('class', 'btn-all-news');
nfcNewsButton.setAttribute('class', 'btn-all-news');
allNewsButton.innerHTML = "Search All NFL News";
afcNewsButton.innerHTML = "AFC News";
nfcNewsButton.innerHTML = "NFC News";


slideWrapper.appendChild(wheelDiv);



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

