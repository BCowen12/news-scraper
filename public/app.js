$.getJSON("/articles", function (data) {
    console.log(data);
    if(data.length > 0){
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
            title: $("#titleinput").val(),
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
            if(data.length > 0){
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
            if(data.length > 0){
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
        if(data.length > 0){
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


$(document).on("click", "#deleteArticle", function () {
        var thisId = $(this).attr("data-id");
        console.log(thisId);
        $.ajax({
            method: "POST",
            url: "/delete/" + thisId
        }).then(function (data) {
    $.getJSON("/articles", function (data) {
        console.log(data);
        if(data.length > 0){
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