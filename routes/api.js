'use strict';

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      const project = req.params.project;
      
      res.json("Data")
      
    })
    
    .post(function (req, res){
      let project = req.params.project;
      let data = req.body;

      res.json({
        issue_title: data.issue_title,
        issue_text: data.issue_text,
        created_by: data.created_by,
        assigned_to: data.assigned_to,
        status_text: data.status_text
      })

      
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
