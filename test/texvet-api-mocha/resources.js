const supertest = require('supertest');
const expect = require('chai').expect;
const env = require('./../helpers/texvet-env-local')


const request = supertest(env.API_BASE_URL);

// THE HAZLEWOOD ACT
describe('the-hazlewood-act', function () {
    var path = '/public/v1/fulfillments/resources/the-hazlewood-act'

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
            expect(jsonData.message._id).to.not.be.empty;
            expect(jsonData.message.name).to.not.be.empty;
            expect(jsonData.message.headline).to.not.be.empty;
            expect(jsonData.message.body).to.not.be.empty;
            expect(jsonData.message.url).to.not.be.empty;
            done();
        });
    });

    it("Should retrieve appropriate resource", function(done) {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message.slug).to.equal("the-hazlewood-act");
            done();
        });
    });
});

// FREE PARK PASS
describe('free-park-pass', function () {
    var path = '/public/v1/fulfillments/resources/free-park-pass'

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
            expect(jsonData.message._id).to.not.be.empty;
            expect(jsonData.message.name).to.not.be.empty;
            expect(jsonData.message.headline).to.not.be.empty;
            expect(jsonData.message.body).to.not.be.empty;
            expect(jsonData.message.url).to.not.be.empty;
            done();
        })
    });

    it("Should retrieve appropriate resource", function(done) {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message.slug).to.equal("free-park-pass");
            done();
        })
    });
})

// REDUCED FEE SPORTING LICENSE
describe('reduced-fee-sporting-license', function () {
    var path = '/public/v1/fulfillments/resources/reduced-fee-sporting-license'

    it("Should Succeed", function() { 
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.status).to.equal(200);
            expect(jsonData.statusCode).to.equal(200);
            done();
        });
    });

    it("Should not be empty", function() {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message).to.not.be.null;
            expect(jsonData.message._id).to.not.be.empty;
            expect(jsonData.message.name).to.not.be.empty;
            expect(jsonData.message.headline).to.not.be.empty;
            expect(jsonData.message.body).to.not.be.empty;
            expect(jsonData.message.url).to.not.be.empty;
            done();
        })
    });

    it("Should retrieve appropriate resource", function() {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message.slug).to.equal("reduced-fee-sporting-license");
            done();
        })
    });
})

// PROPERTY TAXES
describe('property-taxes', function () {
    var path = '/public/v1/fulfillments/resources/property-taxes'

    it("Should Succeed", function() { 
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.status).to.equal(200);
            expect(jsonData.statusCode).to.equal(200);
            done();
        });
    });

    it("Should not be empty", function() {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message).to.not.be.null;
            expect(jsonData.message._id).to.not.be.empty;
            expect(jsonData.message.name).to.not.be.empty;
            expect(jsonData.message.headline).to.not.be.empty;
            expect(jsonData.message.body).to.not.be.empty;
            expect(jsonData.message.url).to.not.be.empty;
            done();
        })
    });

    it("Should retrieve appropriate resource", function() {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message.slug).to.equal("property-taxes");
            done();
        })
    });
})

// DRIVERS LICENSE VETERAN DESIGNATION
describe('drivers-license-veteran-designation', function () {
    var path = '/public/v1/fulfillments/resources/drivers-license-veteran-designation'

    it("Should Succeed", function() { 
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.status).to.equal(200);
            expect(jsonData.statusCode).to.equal(200);
            done();
        });
    });

    it("Should not be empty", function() {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message).to.not.be.null;
            expect(jsonData.message._id).to.not.be.empty;
            expect(jsonData.message.name).to.not.be.empty;
            expect(jsonData.message.headline).to.not.be.empty;
            expect(jsonData.message.body).to.not.be.empty;
            expect(jsonData.message.url).to.not.be.empty;
            done();
        })
        
    });

    it("Should retrieve appropriate resource", function() {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message.slug).to.equal("drivers-license-veteran-designation");
            done();
        })
    });
})

// FREE TOLL ROADS
describe('/public/v1/fulfillments/resources/free-toll-roads', function () {
    var path = '/public/v1/fulfillments/resources//public/v1/fulfillments/resources/free-toll-roads'

    it("Should Succeed", function() { 
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.status).to.equal(200);
            expect(jsonData.statusCode).to.equal(200);
            done();
        });
    });

    it("Should not be empty", function() {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message).to.not.be.null;
            expect(jsonData.message._id).to.not.be.empty;
            expect(jsonData.message.name).to.not.be.empty;
            expect(jsonData.message.headline).to.not.be.empty;
            expect(jsonData.message.body).to.not.be.empty;
            expect(jsonData.message.url).to.not.be.empty;
            done();
        })
    });

    it("Should retrieve appropriate resource", function() {
        request
        .get(path)
        .end(function(err, response) {
            var jsonData = JSON.parse(response.text)
            expect(jsonData.message.slug).to.equal("/public/v1/fulfillments/resources/free-toll-roads");
            done();
        })
    });
})


// SERVICES - IF GEVEN SLUP IS A NOT VALID SERVICE
describe('services - if given slug is a not valid service category', function () {
    var path = '/public/v1/fulfillments/services/invalid-category/noname'

    it("Should fail", function() {
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

