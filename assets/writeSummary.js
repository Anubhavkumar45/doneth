function renderMakeSummary() {
  var html =
    "<div class='content_block'>\
        <textarea id='text_summarizer' class='input_box_big' rows='4' cols='50' placeholder='Enter text to summarize'></textarea>\
    <button class='intent_button' onclick='renderMakeSummary()'>Reset</button><button class='intent_button' id='summarize_button' onclick='getSummary()'>Summarize</button>\
     <br/><br/>\
    </div>";

  document.getElementById("modal_content").innerHTML = html;
}

function getSummary() {
  var input = document.getElementById("text_summarizer").value + "\n\ntl;dr:";
  document.getElementById("summarize_button").innerHTML =
    "🤯 summarizing . . .";

  var url = "https://api.openai.com/v1/engines/davinci/completions";

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
    <button class='intent_button' onclick='renderMakeSummary()'>Reset</button>\
     <br/><br/>\
     </div>";

      document.getElementById("modal_content").innerHTML = html;
    }
  };

  var data = {
    prompt: input,
    temperature: 0.3,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  xhr.send(JSON.stringify(data));
}
