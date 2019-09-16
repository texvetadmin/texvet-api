const supertest = require('supertest');
const expect = require('chai').expect;
const env = require('./../helpers/texvet-env-local')


const request = supertest(env.API_BASE_URL);

//services - if given slug is a not valid service category
describe('services - if given slug is a not valid service category', function () {
    var path = '/public/v1/fulfillments/services/invalid-category/noname'

    it("Should fail", function(done) {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message).to.not.be.null;
            expect(jsonData.message).to.equal('Sorry, something went wrong! Please try again later.');
            done();
        });
    })  
})

//services - (VA-CLAIMS/ELKHART)
describe('services - (VA-CLAIMS/ELKHART)', function () {
    var path = '/public/v1/fulfillments/services/va-claims/elkhart'

    it("Should Succeed", function(done) { 
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.statusCode).to.equal(200);
            done();
        });
    });

    it("Should not be empty", function(done) {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message).to.not.be.null;
            expect(jsonData.message).to.be.an('array').that.is.not.empty;
            done();
        })
    });
})

//services - (VA-CLAIMS ANDERSON)
describe('services - (VA-CLAIMS ANDERSON)', function () {
    var path = '/public/v1/fulfillments/services/va-claims/anderson'

    it("Should Succeed", function(done) { 
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.statusCode).to.equal(200);
            done();
        });
    });

    it("Should not be empty", function(done) {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message).to.not.be.null;
            expect(jsonData.message).to.be.an('array').that.is.not.empty;
            done();
        })
    });
})

//referrals - (CVSO NONAME)
describe('referrals - (CVSO NONAME)', function () {
    var path = '/public/v1/fulfillments/referrals/cvso/noname'

    it("Should Succeed", function(done) { 
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.statusCode).to.equal(200);
            done();
        });
    });

    it("Should not be empty", function(done) {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message).to.not.be.null;
            expect(jsonData.message).to.be.an('array').that.is.not.empty;
            done();
        })
    });
})

//referrals - cvso (ALL COUNTIES + ELKHART)
describe('referrals - cvso (ALL COUNTIES + ELKHART)', function () {
    var path = '/public/v1/fulfillments/referrals/cvso/elkhart'

    it("Should Succeed", function(done) { 
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.statusCode).to.equal(200);
            done();
        });
    });

    it("Should not be empty", function(done) {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message).to.not.be.null;
            expect(jsonData.message).to.be.an('array').that.is.not.empty;
            done();
        })
    });
})

//referrals - cvso (ALL COUNTIES + ANDERSON)
describe('referrals - cvso (ALL COUNTIES + ANDERSON)', function () {
    var path = '/public/v1/fulfillments/referrals/cvso/anderson'

    it("Should Succeed", function(done) { 
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.statusCode).to.equal(200);
            done();
        });
    });

    it("Should not be empty", function(done) {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message).to.not.be.null;
            expect(jsonData.message).to.be.an('array').that.is.not.empty;
            done();
        })
    });
})

//referrals - If given slug is invalid should fail
describe('referrals - If given slug is invalid should fail', function () {
    var path = '/public/v1/fulfillments/referrals/mvbm/noname'

    it("Should fail", function(done) {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message).to.not.be.null;
            expect(jsonData.message).to.equal('Sorry, something went wrong! Please try again later.');
            done();
        });
    })  
})

//referrals - mvpn (ALL COUNTIES + noname)
describe('referrals - mvpn (ALL COUNTIES + noname)', function () {
    var path = '/public/v1/fulfillments/referrals/mvpn/noname'

    it("Should Succeed", function(done) { 
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.statusCode).to.equal(200);
            done();
        });
    });

    it("Should not be empty", function(done) {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message).to.not.be.null;
            expect(jsonData.message).to.be.an('array').that.is.not.empty;
            done();
        })
    });
})

//referrals - mvpn (ALL COUNTIES + ELKHART)
describe('referrals - mvpn (ALL COUNTIES + ELKHART)', function () {
    var path = '/public/v1/fulfillments/referrals/mvpn/elkhart'

    it("Should Succeed", function(done) { 
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.statusCode).to.equal(200);
            done();
        });
    });

    it("Should not be empty", function(done) {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message).to.not.be.null;
            expect(jsonData.message).to.be.an('array').that.is.not.empty;
            done();
        })
    });
})

//referrals - mvpn (ALL COUNTIES + ANDERSON)
describe('referrals - mvpn (ALL COUNTIES + ANDERSON)', function () {
    var path = '/public/v1/fulfillments/referrals/mvpn/anderson'

    it("Should Succeed", function(done) { 
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.statusCode).to.equal(200);
            done();
        });
    });

    it("Should not be empty", function(done) {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message).to.not.be.null;
            expect(jsonData.message).to.be.an('array').that.is.not.empty;
            done();
        })
    });
})