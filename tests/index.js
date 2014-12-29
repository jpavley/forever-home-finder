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
    expect = require("expect.js"),
    testProfiles = require('../db/profles.json');
    
describe('server', function() {
    
    before(function() {
        boot();
    }); // before

    describe('homepage', function() {

       it('should respond to GET', function(done) {
           superagent
            .get('http://localhost:' + port)
            .end(function(res) {
                expect(res.status).to.equal(200);
                done();
            }); // end
        }); // it

        it('should contain profiles', function(done) {
            superagent
                .get('http://localhost:' + port)
                .end(function(res) {
                    testProfiles.forEach(function(item, index, list) {
                        if (item.published) {
                            expect(res.text).to.contain('<h2><a href="/profiles/' + items.slug + '">' + item.title);
                        } else {
                            expect(res.text).not.to.contain('<h2><a href="/profiles/' + item.slug + '">' item.title);
                        }
                        console.log(item.title, res.text);
                    }); // forEach
                    done();
            }); // end
        }); // it
    }); // describe

    describe('profile page', function() {
        it('should display text', function(done) {
            var n = testProfiles.length;
            testProfiles.forEach(function(item, index, list) {
                superagent
                    .get('http://localhost:' + port + '/profiles/' + testProfiles[index].slug)
                    .end(function(res) {
                        if (item.published) {
                            expect(res.text).to.contain(testProfiles[index].text);
                        } else {
                            expect(res.status).to.be(401);
                        }
                        console.log(item.title);

                    }); // end
            }); // for each
        }); // it
    }); // describe
    
    after(function() {
        shutdown();
    }); // after
});
