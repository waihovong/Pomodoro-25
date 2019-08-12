var timer;
var pomodoroTimer;
var breakTimer;
var resetElement;

var buttonElement = 0;
var pomodoroElement = 0;
var breakElement = 0;

var pending = true;

var minutes = parseFloat(25);
var seconds = parseFloat(00);
var breakMinutes = parseFloat(5);
var breakSeconds = parseFloat(00);

var content = document.getElementById('main-content');

/*

* audiocue is a function that plays an audio notification to the user 
* allowing them to know that 25 minutes / or 5 minutes is completed

*/
function audiocue(playList) {
    var audio = document.getElementById('myAudio1');
    var audioBreak = document.getElementById('myAudio2');
    if(playList ===  1) {
        audio.play();
    } else if(playList === 2) {
        audioBreak.play();
    }
}


/*

* checkSeconds is a function to check if the seconds is < 10
* if so add an additional 0 infront of < 10 integer

*/
function checkSeconds(sec) {
    if(sec < 10 && sec >= 0) {
        sec = "0" + sec;
    }
    return sec;
}

/*

* pomodoroTimer is a function that counts down 25 minutes of productivity
* and when the timer hits 00:00 it calls the audiocue function
* displays the timer on the browers tab

*/
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

/*

* breakTimer function gives 5 minutes of break time each study
* when the timer hits 00:00 it plays an audio cue to notify the user that the break time has finished
* displays the timer on the browers tab

*/
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

/*

* startTimerHelper is a helper function to determine which function should be called

*/
function startTimerHelper() {
    bool = pending;
    if(pending == true) {
        pomodoroTimer();
    } else if(pending == false) {
        breakTimer();
    }
}

/* 

* resetTimerPomodoro is a function that resets the display back to 25 minutes

*/
function resetTimerPomodoro() {
        resetElement = document.getElementById('timer').innerText = "25:00";
        minutes = 25;
        seconds = 00;
}

/*

* resetTimerBreak is a function that resets the display back to 5 minutes

*/
function resetTimerBreak() {
        resetElement = document.getElementById('timer').innerText = "5:00";
        breakMinutes = 5;
        breakSeconds = 00;
}


/*

* resetTimerHelper is a function to determins which reset needs to happen according to the function called
    //ie, pomodoro button was clicked, thus reset 25 minutes
    //ie, break time button was clicked, thus reset 5 minutes

*/


function resetTimerHelper() {
    buttonElement.disabled = false;
    pomodoroElement.disabled = false;
    breakElement.disabled = false;
    clearTimeout(timer);
    if (pending === true) {
        resetTimerPomodoro();
    } else if (pending === false) {
        resetTimerBreak();
    }
}

/*

* pauseTimer is a function that pauses the timer
* pauseTimer also resets the disabled buttons so that buttons can be clicked again

*/
function pauseTimer() {
    clearTimeout(timer);
    buttonElement.disabled = false;
    pomodoroElement.disabled = false;
    breakElement.disabled = false;
}

/*

* pomodoro is a function that changes the display back to the pomodoro timer
* resetting all the timers
*/
function pomodoro() {
    pending = true;
    pauseTimer();
    resetTimerHelper();
    document.getElementById('timer').innerText = "25:00";
}

/*

* breakTimerFive is a function that changes the timer to 5 minutes break time
* resetting all the timers
*/
function breakTimerFive() {
    pending = false;
    pauseTimer();
    resetTimerHelper();
    document.getElementById('timer').innerText = "5:00";
}

/*

* disableButtonClick is a function that disables the onclick for buttons so that they can not be clicked until enabled again.

*/
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


/*

* darkModeThemeOn is a function to reduce eye strain by changing the backgorund-color to a dark theme 

*/  
function darkModeThemeOn() {
    var darkModeON = document.getElementById('body-container');
    darkModeON.classList.toggle('theme-off');
}

