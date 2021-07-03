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
    "Movie:The Godfather\nSimilar:Drama-The Godfather II-The Sopranos-Goodfellas-Peaky Blinders-The Departed\nMovie:Titanic\nSimilar:Romance-Drama-The Great Gatsby-The Revenant-Romeo and Juliet-A walk to remember-Forrest Gump\nMovie:Inception\nSimilar:Adventure-Thriller-The Prestige-The Matrix-Memento-Limitless-Oblivion-Coherence\nMovie:Interstellar\nSimilar:Sci-fi-Adventure-The Martian-Apollo 13-Gravity-Arrival-Passengers-Firefly\nMovie:Toy Story\nSimilar:Animation-Comedy-Monsters Inc-Toy Story 3-Up-Finding Nemo-The Lego Movie-Shrek\nMovie:The Avengers\nSimilar:Sci-fi-Adventure-Iron Man 3-Thor-Captain America The Winter Soldier-The Avengers Infinity War-The Avengers Endgame-The Incredible Hulk-Spiderman Homecoming\nMovie:The Notebook\nSimilar:Romance-Drama-The Fault in our stars-The Last Song-A walk to remember-Keith-Blue Valentine-Her-Titanic\nMovie:Knives Out\nSimilar:Drama-Suspense-Gone Girl-American Hustle-GreatNightcrawler-La la land-Boyhood-The Machinist\nMovie:Avatar\nSimilar:Fantasy-Sci-fi-Donnie Darko-The Lord of the Rings-Shape of Water-Wonder Woman-Harry Potter\nMovie:The Shining\nSimilar:Horror-Thriller-IT-Don't Breathe-JAWS-A Quiet Place-The Conjuring-The Shining-The Witch-The Nun\nMovie:The Revenant\nSimilar:Adventure-Thriller-Life of Pi-Jurassic Park-Godzilla-The Mummy-Taxi Driver-Spotlight-Moonlight-Schindler's List\nMovie:Inglorious Bastards\nSimilar:Drama-War-Forrest GumpAmerican Sniper-Pearl Harbour-Saving Private Ryan-12 Strong-Dunkirk-The Imitation Game-Atonement\nMovie:The Last of the Mohicans\nSimilar:Adventure-War-Gladiator-Braveheart-The Patriot-The Last Samurai-The Hobbit-Troy-King Arthur-Brave\nMovie:The Lord of the Rings\nSimilar:FantasyAdventureThe Hobbit-The Chronicles of Narnia-Harry Potter-The Wheel of Time-The Dark is Rising-The Golden Compass-The Hunger Games\nMovie:The Ten Commandments\nSimilar:Drama-Adventure-The King's Speech-Exodus: Gods and Kings-The Bible-The Passion of the Christ-The Nativity Story-The Chronicles of Narnia\nMovie:The Girl with the Dragon Tattoo\nSimilar:Crime-Drama-Law and Order SVUCSI-Mindhunter-The Fall-The Killing-The Great British Baking Show-The Sopranos\nMovie:Scarface\nSimilar:Crime-Drama-The Untouchables-Goodfellas-Wolf of Wall Street-The Departed-The Godfather II-The Dark Knight-The Departed";

  var input =
    prompt_text +
    "\nMovie:" +
    document.getElementById("movie_recommender").value +
    "\n";

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
    temperature: 0.7,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["\n"],
  };
  console.log(data);

  xhr.send(JSON.stringify(data));
}

function getSpecificGenre(param) {
  var prompt_text =
    "Movie:The Godfather\nSimilar:Drama-The Godfather II-The Sopranos-Goodfellas-Peaky Blinders-The Departed\nMovie:Titanic\nSimilar:Romance-Drama-The Great Gatsby-The Revenant-Romeo and Juliet-A walk to remember-Forrest Gump\nMovie:Inception\nSimilar:Adventure-Thriller-The Prestige-The Matrix-Memento-Limitless-Oblivion-Coherence\nMovie:Interstellar\nSimilar:Sci-fi-Adventure-The Martian-Apollo 13-Gravity-Arrival-Passengers-Firefly\nMovie:Toy Story\nSimilar:Animation-Comedy-Monsters Inc-Toy Story 3-Up-Finding Nemo-The Lego Movie-Shrek\nMovie:The Avengers\nSimilar:Sci-fi-Adventure-Iron Man 3-Thor-Captain America The Winter Soldier-The Avengers Infinity War-The Avengers Endgame-The Incredible Hulk-Spiderman Homecoming\nMovie:The Notebook\nSimilar:Romance-Drama-The Fault in our stars-The Last Song-A walk to remember-Keith-Blue Valentine-Her-Titanic\nMovie:Knives Out\nSimilar:Drama-Suspense-Gone Girl-American Hustle-GreatNightcrawler-La la land-Boyhood-The Machinist\nMovie:Avatar\nSimilar:Fantasy-Sci-fi-Donnie Darko-The Lord of the Rings-Shape of Water-Wonder Woman-Harry Potter\nMovie:The Shining\nSimilar:Horror-Thriller-IT-Don't Breathe-JAWS-A Quiet Place-The Conjuring-The Shining-The Witch-The Nun\nMovie:The Revenant\nSimilar:Adventure-Thriller-Life of Pi-Jurassic Park-Godzilla-The Mummy-Taxi Driver-Spotlight-Moonlight-Schindler's List\nMovie:Inglorious Bastards\nSimilar:Drama-War-Forrest GumpAmerican Sniper-Pearl Harbour-Saving Private Ryan-12 Strong-Dunkirk-The Imitation Game-Atonement\nMovie:The Last of the Mohicans\nSimilar:Adventure-War-Gladiator-Braveheart-The Patriot-The Last Samurai-The Hobbit-Troy-King Arthur-Brave\nMovie:The Lord of the Rings\nSimilar:FantasyAdventureThe Hobbit-The Chronicles of Narnia-Harry Potter-The Wheel of Time-The Dark is Rising-The Golden Compass-The Hunger Games\nMovie:The Ten Commandments\nSimilar:Drama-Adventure-The King's Speech-Exodus: Gods and Kings-The Bible-The Passion of the Christ-The Nativity Story-The Chronicles of Narnia\nMovie:The Girl with the Dragon Tattoo\nSimilar:Crime-Drama-Law and Order SVUCSI-Mindhunter-The Fall-The Killing-The Great British Baking Show-The Sopranos\nMovie:Scarface\nSimilar:Crime-Drama-The Untouchables-Goodfellas-Wolf of Wall Street-The Departed-The Godfather II-The Dark Knight-The Departed";

  var input = prompt_text + "\nMovie:" + param + "\n";

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
    temperature: 0.7,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["\n"],
  };
  console.log(data);

  xhr.send(JSON.stringify(data));
}
