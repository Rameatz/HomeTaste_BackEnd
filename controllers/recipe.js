const express = require('express');
const models = require('../models');
const Redirect = require('../middlewares/redirect');
const getSlug = require('speakingurl');
const router = express.Router();
const Recipe= models.recipe;


//find all the recipe
router.get('/', (req, res) => { 
  Recipe.findAll().then(recipes => {
      res.json(recipes);
    }).catch(err => {
      console.log(err);
      res.status(500).json({msg: "error", details: err});
    });
});



//find by id
router.get('/:id', (req, res) => { 
  const id = req.params.id;
  Recipe.findAll( 
      { where: {id: id} }).then((recipes) => {
        res.status(200).json(recipes);
      }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
      });
});

//adding a new recipe
router.post('/',Redirect.ifNotLoggedIn('/login'), (req, res) => {
  Recipe.create(req.body).then(recipes => {    
      // Send created recipes to client
      res.json(recipes);
    }).catch(err => {
      console.log(err);
      res.status(500).json({msg: "error", details: err});
    });
});


//update recipe
router.put('/:id', (req, res) => {
  const id = req.params.id;
  Recipe.update( req.body, 
      { where: {id: id} }).then(() => {
        res.status(200).json( { mgs: "Updated Successfully -> Customer Id = " + id } );
      }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
      });
});

//delete  recipe
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Recipe.destroy({
      where: { id: id }
    }).then(() => {
      res.status(200).json( { msg: 'Deleted Successfully -> Customer Id = ' + id } );
    }).catch(err => {
      console.log(err);
      res.status(500).json({msg: "error", details: err});
    });
});

module.exports = router;