// Forever Home Finder
// (c) 2014 jpavley
// MIT License

// declare undeclared vars in comment so that c9 linter
// doesn't complain
/* global describe it before after */

var boot = require('../app').boot,
    shutdown = require("../app").shutdown,
    port = require('../app').port,
    superagent = require('superagent'),
    expect = require("expect.js");
    
describe('server', function() {
    
    before(function() {
        boot();
    });

    describe('homepage', function() {
       it('should respond to GET', function(done) {
           superagent
            .get('http://localhost:' + port)
            .end(function(res) {
                expect(res.status).to.equal(200);
                done();
            });
       });
    });
    
    after(function() {
        shutdown();
    });
});
