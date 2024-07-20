const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
this.timeout(5000);
    suite('Tests to /api/issues/', function () {
        // Test id for delete test
        let testId;

        test('Test post correct all', function(done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/issues/apitest/')
                .send({
                    issue_title: "Test",
                    issue_text: "Test",
                    created_by: "Test",
                    assigned_to: "Test",
                    status_text: "Test",
                })
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.issue_title, 'Test');
                        assert.equal(res.body.issue_text, 'Test');
                        assert.equal(res.body.created_by, 'Test');
                        assert.equal(res.body.assigned_to, 'Test');
                        assert.equal(res.body.status_text, 'Test');
                        testId = res.body._id;
                        done();
                    }
                })
        });
        test('Test post correct required', function(done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/issues/apitest/')
                .send({
                    issue_title: "Test",
                    issue_text: "Test",
                    created_by: "Test"
                })
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.issue_title, 'Test');
                        assert.equal(res.body.issue_text, 'Test');
                        assert.equal(res.body.created_by, 'Test');
                        done();
                    }
                })
        });
        test('Test post incorrect (missing data) ', function(done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/issues/apitest/')
                .send({
                    issue_title: "Test",
                })
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        assert.equal(res.status, 200);
                        assert.deepEqual(res.body, {error: "required field(s) missing"});
                        done();
                    }
                })
        });
        test('Test get all issues', function(done) {
            chai
                .request(server)
                .keepOpen()
                .get('/api/issues/apitest')
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        assert.equal(res.status, 200);
                        assert.isArray(res.body);
                        done();
                    }
                })
        });
        test('Test get issues one filter', function(done) {
            chai
                .request(server)
                .keepOpen()
                .get('/api/issues/apitest?status_text=Test')
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        assert.equal(res.status, 200);
                        assert.isArray(res.body);
                        assert.equal(res.body[0].status_text, "Test");

                        done();
                    }
                })
        });
        test('Test get issues two filters', function(done) {
            chai
                .request(server)
                .keepOpen()
                .get('/api/issues/apitest?status_text=Test&assigned_to=Test')
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        assert.equal(res.status, 200);
                        assert.isArray(res.body);
                        assert.equal(res.body[0].status_text, "Test");
                        assert.equal(res.body[0].assigned_to, "Test");

                        done();
                    }
                })
        });
        test('Test put issue one field', function(done) {
            chai
                .request(server)
                .keepOpen()
                .put('/api/issues/apitest')
                .send({
                    _id: '669b633b52eca4c7c2950967',
                    issue_title: "Change"
                })
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        assert.equal(res.status, 200);
                        assert.isObject(res.body);
                        assert.equal(res.body._id, '669b633b52eca4c7c2950967' )

                        done();
                    }
                })
        });
        test('Test put issue more fields', function(done) {
            chai
                .request(server)
                .keepOpen()
                .put('/api/issues/apitest')
                .send({
                    _id: '669b633b52eca4c7c2950967',
                    issue_title: "Change",
                    status_text: 'Change',
                    open: false
                })
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        assert.equal(res.status, 200);
                        assert.isObject(res.body);
                        assert.equal(res.body._id, '669b633b52eca4c7c2950967' )

                        done();
                    }
                })
        });
        test('Test put issue missing id', function(done) {
            chai
                .request(server)
                .keepOpen()
                .put('/api/issues/apitest')
                .send({
                    issue_title: "Change",
                    status_text: 'Change',
                    open: false
                })
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        assert.equal(res.status, 200);
                        assert.isObject(res.body);
                        assert.equal(res.body.error, 'missing _id' )

                        done();
                    }
                })
        });
        test('Test put issue missing update fields', function(done) {
            chai
                .request(server)
                .keepOpen()
                .put('/api/issues/apitest')
                .send({
                    _id: '669b633b52eca4c7c2950967',
                })
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        assert.equal(res.status, 200);
                        assert.isObject(res.body);
                        assert.equal(res.body.error, 'no update field(s) sent' )

                        done();
                    }
                })
        });
        test('Test put issue invalid id', function(done) {
            chai
                .request(server)
                .keepOpen()
                .put('/api/issues/apitest')
                .send({
                    _id: 'invalid',
                    issue_title: "Change",

                })
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        assert.equal(res.status, 200);
                        assert.isObject(res.body);
                        assert.equal(res.body.error, 'could not update' )

                        done();
                    }
                })
        });
        test('Test delete issue id', function(done) {
            chai
                .request(server)
                .keepOpen()
                .delete('/api/issues/apitest')
                .send({
                    _id: testId,

                })
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        assert.equal(res.status, 200);
                        assert.isObject(res.body);
                        assert.equal(res.body.result, 'successfully deleted' )

                        done();
                    }
                })
        });
        test('Test delete issue invalid id', function(done) {
            chai
                .request(server)
                .keepOpen()
                .delete('/api/issues/apitest')
                .send({
                    _id: 'invalid',

                })
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        assert.equal(res.status, 200);
                        assert.isObject(res.body);
                        assert.equal(res.body.error, 'could not delete' )

                        done();
                    }
                })
        });
        test('Test delete issue missing id', function(done) {
            chai
                .request(server)
                .keepOpen()
                .delete('/api/issues/apitest')
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        assert.equal(res.status, 200);
                        assert.isObject(res.body);
                        assert.equal(res.body.error, 'missing _id' )

                        done();
                    }
                })
        });
    })
});
