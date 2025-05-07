function startHacking() {
    document.body.style.backgroundColor = "red";

    // 2초 후: 글리치 텍스트 20개 생성
    setTimeout(() => {
        for (let i = 0; i < 50; i++) {
            const glitch = document.createElement("div");
            glitch.className = "glitch-text";
            glitch.textContent = "YOU'VE BEEN HACKED";
            glitch.style.left = Math.random() * 80 + "%";
            glitch.style.top = Math.random() * 80 + "%";
            document.body.appendChild(glitch);
        }
    }, 2000);

    // 3초 후: 비디오 재생 시작
    setTimeout(() => {
        let videoContainer = document.getElementById("videoContainer");
        videoContainer.style.display = "block";

        for (let i = 0; i < 25; i++) {
            let video = document.createElement("video");
            video.src = "https://www.w3schools.com/html/mov_bbb.mp4";
            video.autoplay = true;
            video.muted = false;
            video.style.left = `${Math.random() * 100}%`;
            video.style.top = `${Math.random() * 100}%`;
            videoContainer.appendChild(video);
        }
    }, 5000);

    // 7초 후: peace hack 화면 표시
    setTimeout(() => {
        document.getElementById("peaceHackScreen").style.display = "flex";
        document.body.style.backgroundColor = "black";
    }, 12000);
}