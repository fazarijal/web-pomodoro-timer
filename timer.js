let timer;
let pomodoroCount = 1;
let currentTimerDuration;

function toggleAudio(audioId, button) {  
    const audioElement = document.getElementById(audioId);  
    const playIcon = "<i class='fa fa-play'></i>";  
    const pauseIcon = "<i class='fa fa-pause'></i>";  
    
    const backgroundImages = {  
        'audio-lofi-1': 'background-lofi-1.jpg',   
        'audio-lofi-2': 'background-lofi-2.jpg',   
        'audio-lofi-3': 'background-lofi-3.jpg'  
    };  

    if (audioElement.paused) {  
        audioElement.play();  
        button.innerHTML = pauseIcon; //ganti ke pause
        
        //ganti background dari lofi yang aktif 
        document.body.style.backgroundImage = `url('${backgroundImages[audioId]}')`;  
    } else {  
        audioElement.pause();  
        button.innerHTML = playIcon; //ganti ke play 
        
        //kembali ke background awal 
        document.body.style.backgroundImage = "url('background-utama.jpg')";   
    }  
}

function startTimer(duration) {
    clearInterval(timer); //menstop timer sebelumnya
    currentTimerDuration = duration;
    let timeLeft = duration;

    //ganti warna column2
    if (currentTimerDuration === 1500) {
        document.querySelector('.column2').style.backgroundColor = 'rgb(255, 162, 162)';
        
        //apakah ini sesi pertama
        if (pomodoroCount > 1) {
            showPopup(`Waktu Pomodoro ke-${pomodoroCount} selama 25 menit dimulai`);
        }

    } else if (currentTimerDuration === 300) { //istirahat 5 menit
        document.querySelector('.column2').style.backgroundColor = 'rgb(170, 255, 183)';
        
        //menampilkan notifikasi
        if (pomodoroCount > 1) {
            showPopup(`Waktu Istirahat ke-${pomodoroCount - 1} selama 5 menit dimulai`);
        }
    }

    //inisialisasi timer
    timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
        document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimerCompletion(); //lanjut ke sesi berikutnya
        }
        timeLeft--;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer); //menstop timer
    currentTimerDuration = 0;

    //mereset tampilan timer
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    //ganti warna column2 ke warna awal
    document.querySelector('.column2').style.backgroundColor = "rgba(255, 255, 255, 1)";
}

//bagian notifikasi
function showPopup(message) {
    const notification = document.getElementById("notification");
    notification.innerHTML = `
        <p>${message}</p>
        <p>Notifikasi ini akan hilang dalam <span id="popup-timer">10</span> detik</p>
        <button onclick="closePopup()">OK</button>
    `;
    notification.style.display = "block"; //menampilkan notifikasi

    let popupTime = 10;
    const popupInterval = setInterval(() => {
        popupTime--;
        document.getElementById("popup-timer").textContent = popupTime;
        if (popupTime <= 0) {
            closePopup();
            clearInterval(popupInterval);
        }
    }, 1000);
}

function closePopup() {
    document.getElementById("notification").style.display = "none";
}

function handleTimerCompletion() {
    if (currentTimerDuration === 1500) {
        pomodoroCount++;
        if (pomodoroCount >= 5) {
            showPopup("Satu putaran Pomodoro telah selesai, selamat! Silakan mulai lagi Pomodoro kapanpun kamu mau.");
            document.querySelector('.column2').style.backgroundColor = "rgba(255, 255, 255, 1)";
            pomodoroCount = 1;
        } else {
            startTimer(300);
        }
    } else if (currentTimerDuration === 300){ 
            startTimer(1500);
            if(pomodoroCount === 5){
            stopTimer();
           }
    }
}

//hapus inputan to-do list tugas user
function removeTask(button) {  
    const todoInput = button.previousElementSibling;
    todoInput.value = ""; 
}