const supertest = require('supertest');
const expect = require('chai').expect;
const env = require('./../helpers/texvet-env-local')


const request = supertest(env.DRUPAL_URL);

// referrals - mvpn (TRAVIS + ALL COUNTIES)
describe('referrals - mvpn (TRAVIS + ALL COUNTIES)', function () {
    var path = '/rest/v1/content/resources/referrals/mvpn/25270+37953'

    it("Should Succeed", function(done) { 
        request
        .get(path)
        .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });


    it("Should not be empty", function(done) {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData).to.be.an('array').that.is.not.empty;
            done();
        })
    });
})

//referrals - mvpn (TRAVIS)
describe('referrals - mvpn (TRAVIS)', function () {
    var path = '/rest/v1/content/resources/referrals/mvpn/25270'

    it("Should Succeed", function(done) { 
        request
        .get(path)
        .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });


    it("Should not be empty", function(done) {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData).to.be.an('array').that.is.not.empty;
            done();
        })
    });
})

//referrals - vcso (TRAVIS + ALL COUNTIES)
describe('referrals - vcso (TRAVIS + ALL COUNTIES)', function () {
    var path = '/rest/v1/content/resources/referrals/cvso/25270+37953'

    it("Should Succeed", function(done) { 
        request
        .get(path)
        .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });


    it("Should not be empty", function(done) {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData).to.be.an('array').that.is.not.empty;
            done();
        })
    });
})

//referrals - vcso (TRAVIS)
describe('referrals - vcso (TRAVIS)', function () {
    var path = '/rest/v1/content/resources/referrals/cvso/25270'

    it("Should Succeed", function(done) { 
        request
        .get(path)
        .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });


    it("Should not be empty", function(done) {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData).to.be.an('array').that.is.not.empty;
            done();
        })
    });
})