$.getJSON("/articles", function (data) {
    console.log(data);
    if (data.length > 0) {
        $("#articles").html("");
        for (var i = 0; i < data.length; i++) {
            $("#articles").append("<button id='saveArticle' data-id='" + data[i]._id + "'>Save Article</button> <a href= https://www.newyorker.com" + data[i].link + " target='_blank'>" + "https://www.newyorker.com" + data[i].link + "</a>" + "<br />" + "<p>" + data[i].title + "</p>");
        }
    } else {
        $("#articles").html("");
        $("#articles").append("Click the scrape button to get results.");
    }
});


$(document).on("click", "#saveArticle", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            body: $("#bodyinput").val()
        }
    }).then(function (data) {
        console.log(data);
        $("#notes").empty();
    });

    $("#titleinput").val("");
    $("#bodyinput").val("");
});

$(document).on("click", "#scrape", function () {
    $.ajax({
        method: "GET",
        url: "/scrape/"
    }).then(function (data) {
        $.getJSON("/articles", function (data) {
            console.log(data);
            if (data.length > 0) {
                $("#articles").html("");
                for (var i = 0; i < data.length; i++) {
                    $("#articles").append("<button id='saveArticle' data-id='" + data[i]._id + "'>Save Article</button> <a href= https://www.newyorker.com" + data[i].link + " target='_blank'>" + "https://www.newyorker.com" + data[i].link + "</a>" + "<br />" + "<p>" + data[i].title + "</p>");
                }
            } else {
                $("#articles").append("Click the scrape button to get results.");
            }
        });
    })
});


$(document).on("click", ".clear", function () {
    $.ajax({
        method: "GET",
        url: "/delete/"
    }).then(function (data) {
        console.log(data);
        if (data.length > 0) {
            $("#articles").html("");
            for (var i = 0; i < data.length; i++) {
                $("#articles").append("<button id='saveArticle' data-id='" + data[i]._id + "'>Save Article</button> <a href= https://www.newyorker.com" + data[i].link + " target='_blank'>" + "https://www.newyorker.com" + data[i].link + "</a>" + "<br />" + "<p>" + data[i].title + "</p>");
            }
        } else {
            $("#articles").html("");
            $("#articles").append("Click the scrape button to get results.");
        }
    })
});


$(document).on("click", "#saved", function () {
    $.getJSON("/articles", function (data) {
        console.log(data);
        if (data.length > 0) {
            $("#articles").html("");
            for (var i = 0; i < data.length; i++) {
                if (data[i].note) {
                    $("#articles").append("<button id='deleteArticle' data-id='" + data[i]._id + "'>Delete Article</button><button id='articleNotes' data-id='" + data[i]._id + "'>Article Notes</button> <a href= https://www.newyorker.com" + data[i].link + " target='_blank'>" + "https://www.newyorker.com" + data[i].link + "</a>" + "<br />" + "<p>" + data[i].title + "</p>");
                }
            }
        } else {
            $("#articles").html("");
            $("#articles").append("Click the save button next to an article to save it.");
        }
    });
});

//Fix where this doesn't delete a note when the delete button is clicked
$(document).on("click", "#deleteArticle", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/delete/" + thisId
    }).then(function (data) {
        $.getJSON("/articles", function (data) {
            console.log(data);
            if (data.length > 0) {
                $("#articles").html("");
                for (var i = 0; i < data.length; i++) {
                    if (data[i].note) {
                        $("#articles").append("<button id='deleteArticle' data-id='" + data[i]._id + "'>Delete Article</button><button id='articleNotes' data-id='" + data[i]._id + "'>Article Notes</button> <a href= https://www.newyorker.com" + data[i].link + " target='_blank'>" + "https://www.newyorker.com" + data[i].link + "</a>" + "<br />" + "<p>" + data[i].title + "</p>");
                    }
                }
            } else {
                $("#articles").html("");
                $("#articles").append("Click the save button next to an article to save it.");
            }
        });
    });
});

$(document).on("click", "#articleNotes", function() {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function(data) {
        console.log(data);
        $("#notes").append("<h2>" + data.title + "</h2>");
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        if (data.note) {
          $("#bodyinput").val(data.note.body);
        }
      });
  });


  // When you click the savenote button
$(document).on("click", "#savenote", function() {
   var thisId = $(this).attr("data-id");
   $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
 
    $("#bodyinput").val("");
  });