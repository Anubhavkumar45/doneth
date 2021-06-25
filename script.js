var Openai_key = "Bearer ";

function addTask() {
  var todo = document.getElementById("addTask").value;
  var button = document.getElementById("add_task_button");

  if (todo == "" || todo == " ") {
    alert("Write a task");
  } else {
    button.innerHTML =
      '<lottie-player src="https://assets9.lottiefiles.com/packages/lf20_63a9ij.json"  background="transparent"  speed="1"  style="width: 80px; height: 30px;"  loop autoplay></lottie-player>';
    getintent(todo);
  }
}

function countTasks() {
  var pill = document.getElementById("task_count");
  var todos = document.getElementsByClassName("todo");

  pill.innerHTML = todos.length;
}

function pageLoad() {
  var data = localStorage.getItem("todo-blob-1");
  if (data) {
    document.getElementById("task_list").innerHTML = data;
  }

  countTasks();

  getapikey();
}

pageLoad();

function getapikey() {
  var key = localStorage.getItem("openai_key");
  if (!key) {
    var button = document.getElementById("API_button");
    button.click();
  } else {
    Openai_key += key.trim();
  }
}

function set_openai_key() {
  var key_data = document.getElementById("api_key_input").value;
  console.log(key_data);

  Openai_key += key_data;

  localStorage.setItem("openai_key", key_data.trim());

  document.getElementById("close_key_modal").click();

  setTimeout(function () {
    location.reload();
  }, 100);
}

function modalContent(intent) {
  var intents_all = intent.split("/");

  var intent_apps = [
    "watch-movie",
    "food-recipe",
    "write-essay",
    "make-summary",
    "play-song",
    "go-to",
  ];

  switch (intents_all[0]) {
    case intent_apps[0]:
      renderMovieRecommend();
      break;
    case intent_apps[1]:
      renderFoodRecipe();
      break;
    case intent_apps[2]:
      renderWriteEssay();
      break;
    case intent_apps[3]:
      renderMakeSummary();
      break;
    case intent_apps[4]:
      renderPlaySong(intent);
      break;
    case intent_apps[5]:
      renderOpenMap(intent);
      break;
    default:
      var intent_pill = "";

      for (var i = 0; i < intents_all.length; i++) {
        intent_pill +=
          '<span class="intents_pills">' + intents_all[i] + "</span>";
      }
      document.getElementById("modal_content").innerHTML = "";

      var html =
        '<div class="content_block">\
    <img src = "https://media.giphy.com/media/xThta1QRK5zPDpneiQ/giphy.gif" width="120px"/>\
    <div class="content_title">Extracted Intents</div>\
    <div id="extracted_intents">\
' +
        intent_pill +
        "\
    </div>\
</div>";

      document.getElementById("modal_content").innerHTML = html;
      break;
  }
}

// function switchClass() {
//   document
//     .getElementsByClassName("todo_new")[0]
//     .classList.replace("todo_new", "todo");
// }

async function renderonpage(todo, intent) {
  var list = document.getElementById("task_list");
  //   console.log(intent);
  list.innerHTML =
    "<p class='todo'><span class='todo_dot'>&nbsp;</span>" +
    todo +
    "<br/>" +
    parseintent(intent) +
    "</p> " +
    list.innerHTML;

  document.getElementById("addTask").value = "";

  var button = document.getElementById("add_task_button");
  button.innerHTML = "Add task 🤠";
  countTasks();

  localStorage.setItem(
    "todo-blob-1",
    document.getElementById("task_list").innerHTML
  );
  //setTimeout(switchClass, 400);
}

async function getintent(prompt) {
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

      if (xhr.status == 401) {
        var button = document.getElementById("add_task_button");
        button.innerHTML = "Add task 🤠";

        document.getElementById("task_list").innerHTML =
          "<p class='summary_text' style='margin-left:0px'>" +
          JSON.parse(xhr.responseText).error.message +
          "</p><br/><br/><button class='intent_button' data-toggle='modal' data-target='#IntentTriggerModal_getAPI'>🔑 Set key</button>";
      } else {
        return_value = JSON.parse(xhr.responseText).choices[0].text;
        //console.log(return_value);
        renderonpage(prompt, return_value);
      }
    }
  };

  var prompt_data =
    "Q: Ask Constance if we need some bread\nA:send-msg/find constance/Do we need some bread?\n\nQ: Send a message to Greg to figure out if things are ready for Wednesday.\nA:send-msg/find greg/Is everything ready for Wednesday?/wednesday\n\nQ: Schedule a call with Siddharth to discuss things in the evening\nA:schedule-meet/find Siddharth/Discuss things this evening?/evening\n\nQ: Book a cab for tomorrow to go to college\nA:book-cab/to college/tomorrow\n\nQ: Play a song\nA:play-song\n\nQ: Play a song from Cactus\nA:play-song/cactus\n\nQ: Open a podcast\nA:open-podcast\n\nQ: Schedule a call tomorrow\nA:schedule-meet/tomorrow\n\nQ: Schedule a call with Subhasis sir on thursday\nA:schedule-meet/subhasis sir/thursday\n\nQ: Play a song from Anuv Jain\nA:play-song/anuv\n\nQ: Book a cab to victoria for monday\nA:book-cab/victoria/monday\n\nQ: I need a taxi\nA:book-cab\n\nQ: Go to college street on Friday\nA:book-cab/college street/friday\n\nQ: Call mom tomorrow\nA:call/mom/tomorrow\n\nQ: Call Diya on Thursday\nA:call/diya/thursday\n\nQ: Play a song from Anuv Jain\nA:play-song/anuv jain\n\nQ: Play songs from Led Zeppelin\nA:play-song/led zeppelin\n\nQ: Play songs from Ashchorjo Jontu o amra\nA:play-song/ashchorjo jontu o amra\n\nQ: Figure a movie to watch tonight\nA:watch-movie/tonight\n\nQ: Find a comedy movie to watch tonight\nA:watch-movie/comedy/tonight\n\nQ: Find some music to code along\nA:play-song/code along\n\nQ: Find something to eat\nA:food-recipe\n\nQ: Make lunch\nA:food-recipe\n\nQ: Figure something to eat tomorrow\nA:food-recipe\n\nQ: Revise for exams\nA:study-notes\n\nQ: Prepare notes to study\nA:study-notes\n\nQ: Write an essay on the fall of rome\nA:write-essay/fall of rome\n\nQ: Think through on the project submission\nA:write-essay\n\nQ: Summarize the topic\nA:make-summary\n\nQ: Need to go to get groceries\nA:go-to/grocery\n\nQ: Go to the grocery\nA:go-to/grocery\n\nQ: Go to the bank\nA:go-to/bank\nQ: " +
    prompt +
    "\nA:";

  var data = {
    prompt: prompt_data,
    temperature: 0.5,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.2,
    presence_penalty: 0.0,
    stop: ["\n"],
  };

  xhr.send(JSON.stringify(data));
}

function parseintent(param) {
  //return param;

  var intent1 = param.split("/");

  var intent_cleaned = clean_intent_text(intent1);

  param = "'" + param + "'";

  var intent_button =
    '<button class="intent_button" data-toggle="modal" data-target="#IntentTriggerModal" onclick="modalContent(' +
    param +
    ')">\
                ' +
    intent_cleaned.intent +
    "\
            </button>";

  if (intent_cleaned.exists == "true") return intent_button;
  else
    return (
      '<button class="intent_button" data-toggle="modal" data-target="#IntentTriggerModal" onclick="modalContent(' +
      param +
      ')">\
                ' +
      "Rick n Roll" +
      "\
            </button>"
    );
}

document.onkeydown = function (e) {
  if (e.key == "Enter") addTask();
};

function clean_intent_text(intent) {
  var intent_obj = {
    exists: "false",
    intent: "none",
  };

  var check_intenter = intent[0].trim();

  var intent_apps = [
    "send-msg",
    "schedule-meet",
    "book-cab",
    "play-song",
    "call",
    "watch-movie",
    "food-recipe",
    "study-notes",
    "write-essay",
    "make-summary",
    "go-to",
  ];

  var cleaned_up = [
    "Send a Message",
    "Schedule a call",
    "Book a cab",
    "Play",
    "Call",
    "Watch a Movie",
    "Find a recipe",
    "Get study notes",
    "Write an Essay",
    "Summarize",
    "Get done",
  ];

  for (var i = 0; i < intent_apps.length; i++) {
    if (intent_apps[i] === check_intenter) {
      intent_obj.exists = "true";
      intent_obj.intent = cleaned_up[i];
      break;
    }
  }

  return intent_obj;
}
