let player;
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

eventsInit();