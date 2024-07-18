'use strict';

const IssueSchema = require("../db_schema");
const mongoose = require("mongoose");



module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(async function (req, res){
      const project = req.params.project;

      const { issue_title, issue_text, created_by, assigned_to, status_text, open, _id, created_on, updated_on } = req.query;

      
      const Issue = mongoose.model('Issue', IssueSchema, project);

      try {
        // Initialize an empty query object
        const query = {};

        // Check each query parameter and add to the query object if provided
        if (issue_title) query.issue_title = issue_title;
        if (issue_text) query.issue_text = issue_text;
        if (created_by) query.created_by = created_by;
        if (assigned_to) query.assigned_to = assigned_to;
        if (status_text) query.status_text = status_text;
        if (open !== undefined) query.open = open === 'true'; // Convert string to boolean if 'open' is provided
        if (_id) query._id = _id;
        if (created_on) query.created_on = created_on;
        if (updated_on) query.updated_on = updated_on;
        const issues = await Issue.find(query);
        res.status(200).json(issues)
      } catch (err) {
        res.status(400).json({ message: err.message });
      }

    })
    
    .post(async function(req, res){
      const project = req.params.project;

      const Issue = mongoose.model('Issue', IssueSchema, project);

      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;

      if (issue_title == "" || issue_text == "" || created_by == "") {
        res.status(400).json({ error: 'required field(s) missing' })
      } else {
        const newIssue = new Issue({
          issue_title,
          issue_text,
          created_by,
          assigned_to,
          status_text
        });
  
        try {
          const savedIssue = await newIssue.save();
          console.log(savedIssue);
          res.status(200).json(savedIssue.toObject());
        } catch (err) {
          res.status(400).json({ message: err.message });
        }      
      }     
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
