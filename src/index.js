var timer;
var pomodoroTimer;
var breakTimer;
var resetElement;

var buttonElement = 0;
var pomodoroElement = 0;
var breakElement = 0;

//pending -> true = Pomodoro related functions
//pending -> false = BreakTimer related functions
var pending = true;

var minutes = parseFloat(25);
var seconds = parseFloat(00);
var breakMinutes = parseFloat(5);
var breakSeconds = parseFloat(00);

var content = document.getElementById('main-content');


//audio playlist to notify user that the time has finished
function audiocue(playList) {
    var audio = document.getElementById('myAudio1');
    var audioBreak = document.getElementById('myAudio2');
    if(playList ===  1) {
        audio.play();
    } else if(playList === 2) {
        audioBreak.play();
    }
}

//check for if the seconds is < 10, if so then add additional 0's infront of integer
function checkSeconds(sec) {
    if(sec < 10 && sec >= 0) {
        sec = "0" + sec;
    }
    return sec;
}

//pomodoro timer function for 25 minutes of productivity
function pomodoroTimer() {
    pending = true;
    var count = document.getElementById('timer');
    //setInterval used for every iteration of the timer
    timer = setInterval(function() {
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
            audiocue(1);
            clearInterval(timer);
            minutes = 0;
            seconds = 0;
        }
            seconds = checkSeconds(seconds);
            var tabCount = count.innerHTML = minutes + ":" + seconds;
            document.title = tabCount + " - " + "Pomodoro 25";
    }, 1000); 
}

//break time function give 5 minutes break time each study
function breakTimer() {
    pending = false;
    var count = document.getElementById('timer');
    //setInterval used for every iteration of the timer
    timer = setInterval(function() {

        //reset the timer back up to 59 seconds once it reaches 0, else continually decrement the seconds
        if(breakSeconds <= 0) {
            breakSeconds = 59;
        } else {
            breakSeconds = breakSeconds - 1;
        }
        //subtract 1 from the minutes as seconds reaches 59 to indicate new minute
        if(breakSeconds == 59) {
            breakMinutes = breakMinutes - 1;
        }
        //if minutes is 0 stop the timer and clear interval
        //must reset the timer to be able to start again
        if(breakMinutes < 0) {
            audiocue(2);
            clearInterval(timer);
            breakMinutes = 0;
            breakSeconds = 0;
        }
            breakSeconds = checkSeconds(breakSeconds);
            var breakTab = count.innerHTML = breakMinutes + ":" + breakSeconds;
            document.title = breakTab + " - " + "Pomodoro 25";
    }, 1000);
}

function startTimerHelper() {
    bool = pending;
    if(pending == true) {
        pomodoroTimer();
    } else if(pending == false) {
        breakTimer();
    }
}

//reset the timer back to 25 minutes
function resetTimerPomodoro() {
        resetElement = document.getElementById('timer').innerHTML = "25:00";
        minutes = 25;
        seconds = 00;
}

//reset the timer back to 5 minutes
function resetTimerBreak() {
        resetElement = document.getElementById('timer').innerHTML = "5:00";
        breakMinutes = 5;
        breakSeconds = 00;
}

//helper function to determine which reset needs to happen according to which button was clicked on first

//ie, pomodoro button was clicked, thus reset 25 minutes
//ie, break time button was clicked, thus reset 5 minutes
function resetTimerHelper() {
    buttonElement.disabled = false;
    pomodoroElement.disabled = false;
    breakElement.disabled = false;
    if (pending === true) {
        resetTimerPomodoro();
    } else if (pending === false) {
        resetTimerBreak();
    }
}

//stop button to pause the timer, reset the disable button so the start button can be pressed again
function pauseTimer() {
    clearTimeout(timer);
    buttonElement.disabled = false;
    pomodoroElement.disabled = false;
    breakElement.disabled = false;
}

//button function for the pomodoro
function pomodoro() {
    pending = true;
    pauseTimer();
    resetTimerHelper();
    document.getElementById('timer').innerHTML = "25:00";
}

//button function for the break time
function breakTimerFive() {
    pending = false;
    pauseTimer();
    resetTimerHelper();
    document.getElementById('timer').innerHTML = "5:00";
}

function disableButtonClick(disableValue) {
    if (disableValue === 1) {
        buttonElement = document.getElementById('start-default');
        buttonElement.disabled = true;
    } else if (disableValue ===  2) {
        pomodoroElement = document.getElementById('pomodoro-default');
        pomodoroElement.disabled = true;
    } else if (disableValue === 3) {
        breakElement = document.getElementById('break-default');
        breakElement.disabled = true;
    }
}


//reduces eye strain with dark mode slider
function darkModeThemeOn() {
    var darkModeON = document.getElementById('body-container');
    darkModeON.classList.toggle('theme-off');
}

