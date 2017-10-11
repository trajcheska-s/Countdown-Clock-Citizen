
// change showtime here, must be in UTC / Zulu time
var showTime = new Date("2017-11-12T12:00:00.000Z");
var lang = "en"
var copy = {
    en: {
        // days: 'DAYS',
        hours: 'HOURS',
        minutes: 'MINUTES',
        seconds: 'SECONDS',
        end: 'CONGRATULATIONS! YOU\'VE MADE IT!'
    }
}

var resizeTimeout;
var countdown;
var millisecondsPerSecond = 1000; 
var millisecondsPerMinute = 1000 * 60; 
var millisecondsPerHour   = 1000 * 60 * 60;
// // var millisecondsPerDay    = 1000 * 60 * 60 * 24;


window.addEventListener("resize", resizeThrottler, false);

document.addEventListener("DOMContentLoaded", function(event){
    scaleContainer();
    setLanguage();
    startCountDown();
    startWatch();
});

function startCountDown(){
    updateCountDown();
    countdown = setInterval(function(){
                    updateCountDown();
                }, 1000);
}

function startWatch(){
    updateWatch();
    setInterval(function(){
        updateWatch();
    }, 1000);
}

function updateCountDown(){
    var currentTime = new Date();
    var millisecondsLeft = showTime - currentTime + 1000;
    
    if(millisecondsLeft <= 1000){
        stopCountDown();
        return;
    }

    // var daysLeft = Math.floor(millisecondsLeft / millisecondsPerDay);
    // millisecondsLeft %= millisecondsPerDay;

    var hoursLeft = Math.floor(millisecondsLeft / millisecondsPerHour);
    millisecondsLeft %= millisecondsPerHour;

    var minutesLeft = Math.floor(millisecondsLeft / millisecondsPerMinute);
    millisecondsLeft %= millisecondsPerMinute;

    var secondsLeft = Math.floor(millisecondsLeft / millisecondsPerSecond);

    // document.querySelector("#days .time-number").innerText    = formatNumber(daysLeft);
    document.querySelector("#hours .time-number").innerText   = formatNumber(hoursLeft);
    document.querySelector("#minutes .time-number").innerText = formatNumber(minutesLeft);
    document.querySelector("#seconds .time-number").innerText = formatNumber(secondsLeft);
}

function updateWatch(){
    var currentTime = new Date();
    var seconds     = currentTime.getSeconds();
    var minutes     = currentTime.getMinutes();
    var hours       = currentTime.getHours();
    console.log("Hours " + hours + " Min " + minutes + " sec " + seconds);

    var secondPosition         = (seconds *  6);                   //  6 = 360 deg / 60 sec
    var minutePosition         = (minutes *  6) + (seconds * 0.1);  //  6 = 360 deg / 60 min, 0.1 =  6 deg / 60 sec
    var hourPosition           = (hours   * 30) + (minutes * 0.5);  // 30 = 360 deg / 12 hr,  0.5 = 30 deg / 60 min
  //  var twentyFourHourPosition = (hours   * 15) + (minutes * 0.25); // 15 = 360 deg / 24 hr,  0.5 = 15 deg / 60 min

    document.getElementById("second-hand").style.transform           = "rotate(" + secondPosition + "deg)";
    document.getElementById("minute-hand").style.transform           = "rotate(" + minutePosition + "deg)";
    document.getElementById("hour-hand").style.transform             = "rotate(" + hourPosition   + "deg)";
    // document.getElementById("twenty-four-hour-hand").style.transform = "translate(-52px, 52px) rotate(" + twentyFourHourPosition + "deg)";
}



function setLanguage(){
    var path = window.location.pathname.split("/");
    if(path.indexOf("en") > -1){
        lang = "en";
    } else if(path.indexOf("es") > -1){
        lang = "es";
    } else if(path.indexOf("pt") > -1){
        lang = "pt";
    }
}


function resizeThrottler(){
    if ( !resizeTimeout ){
        resizeTimeout = setTimeout(function(){
        resizeTimeout = null;
        scaleContainer();
        }, 33.33);
    }
}

function scaleContainer(){
    var width = window.innerWidth / 2000;
    if (width > 1) width = 1;
    document.getElementById("container").style.transform = "scale(" + width + ")";
}

function formatNumber(number){
    if (number.toString().length == 1) return "0" + number.toString();
    else return number.toString();
}

function stopCountDown(){
    clearInterval(countdown);
    document.getElementById("countdown").innerText = copy[lang].end;
    document.getElementById("countdown").className = "end";
}