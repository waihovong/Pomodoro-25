var timer;
var pomodoroTimer;

var resetElement;
var minutes = parseFloat(25);
var seconds = parseFloat(00);
var content = document.getElementById('main-content');
function startTimer() {
    //setInterval used for every iteration of the timer
    timer = setInterval(function() {
        var count = document.getElementById('timer');
        //reset the timer back up to 59 seconds once it reaches 0, else continually decrement the seconds
        if(seconds <= 0) {
            seconds = 59;
        } else {
            seconds = seconds - 1;
        }
        //subtract 1 from the minutes as seconds reaches 59 to indicate new minute
        if(seconds == 59) {
            minutes = minutes - 1;
        }
        //if minutes is 0 stop the timer and clear interval
        //must reset the timer to be able to start again
        if(minutes < 0 ) {
            clearInterval(timer);
            minutes = 0;
            seconds = 0;
        }
        seconds = checkSeconds(seconds);
        var tabCount = count.innerHTML = minutes + ":" + seconds;
        document.title = tabCount + " - " + "Pomodoro 25";

    }, 1000);
    // console.log(timer);
}


//check for if the seconds is < 10, if so then add additional 0's , ie :09 instead of :9
function checkSeconds(sec) {
    if(sec < 10 && sec >= 0) {
        sec = "0" + sec;
    }
    return sec;
}

//disable the button from clicking again, to stop executing per click, has to do with how I wrote the startTimer() function

var buttonElement;
function disableButtonClick() {
    buttonElement = document.getElementById('start-default');
    buttonElement.disabled = true;
}

//reset the timer back to 25 minutes, and change the button disable to that start button can be clicked again

function resetTimer() {
    pomodoroTimer = minutes + ":" + seconds;
    // resetElement = document.getElementById('timer').innerHTML = minutes + ":" + seconds;
    resetElement = document.getElementById('timer').innerHTML = "25:00";
    minutes = 25;
    seconds = 00;
    buttonElement.disabled = false;
}

//stop button to pause the timer, reset the disable button so the start button can be pressed again
function pauseTimer() {
    clearTimeout(timer);
    buttonElement.disabled = false;
}

function darkModeThemeOn() {
    var darkModeON = document.getElementById('body-container');
    darkModeON.classList.toggle('theme-off');
}
//challenges
//Figuring out that the button press needs to be disabled otherwise timer loops itself with a new time

//figuring out how to reset, still not sure if doing it the correct way by using innerHTML string



