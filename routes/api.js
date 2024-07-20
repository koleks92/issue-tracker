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
        const query = {};

        if (issue_title) query.issue_title = issue_title;
        if (issue_text) query.issue_text = issue_text;
        if (created_by) query.created_by = created_by;
        if (assigned_to) query.assigned_to = assigned_to;
        if (status_text) query.status_text = status_text;
        if (_id) query._id = _id;
        if (created_on) query.created_on = created_on;
        if (updated_on) query.updated_on = updated_on;
        if (open) {
          if (open == "true") {
            updatedFields.open = true;
          } else {
            updatedFields.open = false
          } 
        }

        let issues;

        if (!query) {
          issues = await Issue.find();
        } else {
          issues = await Issue.find(query);
        }
        return res.json(issues)
      } catch (err) {
        return res.json({ message: err.message });
      }

    })
    
    .post(async function (req, res) {
      const project = req.params.project;

      
      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;
      
      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: 'required field(s) missing' });
      }

      const Issue = mongoose.model('Issue', IssueSchema, project);
      
      const created_on = new Date();
      const updated_on = new Date();
      const open = true;

      const newIssue = new Issue({
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
        created_on,
        updated_on,
        open
      });

      try {
        const savedIssue = await newIssue.save();

        if (!savedIssue) {
          throw err
        }

        return res.json(savedIssue);
      } catch (err) {
        return res.json({ message: err.message });
      }
    })
    
    
    .put(async function(req, res){
      let project = req.params.project;

      const _id = req.body._id;
      
      if(_id === '' || !_id){
        return res.json({error: 'missing _id'});
      }

      const Issue = mongoose.model('Issue', IssueSchema, project);
      
      const { assigned_to, status_text, open, issue_title, issue_text } = req.body;

      if (!assigned_to && !status_text && !open && !issue_title && !issue_text) {
        return res.json( { error: 'no update field(s) sent', '_id': _id } )
      }

      try {
        const updatedFields = {}

        if (assigned_to) updatedFields.assigned_to = assigned_to;
        if (status_text) updatedFields.status_text = status_text;
        if (issue_title) updatedFields.issue_title = issue_title;
        if (issue_text) updatedFields.issue_text = issue_text;

        if (open) {
          if (open == "true") {
            updatedFields.open = true;
          } else {
            updatedFields.open = false
          } 
        }

        updatedFields.updated_on = new Date();


        const updatedIssue = await Issue.findByIdAndUpdate(_id, updatedFields, { new: true });

        if (!updatedIssue) {
          throw err
        }
    
        return res.json({ result: 'successfully updated', '_id': _id });
      } catch (err) {
          res.json({
            error: 'could not update', '_id': _id
          }) 
      }
      
    })
    
    .delete(async function (req, res){
      let project = req.params.project;

      const Issue = mongoose.model('Issue', IssueSchema, project);

      const _id = req.body._id;

      if (!_id) {
        return res.json({ error: 'missing _id' })
      };

      try {
        const deleted = await Issue.findByIdAndDelete(_id);

        if (!deleted) {
          throw error;
        }

        res.json({
          result: 'successfully deleted', '_id': _id 
        })
      } catch (err) {
        res.json({
          error: 'could not delete', '_id': _id
        })
      }
      
    });
    
};
