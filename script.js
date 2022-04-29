$(() => {
    $.get('https://5dd1894f15bbc2001448d28e.mockapi.io/playlist', (response) => {
        let currentSong = 0;
        $("#player").append(`<audio id=music-player src=${response[currentSong].file} type=audio/mp3></audio>
        <h1 id = current-track-heading>${response[currentSong].track}</h1>
        <img id = current-song-img src = ${response[currentSong].albumCover} alt ='${response[currentSong].artist} ${response[currentSong].track}' />
        </div>`);
        for (let i = 0; i < response.length; i++) {
            $("#playlist").append(`
            <div class = playlist-card id = ${response[i].id}>
            <img src = ${response[i].albumCover} alt ='${response[i].artist} ${response[i].track}' />
            <div>
            <h3>${response[i].track}</h3>
            <p>${response[i].artist}</p>
            `)
        }
        let songs = document.getElementsByClassName("playlist-card");
        let audioPlayer = document.getElementById("music-player");
        for (let i = 0; i < songs.length; i++){
            songs[i].addEventListener('click',()=>{
                audioPlayer.src = response[i].file;
                audioPlayer.play();
            })
        }

        function playing(){
            $('#play-btn').removeClass('active-btn');
            $("#pause-btn").addClass('active-btn');
            $("#pause-btn").removeClass('hide-btn');
            $('#play-btn').addClass('hide-btn');
        }
        function paused(){
            $('#play-btn').addClass('active-btn');
            $("#pause-btn").removeClass('active-btn');
            $("#pause-btn").addClass('hide-btn');
            $('#play-btn').removeClass('hide-btn');
        }
        $("#play-btn").on('click', () => {
            audioPlayer.play();
            playing();
        })
        $("#pause-btn").on('click', () => {
            audioPlayer.pause();
            paused();
        })
        
        $("#backward-btn").on('click', () => {
            audioPlayer.currentTime -= 10;
        })
        $("#forward-btn").on('click', () => {
            audioPlayer.currentTime += 10;
        })
        currentThumbnail = document.getElementById("current-song-img")
        
        function nextSong(){
            if (currentSong < response.length - 1) {
                currentSong++;
            } else {
                currentSong = 0;
            }
            audioPlayer.src = response[currentSong].file;
            currentThumbnail.src = response[currentSong].albumCover;
            audioPlayer.play();
        }

        $("#next-btn").on('click', () => {
            nextSong();
        })
        function prevSong(){
            if (currentSong > 0) {
                currentSong--;
            } else {
                currentSong = response.length - 1;
            }
            audioPlayer.src = response[currentSong].file;
            currentThumbnail.src = response[currentSong].albumCover;
            audioPlayer.play();
        }

        $("#prev-btn").on('click', () => {
            prevSong();
        })
        $("#repeat-btn").on('click',()=>{
            $('#repeat-btn').toggleClass('blue-btn')
            audioPlayer.loop===false?audioPlayer.loop=true:audioPlayer.loop=false;
        })

        audioPlayer.addEventListener('playing' , ()=>{
            playing();
            $("#current-song-img").addClass('img-animation');
        })
        audioPlayer.addEventListener('ended' , ()=>{
            nextSong();
        })
        audioPlayer.addEventListener('pause',()=>{
            $("#current-song-img").removeClass('img-animation');
            paused();
        })

        //----------volume control start-----------
        let volume = 100;
        function volumeControlBar(){
            $("#volume-bar-control").css(`width`,`${volume}%`);
        }
        $("#volume-down-btn").on('click', () => {
            if (audioPlayer.volume > 0.1) {
                volume-=10;
                audioPlayer.volume = volume/100;
                volumeControlBar();
            } else {
                audioPlayer.muted = true;
                volume = 0;
                audioPlayer.volume = volume;
                volumeControlBar();
                $("#volume-mute-btn").addClass('active-btn');
                $("#volume-mute-btn").removeClass('hide-btn');
                $("#volume-down-btn").addClass('hide-btn');
                $("#volume-down-btn").removeClass('active-btn');
            }
        })
        $("#volume-up-btn").on('click', () => {
            if (audioPlayer.muted === true) {
                audioPlayer.muted = false;
                volume = 10
                audioPlayer.volume = 0.1;
                $("#volume-mute-btn").addClass('hide-btn');
                $("#volume-mute-btn").removeClass('active-btn');
                $("#volume-down-btn").addClass('active-btn');
                $("#volume-down-btn").removeClass('hide-btn');
            } else if(audioPlayer.volume <1){
                volume+=10;
                audioPlayer.volume = volume/100;
                $("#volume-bar-control").css(`width`,`${volume}%`);
            }
        })
        //---------volume control end-------------


        audioPlayer.addEventListener('timeupdate',()=>{
            let progress = (audioPlayer.currentTime/audioPlayer.duration)*100;
            $("#progress").css('width',progress+'%');
            let currentTimer = Math.round(audioPlayer.currentTime);
            let timeRemain = Math.round(audioPlayer.duration-audioPlayer.currentTime);
            $("#minute-remain").html(Math.round(timeRemain/60));
            $("#second-remain").html(Math.round(timeRemain%60));
            $("#minute").html(Math.round(currentTimer/60));
            $("#second").html(Math.round(currentTimer%60));
        })
        
        for(let i = 0; i<response.length;++i){
            $('#'+response[i].id).on('click',()=>{
                $('#current-song-img').attr('src',`${response[i].albumCover}`);
                audioPlayer.src = response[i].file;
                $('#current-track-heading').html(response[i].track)
                audioPlayer.play();
            })
        }

    })
})
