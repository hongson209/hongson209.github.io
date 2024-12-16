document.querySelector(".overlay h2").addEventListener("click", function () {
  document.querySelector(".overlay").style.display = "none";
  const music = document.getElementById("background-music");
  music.volume = 0.2;
  music.play();
});
