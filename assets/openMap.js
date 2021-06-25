function renderOpenMap(intent) {
  var intents_all = intent.split("/");

  var param = '"' + intents_all[1] + '"';

  var html =
    "<div class='content_block'>\
        <p class='summary_text' style='min-height: 10px; margin: unset;'<b>Go to " +
    intents_all[1] +
    "</b></p>\
    <img class='banner_image' src='https://media.giphy.com/media/Y09OEdHBCGpBF7NUMN/giphy.gif'/><br/>\
    <button class='spotify_open_button'\
        onclick='openMaps(" +
    param +
    ")'>Show Directions ➡️</button>\
    <button class='spotify_open_button'\
        onclick='openUber()'>🚕 Call a cab</button>\
    <br/>\
    </div>";

  document.getElementById("modal_content").innerHTML = html;
}

function openMaps(search_param) {
  window.open("https://google.com/maps/search/" + search_param);
}

function openUber() {
  window.open("https://m.uber.com/ride");
}
