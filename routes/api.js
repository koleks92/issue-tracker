'use strict';

const IssueSchema = require("../db_schema");
const mongoose = require("mongoose");



module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      const project = req.params.project;
      res.json("Data")
    })
    
    .post(async function(req, res){
      const project = req.params.project;

      const Issue = mongoose.model('Issue', IssueSchema, project);

      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;

      try {
        const newIssue = new Issue({
          issue_title,
          issue_text,
          created_by,
          assigned_to,
          status_text
        });
  
        try {
          const savedIssue = await newIssue.save();
          delete savedIssue.__v;
          return res.status(201).json(savedIssue);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }      
      } catch (err) {
        return res.status(400).json({ error: 'required field(s) missing' })
      }
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
