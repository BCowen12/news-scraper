var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

app.get("/scrape", function (req, res) {
    axios.get("https://www.newyorker.com/magazine/fiction").then(function (response) {
        var $ = cheerio.load(response.data);

        $("ul li .River__riverItemContent___2hXMG").each(function (i, element) {
            var result = {};

            result.title = $(this)
                .children(".Link__link___3dWao  ")
                .text();
            result.link = $(this)
                .children(".Link__link___3dWao  ")
                .attr("href");

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });

        res.send("Scrape Complete");
    });
});

app.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.get("/notes", function (req, res) {
    db.Note.find({})
        .then(function (dbNote) {
            res.json(dbNote);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.post("/articles/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbArticle) {
            es.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});


app.get("/delete", function (req, res) {
    db.Article.remove({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.get("/saved", function (req, res) {
    db.Article.find({note})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.post("/delete/:id", function(req, res) {
    db.note.remove({ _id: mongojs.ObjectID(req.params.id) })
      .then(function(dbArticle) {
       res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  