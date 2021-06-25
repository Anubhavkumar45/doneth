function renderFoodRecipe() {
  var html =
    "<div class='content_block'>\
        <textarea id='food_recommender' class='input_box_big' rows='4' cols='50' placeholder='What do you want to eat?'></textarea>\
    <button class='intent_button' onclick='renderFoodRecipe()'>Reset</button><button class='intent_button' id='food_recommend_button' onclick='findRecipe()'>Find Food ideas</button>\
     <br/><br/>\
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
