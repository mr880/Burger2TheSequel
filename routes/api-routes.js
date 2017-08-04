
var db = require("../models");

module.exports = function(app) {


    app.get("/", function(req, res) {
        db.Burger.findAll(
                      {
                        order: ['burger_name'],
                        include: [db.Customer]
                      }
                  )
                 .then(function(data) {
                      var hbsObject = {
                                        burgers: data
                                      };
                      res.render("index", hbsObject);
                  });
    });


    app.post("/", function(req, res) {
        db.Burger.create({
                          burger_name : req.body.name,
                          devoured    : false
                         })
                 .then(function(data) {
                      res.redirect("/");
        });
    });

    app.post("/:id", function(req, res) {

      db.Customer.findOrCreate({where: {customer_name: req.body.custname}})
                 .spread((user, created) => {

                         db.Burger.update(
                        {
                          devoured   : true,
                          CustomerId : user.id
                        },
                        {where: {id : req.params.id}}
                        )
                        .then((data) => {
                              res.redirect("/");
                        });
                 })
                 .catch((err) => {
                      console.log(err)
                 });
    });
};
