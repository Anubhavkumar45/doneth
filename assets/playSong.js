function renderPlaySong(intent) {
  var intents_all = intent.split("/");
  //   var pre_genres = [
  //     "comedy",
  //     "horror",
  //     "romance",
  //     "lgbtq",
  //     "action",
  //     "animation",
  //     "documentary",
  //     "drama",
  //     "sci-fi",
  //   ];

  var param = '"' + intents_all[1] + '"';

  var html =
    "<div class='content_block'>\
        <p class='summary_text' style='min-height: 10px; margin: unset;'>🎹 Play Music</p>\
    <img class='banner_image' src='https://media.giphy.com/media/YQMiQtopRjjZRSYRJF/giphy.gif'/>\
    <button class='spotify_open_button'\
        onclick='playDaSong(" +
    param +
    ")'>Play " +
    intents_all[1] +
    " on Spotify</button>\
    <br/>\
    </div>";

  document.getElementById("modal_content").innerHTML = html;
}

function playDaSong(search_param) {
  window.open("https://open.spotify.com/search/" + search_param);
}
