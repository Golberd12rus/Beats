/*let player;
const playerContainer = $('.player');

const widthWind = $(".player-section__container").width();
const heightWind = $(".player-section__container").height();


let eventsInit = () => {
    $('.player__start').click(e => {
        e.preventDefault();

        if (playerContainer.hasClass("paused")) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    });

    $(".player__playback").click(e => {
        const bar = $(e.currentTarget);
        const clickedPosition = e.originalEvent.layerX;
        const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
        const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

        $(".player__playback-button").css({
            left: `${newButtonPositionPercent}%`
        });

        player.seekTo(newPlaybackPositionSec);
    });

    $(".player__volume").click(e => {
        const bar = $(e.currentTarget);
        const clickedPositionVol = e.originalEvent.layerX;
        const newButtonPositionPercent = (clickedPositionVol / bar.width()) * 100;
        const newPlaybackPositionVol = (player.getDuration() / 100) * newButtonPositionPercent;

        $(".player__volume-button").css({
            left: `${newPlaybackPositionVol}%`
        });

        player.setVolume(newPlaybackPositionVol);
    });

    $(".player__splash").click(e => {
        player.playVideo();
    });
}

const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();

    if (typeof interval !== "undefined") {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;

        $(".player__playback-button").css({
            left: `${completedPercent}%`
        });

    });
}

const onPlayerStateChange = (event) => {
    
    switch (event.data) {
        case 1:
            playerContainer.addClass('active');
            playerContainer.addClass('paused');
            break;
        
        case 2:
            playerContainer.removeClass('active');
            playerContainer.removeClass('paused');
            break;
    }
};

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: heightWind,
        width: widthWind,
        videoId: 'V2i1YkfrM54',
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
        playerVars: {
            controls: 0,
            disablekb: 0,
            showInfo: 0,
            rel: 0,
            autoplay: 0,
            modestbranding: 0
        }
    });
}

eventsInit();*/

const playBtn = document.querySelector(".player__video-img");
const video = document.getElementById('player');
const playerPlayBrn = document.querySelector(".duration__img");
const durationControl = document.getElementById('durationLevel');
const soundControl = document.getElementById('micLevel');
const soundBtn = document.querySelector('.sound');
const muteBtn = document.getElementById('mic');

let intervalId;
let soundLevel;

video.addEventListener("loadeddata", function () {
    video.addEventListener('click', playStop);

    let playButtons = document.querySelectorAll('.play');

    for (i=0; i<playButtons.length; i++) {
        playButtons[i].addEventListener('click', playStop);
    }

    durationControl.min = 0;
    durationControl.value = 0;
    durationControl.max = video.duration;
    durationControl.addEventListener('input', setVideoDuraction);

    soundControl.min = 0;
    soundControl.max = 10;
    soundControl.value = soundControl.max;
    soundControl.addEventListener('input', changeSoundVolume);

    muteBtn.addEventListener('click', soundOff);

    video.addEventListener('ended', () => {
        playBtn.classList.toggle('player__video-img--active');
        playerPlayBrn.classList.add('active');
        video.currentTime = 0;

    })
})

function playStop() {
    playBtn.classList.toggle('player__video-img--active');
    playerPlayBrn.classList.toggle('active');

    if (video.paused) {
        video.play();
        intervalId = setInterval(updateDuraction, 1000 / 60);
    } else {
        clearInterval(intervalId);
        video.pause();
    }
}

function setVideoDuraction() {
    video.currentTime = durationControl.value;
}

function updateDuraction() {
    durationControl.value = video.currentTime;
    let step = video.duration / 100;
    let percent = video.currentTime / step;
    durationControl.style.background = ('linear-gradient(90deg, #fff 0%, #fff '+percent+'%, #626262 '+percent+'%)'); //#E01F3D
}

function changeSoundVolume() {
    video.volume = soundControl.value / 10;
    if (video.volume === 0) {
        soundBtn.classList.add('active');
    } else {
        soundBtn.classList.remove('active')
    }
}

function soundOff() {
    if (video.volume === 0) {
        video.volume = soundLevel;
        soundControl.value = soundLevel * 10;
        soundBtn.classList.remove('active'); 
    } else {
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
        soundBtn.classList.add('active'); 
    }
}