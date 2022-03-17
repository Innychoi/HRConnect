const fakeAPI = require('./fakeFetch.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/linkedin');
// ,  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }
let repoSchema = mongoose.Schema({
  general: Object,
  jobs: Array,
  schools: Array,
  details: Object,
  skills: Array,
  allSkills: String,
  query: String,
  timestamp: String,
  background: Boolean,
  dreamJob: Boolean,
  location: Boolean,
  connected: Boolean
});


let Linkedin = mongoose.model('Linkedin', repoSchema);

module.exports = {
  getAll: function(req, res) {

    console.log('getAll:', req.query);
    if (req.query) {
      for ( var keys in req.query ) {
        req.query[keys] = req.query[keys] === 'true';
      }
      console.log('after:', req.query);
      Linkedin.find(req.query)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.status(500).send(err);
        })
    } else {
    Linkedin.find({})
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      })
    }
  },
  post: function(req, res) {
    console.log('post in models');
    Linkedin.insertOne(req.body)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        res.status(500).send(err);
      })
  },
  put: function(req, res) {
    const { background, dreamJob, _id, connected } = req.body;
    // const { location } = req.body;
    // console.log('req body:', req.body);
    if ( background !== undefined ) {
    Linkedin.updateOne({ _id }, { background })
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      })
    } else if (dreamJob !== undefined) {
      Linkedin.update({ _id }, { dreamJob })
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        console.log('err:', err);
        res.status(500).send(err);
      })
    } else if (connected !== undefined) {
      Linkedin.update({ _id }, { connected })
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        console.log('err:', err);
        res.status(500).send(err);
      })
    }
    //============================================
    // Linkedin.update({'general.location': { '$regex': 'Chicago', '$options': 'i'}}, { location: true })
    //         .then(() => {
    //     res.status(204).send();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     res.status(500).send(err);
    //   })

      // Linkedin.update({}, { connected: false })
      //       .then(() => {
      //   res.status(204).send();
      // })
      // .catch((err) => {
      //   console.log(err);
      //   res.status(500).send(err);
      // })

  },
  urlPost: function(req, res) {
    console.log(req.body)
    for ( let i = 0; i < fakeAPI.fetch.length; i++) {
      if (fakeAPI.fetch[i].general.profileUrl === req.body.url) {
        res.status(201).send(fakeAPI.fetch[i]);
        return;
      }
    }
    res.status(500).send();
  },
  delete: function(req, res){
    console.log(req.query);
    Linkedin.deleteOne({ _id: req.query._id})
      .then(() => {
        res.status(202).send();
      })
      .catch((err) => {
        res.status(500).send(err);
      })
  }
}