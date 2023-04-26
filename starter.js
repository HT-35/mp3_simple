window.addEventListener("load", function() {

    const slider = document.getElementById("myRange");

    // bai hat
    const song = this.document.querySelector("#song");

    // button dieu huong bai hat
    const playButton = this.document.querySelector(".player-play");
    const prevButton = this.document.querySelector(".player-prev");
    const nextButton = this.document.querySelector(".player-next");

    // deadtime bai hat
    const playerDuration = this.document.querySelector(".player-duration");
    const playerRemaining = this.document.querySelector(".player-remaining");

    // thanh time bar 
    const progressBar = this.document.querySelector(".bar");

    //img sound
    const img = this.document.querySelector(".player-image");

    // source music 
    const list = ["sailamcuaanh.mp3", "tongphu.mp3", "vebenanh.mp3", "ailanguoithuongem.mp3"];

    let songIndex = 0;



    // chay nhac
    let playing = true;

    playButton.addEventListener("click", handleMusicPlay);



    function handleMusicPlay() {

        // playing = true để khi chuyển bài thì sẽ gọi lại handleMusicPlay()
        //   sau đó sẽ vào đk vì playing = true  => song.play() : music open 
        if (playing) {

            song.play(); // song chinh la bai hat.   play: chay  ||   pause: dung
            img.classList.add("is-playing");
            playButton.classList.add("fa-pause");
            playing = false;
        } else {
            song.pause(); // song chinh la bai hat.   play: chay  ||   pause: dung
            img.classList.remove("is-playing");
            playButton.classList.remove("fa-pause");


            playing = true;
        }
    }

    // next or priv nhac 
    nextButton.addEventListener("click", function() {
        handeChangeMusic(1);
    });
    prevButton.addEventListener("click", function() {
        handeChangeMusic(-1);
    });


    function handeChangeMusic(dir) {
        if (dir === 1) {
            // next music

            // console.log(songIndex);
            if (songIndex > list.length - 1) {
                songIndex = 0;
            }
            songIndex++;

            song.setAttribute("src", `./files/${list[songIndex]}`);


            //  Khi chuyen bai, mac dinh la Pause  
            // =>   ta can phai chay lai function Play Music

            playing = true;
            handleMusicPlay();
        } else {
            console.log(songIndex);
            songIndex--;
            if (songIndex < 0) {
                songIndex = list.length - 1;
            }
            song.setAttribute("src", `./files/${list[songIndex]}`);

            //  Khi chuyen bai, mac dinh la Pause 
            //  =>   ta can phai chay lai function Play Music            
            playing = true;
            handleMusicPlay();

        }
    }

    // sau khi het bai hat
    song.addEventListener("ended", function() {
        handeChangeMusic(1);
    })


    // lấy thời gian bai hat để tạo time bar
    // song.duration  =>  fulltime of song    
    function displayTimer() {

        const { duration, currentTime } = song;

        // gán tổng thời gian music cho attribute max trong thanh bar
        progressBar.max = duration;
        // gán hiện tại thời gian music cho attribute value trong thanh bar
        progressBar.value = currentTime;


        playerDuration.textContent = formatTime(duration);
        playerRemaining.textContent = formatTime(currentTime);

    }

    // neu ta dung if else thi thì số liệu sẽ trả về if hoặc else
    //  khi đó ta không thể tách minutes và seconds ra 


    // còn nếu 2 biến độc lộc thì ta có thể lấy:  minutes =  timer/60
    //                                         :  second =  timer - minutes * 60
    // sau đó ghi 2 biến độc lập ra màn hình


    function formatTime(number) {
        const minutes = Math.floor((number) / 60);
        const seconds = (Math.floor(number) - minutes * 60);

        return `${minutes}:${seconds <10 ? "0" + seconds :seconds }`;

    }

    const timer = setInterval(displayTimer, 500);


    progressBar.addEventListener("change", function handleDragProgressBart() {
        // thay đổi thời gian hiện thại của bài hát đang chạy "currentTime"
        // qua đó ta có thể tua nhanh music và thay đổi  thời gian của currentTime
        song.currentTime = progressBar.value;
    })


    slider.oninput = function() {
        song.volume = this.value / 100;

    }
    console.log(song.volume);

})