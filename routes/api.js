'use strict';

const Issue = require("../db_schema");


module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      const project = req.params.project;
      
      res.json("Data")
      
    })
    
    .post(async function(req, res){
      const project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;

      const newIssue = new Issue({
        project,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text
      });


      try {
        const savedIssue = await newIssue.save();
        res.status(200).json(savedIssue);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }      
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
