// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const faculties = require("../models/faculties");
// define the faculty model
let faculty = require("../models/faculties");

/* GET faculties List page. READ */
router.get("/", (req, res, next) => {
  // find all faculties in the faculties collection
  faculty.find((err, faculties) => {
    if (err) {
      return console.error("err");
    } else {
      res.render("faculties/index", {
        title: "Faculties",
        faculties: faculties,
      });
    }
  });
});

// GET - process the delete
router.get("/delete", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  faculties.deleteOne({ Facultyname: req.query.Facultyname }, (err, raw) => {
    res.redirect("/faculties")
  })
});

//  GET the faculty Details page in order to add a new faculty
router.get("/add", (req, res, next) => {
  res.render("faculties/add", {
    title: "Add Faculty"
  })
});

// POST process the faculty  Details page and create a new faculty  - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let newItem = faculty({
    Facultyname: req.body.Facultyname,
    Department: req.body.Fepartment,
    Subject: req.body.Subject,
  })
   faculties.create(newItem)
   res.redirect("/faculties")
  });

// GET the faculty  Details page in order to edit an existing faculty
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id
  faculties.findById(id, (err, docs) => {
    if (!err) {
      res.render("faculties/details", {
        title: "Faculty Details",
        faculties: docs
      })
    }
  })
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id
  let updateItem = faculty({
    _id: id, 
    Facultyid: req.body.Facultyid,
    Facultyname: req.body.Facultyname,
    Department: req.body.Fepartment,
    Subject: req.body.Subject,
  })
  console.log(updateItem)
  faculties.update({_id: id}, updateItem, (err, raw) => {
    res.redirect("/faculties")
  })
});

module.exports = router;
