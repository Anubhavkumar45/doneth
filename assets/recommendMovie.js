function renderMovieRecommend() {
  var pre_genres = [
    '"' + "comedy" + '"',
    '"' + "horror" + '"',
    '"' + "romance" + '"',
    '"' + "lgbtq" + '"',
    '"' + "action" + '"',
    '"' + "animation" + '"',
    '"' + "documentary" + '"',
    '"' + "drama" + '"',
    '"' + "sci-fi" + '"',
  ];
  var html =
    "<div class='content_block'>\
        <p class='summary_text' style='min-height: 10px; margin: unset;'>🍿 Find movies</p>\
    <div class='tab_section'>\
        <span class='movie_prompt' onclick='getSpecificGenre(" +
    pre_genres[0] +
    ")'>😄 Comedy</span>\
        <span class='movie_prompt' onclick='getSpecificGenre(" +
    pre_genres[1] +
    ")'>🧟 Horror</span>\
        <span class='movie_prompt' onclick='getSpecificGenre(" +
    pre_genres[2] +
    ")'>💙 Romance</span>\
        <span class='movie_prompt' onclick='getSpecificGenre(" +
    pre_genres[3] +
    ")'>🌈 LGBTQ+</span>\
        <span class='movie_prompt' onclick='getSpecificGenre(" +
    pre_genres[4] +
    ")'>👊 Action</span>\
        <span class='movie_prompt' onclick='getSpecificGenre(" +
    pre_genres[5] +
    ")'>🧙 Animation</span>\
        <span class='movie_prompt' onclick='getSpecificGenre(" +
    pre_genres[6] +
    ")'>🎥 Documentary</span>\
        <span class='movie_prompt' onclick='getSpecificGenre(" +
    pre_genres[7] +
    ")'>🤠 Drama</span>\
        <span class='movie_prompt' onclick='getSpecificGenre(" +
    pre_genres[8] +
    ")'>🖖 Sci-Fi</span>\
    </div>\
<br/>\
    <p class='summary_text' style='min-height: 10px; margin: unset;'>Look for more</p>\
    <textarea id='movie_recommender' class='input_box_big' rows='4' cols='50'\
        placeholder='Find movies similar to Interstellar . . .'></textarea>\
    <button class='intent_button' onclick='renderMovieRecommend()'>Reset</button><button class='intent_button'\
        id='movie_recommend_button' onclick='getMovieRecommendation()'>Find movies</button>\
    \
    </div>";

  document.getElementById("modal_content").innerHTML = html;
}

function getMovieRecommendation() {
  var prompt_text =
    'Q : "The Godfather"\
A : "Crime/drama/The Godfather II/The Sopranos/Goodfellas/Peaky Blinders/The Departed"\
Q : "Crime"\
A : "Peaky Blinders/Knives Out/Mare of Easttown/Lupin/Godfather/Money Heist/Baby Driver"\
\
Q : "Friends"\
A : "Comedy/Sitcom/The Big Bang Theory/How I met your mother/Seinfield/Two and a half men/Joey"\
\
Q : "Titanic"\
A : "Romance/Tragedy/Leonardo Di Caprio/The Great Gatsby/The Revenant/Romeo and Juliet/A walk to remember/Forrest Gump"\
\
Q : "Inception"\
A : "Sci-Fi/Action/Cristopher Nolan/The Prestige/The Matrix/Memento/Limitless/Oblivion/Coherence"\
\
Q : "Interstellar"\
A : "Sci-Fi/Adventure/Space/Cristopher Nolan,The Martian/Apollo 13/Gravity/Arrival/Passengers/Firefly"\
\
Q : "Breaking Bad"\
A : "Crime/Drama/Thriller/Better Call Saul/Ozark/Prison Break/Power/Peaky Blinders/Bad Blood"\
\
Q : "Toy Story"\
A : "kids/Animation/Friendship/Monsters Inc/Toy Story 3/Up/Finding Nemo/The Lego Movie/Shrek"\
\
Q : "The Avengers"\
A : "Sci-fi/Adventure/Thriller/Iron Man 3/Thor/The Winter Soldier/The Avengers Infinity War/The Avengers Endgame/The Incredible Hulk/Spiderman Homecoming"\
\
Q : "The Notebook"\
A : "Love/Drama/Romance/The Fault in our stars/The Last Song/A walk to remember/Keith/Blue Valentine"';

  var input =
    prompt_text + document.getElementById("movie_recommender").value + "\n\n";

  document.getElementById("movie_recommend_button").innerHTML =
    "🍿 munching . . .";

  var url =
    "https://api.openai.com/v1/engines/davinci-instruct-beta/completions";

  var return_value = "";

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", Openai_key);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);

      return_value = JSON.parse(xhr.responseText).choices[0].text;

      var html =
        "<div class='content_block'>\
        <p class='summary_text'>" +
        return_value +
        "</p>\
    <button class='intent_button' onclick='renderMovieRecommend()'>Reset</button>\
     <br/><br/>\
     </div>";

      document.getElementById("modal_content").innerHTML = html;
    }
  };

  var data = {
    prompt: input,
    temperature: 0.0,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
  console.log(data);

  xhr.send(JSON.stringify(data));
}
