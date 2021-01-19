var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://fahim:fahim@cluster0.zhe8p.mongodb.net/?retryWrites=true&w=majority";

router.get("/", function (req, res, next) {
  res.render("index", { title: "Companies" });
});

router.get("/employers/:number", (req, res, next) => {
  var employersNr = parseInt(req.params.number);
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    let myDB = db.db("sample_training");
    myDB
      .collection("companies")
      .find(
        { number_of_employees: { $gt: employersNr } },
        {
          projection: {
            _id: 0,
            name: 1,
            number_of_employees: 1,
            founded_year: 1,
          },
        }
      )
      .sort({ number_of_employees: 1, name: 1 })
      // .limit(10)
      .toArray((err, result) => {
        if (err) throw err;
        res.send(result);
        db.close();
      });
  });
});

router.get("/offices/:city", (req, res, next) => {
  console.log(req.params.city);
  var city = req.params.city;
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    let myDB = db.db("sample_training");
    myDB
      .collection("companies")
      .find(
        { offices: { $elemMatch: { city: city } } },
        {
          projection: {
            _id: 0,
            name: 1,
            offices: 1,
          },
        }
      )
      .sort({ number_of_employees: 1, name: 1 })
      // .limit(10)
      .toArray((err, result) => {
        if (err) throw err;
        res.send(result);
        db.close();
      });
  });
});

module.exports = router;
