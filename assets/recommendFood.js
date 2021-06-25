function renderFoodRecipe() {
  var pre_genres = [
    "noodles",
    "omlette",
    "fruit salad",
    "pizza",
    "curry",
    "hotdog",
    "sandwich",
    "cake",
    "dumpling",
  ];

  var link1 = "https://www.swiggy.com/";
  var link2 = "https://www.zomato.com";

  var html =
    "<div class='content_block'>\
    <p class='summary_text' style='min-height: 10px; margin: unset;'>🍿 Find Food</p>\
    <div class='tab_section'>\
        <span class='movie_prompt' onclick='getSpecificGenre(" +
    pre_genres[0] +
    ")'>🍝 Noodles</span>\
        <span class='movie_prompt' onclick='getSpecificGenre(" +
    pre_genres[1] +
    ")'>🍳 Omlette</span>\
        <span class='movie_prompt' onclick='getSpecificGenre(" +
    pre_genres[2] +
    ")'>🍉 Fruit Salad</span>\
        <span class='movie_prompt' onclick='getSpecificGenre(" +
    pre_genres[3] +
    ")'>🍕 Pizza</span>\
        <span class='movie_prompt' onclick='getSpecificGenre(" +
    pre_genres[4] +
    ")'>🥘 Curry</span>\
        <span class='movie_prompt' onclick='getSpecificGenre(" +
    pre_genres[5] +
    ")'>🌭 Hotdog</span>\
        <span class='movie_prompt' onclick='getSpecificGenre(" +
    pre_genres[6] +
    ")'>🍞 sandwich</span>\
        <span class='movie_prompt' onclick='getSpecificGenre(" +
    pre_genres[7] +
    ")'>🍰 Cake</span>\
        <span class='movie_prompt' onclick='getSpecificGenre(" +
    pre_genres[8] +
    ")'>🥟 Dumpling</span>\
  <span class='movie_prompt swiggy' onclick='window.open(" +
    link1 +
    ")'>🧡 Swiggy </span>\
  <span class='movie_prompt zomato' onclick='window.open(" +
    link2 +
    ")'>🍅 Zomato</span>\
    </div>\
<br/>\
    <p class='summary_text' style='min-height: 10px; margin: unset;'>Look for more</p>\
        <textarea id='food_recommender' class='input_box_big' rows='4' cols='50' placeholder='What do you want to eat?'></textarea>\
    <button class='intent_button' onclick='renderFoodRecipe()'>Reset</button><button class='intent_button' id='food_recommend_button' onclick='findRecipe()'>Find Food ideas</button>\
     \
    </div>";

  document.getElementById("modal_content").innerHTML = html;
}

function findRecipe() {
  var input = document.getElementById("food_recommender").value;

  document.getElementById("food_recommend_button").innerHTML =
    "🍜 searching for recipes . . .";

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
    <button class='intent_button' onclick='renderFoodRecipe()'>Reset</button>\
     <br/><br/>\
     </div>";

      document.getElementById("modal_content").innerHTML = html;
    }
  };
  var data = {
    prompt: input,
    temperature: 0.0,
    max_tokens: 120,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
  console.log(data);

  xhr.send(JSON.stringify(data));
}
