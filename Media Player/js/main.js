var playBtn = document.getElementById('play');
var forwardBtn = document.getElementById('forward');
var backwardBtn = document.getElementById('backward');
var next = document.getElementById('next');
var previous = document.getElementById('previous');
var replayBtn = document.getElementById('redo');
var randomBtn = document.getElementById('shuffle');
var restartBtn = document.getElementById('restart');
var volumeBtn = document.getElementById('volumeBtn');
var soundVal = document.getElementById('soundRange').value;

var curSong = 1;
var nextSong= "";
var music = new Audio('musics/' + curSong + '.mp3');

var sound_range = document.getElementById('soundRange');


var isReplay = new Boolean(false);
var isRandom = new Boolean(false);
var isIntervalPause = new Boolean(false);

// var playlist = [ {id: 1, name: 'corandcrank - Loco Cóntigo.mp3'}, { id:2, name: 'corandcrank Amorf Enamorado.mp3'}, 
//           {id: 3, name: 'corandcrank PESÁ.mp3'}, { id:4, name: 'Flo Rida Good Feeling.mp3'}, {id: 5, name: 'Rompasso - Angetenar.mp3'} ]

document.getElementById('soundVal').innerHTML = soundVal;

function updateTime(){
  updateTimeInterval = setInterval(function() {
    if(isIntervalPause == false){
      var currentMins = Math.floor(music.currentTime / 60);
      var currentSecs = Math.floor(music.currentTime % 60);
    
      var durationMins = Math.floor(music.duration / 60);
      var durationSecs = Math.floor(music.duration % 60);
    
      if (currentSecs < 10) {
        currentSecs = '0' + String(currentSecs);
      }
    
      if(durationSecs < 10){
        durationSecs = '0' + String(durationSecs);
      }
    
      curTime.innerHTML = currentMins + ':' + currentSecs;
      durationTime.innerHTML = (music.duration > 0) ? durationMins + ':' + durationSecs : '';
    
      var rangeVal = (music.currentTime/music.duration) * 100
      document.getElementById('timeRange').value = rangeVal
      // document.getElementById('timeRange').style.width = (music.currentTime + .25)/music.duration*100 + '%';
    }
    
  }, 10);  
}
updateTime();

// pause or resume audio
function playAudio() {
  if (music.paused) {
      music.play();
      play.innerHTML = '<i class="fa fa-pause"></i>'
  } else {
      music.pause();
      play.innerHTML = '<i class="fa fa-play"></i>'
  }
  // music.addEventListener('ended', function() {
  //     play.innerHTML = '<i class="fa fa-play"></i>'
  // });
}
playBtn.addEventListener("click", playAudio);

//   10 seconds forward from current time
  forwardBtn.addEventListener('click', function(){
      if(!music.paused){
        music.pause();
        music.currentTime += 10;
        music.play();
      }
  });
  
//   10 seconds back from current time
  backwardBtn.addEventListener('click', function(){
      if(!music.paused){
        music.pause();
        music.currentTime -= 10;
        music.play();
      }
  });
   

// musics play in order
function musicsInOrder() {
  music.addEventListener('ended', function(){
    if(isReplay == false && isRandom == true){
      music.pause();
      var nextRandomSong = Math.floor(Math.random() * 5 + 1);
      nextSong = "musics/"+ nextRandomSong +".mp3";
      console.log(nextSong);
      music.src = nextSong;
      music.load();
      music.play();
    }
    curSong++;
    nextSong = "musics/"+ curSong +".mp3";
    music.src = nextSong;
    music.load();
    music.play();
    if(curSong == 5) // this is the end of the songs.
    {
      curSong = 0;
    }
  }, false);
}
musicsInOrder();

// play next music with click
next.addEventListener('click', function(){
  if(isReplay == false && isRandom == true){
    if(music.paused){
      play.innerHTML = '<i class="fa fa-pause"></i>';
    }
    music.pause();
    curSong = (Math.floor(Math.random() * 5) + 1);
    music.src = 'musics/' + curSong + '.mp3';
    music.load();
    music.play();

    console.log(music.src);
  }
  if(music.paused){
    play.innerHTML = '<i class="fa fa-pause"></i>';
  }
  music.pause();
  curSong++;
  if(curSong>5){
    curSong = 1;
  }
  nextSong = "musics/"+ curSong +".mp3";
  music.src = nextSong;
  music.load();
  music.play();
});

// play previous music with click
previous.addEventListener('click', function(){
  if(music.paused){
    play.innerHTML = '<i class="fa fa-pause"></i>';
  }
  music.pause();
  curSong--;
  if(curSong == 0) // this is the end of the songs.
  {
    curSong = 1;  // this is the last music of list.
  }
  nextSong = "musics/"+ curSong +".mp3";
  music.src = nextSong;
  music.load();
  music.play();
});

// for restart
restartBtn.addEventListener('click', function(){
  if(!music.paused){
    music.currentTime = 0;
    music.load();
    music.play();
  }
  music.currentTime = 0

  console.log(music.currentTime);
});


// for loop
replayBtn.addEventListener('click', function(){
  if(isReplay == false){
    replayBtn.style.color =  '#111111';
    isReplay = true;
    music.loop = true;
  }
  else{
    isReplay = false;
    replayBtn.style.color = '#f1e3e3';
    music.loop = false;
  }
})

// shuffle
randomBtn.addEventListener('click', function(){
  if(isRandom == false){
    isRandom = true;
    randomBtn.style.color =  '#111111';
  }
  else{
    isRandom = false;
    randomBtn.style.color = '#f1e3e3';
  }
})

//  on chnage volume progress bar
function soundChange() {
  soundVal = document.getElementById('soundRange').value;
  document.getElementById('soundVal').innerHTML = soundVal;
  music.volume = soundVal/100;
  if(soundVal==0){
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
  else if(soundVal > 0 && soundVal <= 30){
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"> </i>'
  }
  else{
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"> </i>'
  }
}

// on click mute and volume up buttons
function soundTurn(){
  // var soundBeforMute = document.getElementById('soundRange').value;
  if(soundVal > 0){
    soundVal = 0
    document.getElementById('soundRange').value = 0;
    soundChange();
    // console.log(soundBeforMute);
  }
  else{
    document.getElementById('soundRange').value = 100;
    soundChange();
  }
}

var timeRange = document.getElementById('timeRange');
timeRange.addEventListener('mousedown', function(){
  clearInterval(updateTimeInterval);

  var rangeVal = document.getElementById('timeRange').value;
  console.log(rangeVal);
  music.currentTime = rangeVal/1000 * music.duration;
  var currentMins = Math.floor(music.currentTime / 60);
  var currentSecs = Math.floor(music.currentTime % 60);

  var durationMins = Math.floor(music.duration / 60);
  var durationSecs = Math.floor(music.duration % 60);

  if (currentSecs < 10) {
    currentSecs = '0' + String(currentSecs);
  }

  if(durationSecs < 10){
    durationSecs = '0' + String(durationSecs);
  }

  curTime.innerHTML = currentMins + ':' + currentSecs;
  durationTime.innerHTML = (music.duration > 0) ? durationMins + ':' + durationSecs : '';
  setTimeout(updateTime, 1000);


})
