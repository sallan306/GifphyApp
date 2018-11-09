
var topics = ["frog", "cat","dog","dolphin","hamster","narwhal","bunny"];
var APIKey = "&api_key=MpmwsF4ZtiM0rNMpIHrkZhZJEz36hvfN";
var selected = '';
var newItemNumber = 0;
var query = "q="+ topics[selected];
var queryURL = "https://api.giphy.com/v1/gifs/search?" +
query + 
APIKey;

for (var i=0;i<topics.length;i++){
    $(".buttonDiv").append("<button class='button' id='"+topics[i]+"'>"+topics[i]+"</button>");
    newItemNumber = i;
}

$(document).on("click", ".image" ,function() {

    if ($(this).attr("data-state") === "still"){
        $(this).attr("data-state", "animate")
        var animate = $(this).attr("data-animate")
        $(this).attr("src", animate)
    }
    else if ($(this).attr("data-state") === "animate"){
        $(this).attr("data-state", "still")
        var still = $(this).attr("data-still")
        $(this).attr("src", still)
    }

});


$(".submitButton").on("click", function() {
    topics.push($(".entry").val().trim())
    newItemNumber += 1;
    console.log(topics)
    $(".buttonDiv").append("<button class='button' id='"+topics[newItemNumber]+"'>"+topics[newItemNumber]+"</button>");

});

$(document).on("click", ".button" ,function() {
    console.log("clicked!")
    selected = $(this).attr('id')
    query = "q="+ selected;
    queryURL = "http://api.giphy.com/v1/gifs/search?" +
    query + 
    APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      })  
      .then(function(response) {
        console.log(response)
          $(".pictureDiv").html("")
          for (var i = 0;i<10;i++) {
            $(".pictureDiv").append("<img src='"+response.data[i].images.fixed_height.url+
            "' class='image "+selected+
            "' id='"+i+"'" +
            "' data-still='"+response.data[i].images.fixed_height_still.url +"'"+
            "' data-animate='"+response.data[i].images.fixed_height.url+"'"+
            "' data-state='animate'>");
          }
      });

  });