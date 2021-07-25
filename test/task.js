let server = require("../server");
let chai = require("chai");
let chaiHttp = require("chai-http");

// Assertion 
chai.should();
chai.use(chaiHttp);


/** Test the GET route which fetches the attribute lists */
describe("GET all attribute lists", () => {
    it("It should GET all attributes", (done) => {
        chai.request(server)
            .get("/app/attributeList")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('attrList');
                done();
            });
    });

    it("It should NOT GET a attributes by ID", (done) => {
        const attrId = 5;
        chai.request(server)
            .get("/app/attributeList" + attrId)
            .end((err, response) => {
                response.should.have.status(404);
                response.text.should.be.eq(`{"error":404,"message":"Not Found"}`);
                done();
            });
    });

});

 /** Test the POST route */
  describe("Create new attribute", () => {
    it("It should CREATE a new attribute", (done) => {
        const attr = {
            attrName: "classeasq",
            attrValue: "discovser"
        };
        chai.request(server)                
            .post("/app/createAttribute")
            .send(attr)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('message').eq("Attribute added successfully");
            done();
            });
    });
    it("It should NOT CREATE a new property with the same value", (done) => {
        const attr = {
            attrName: "classes",
            attrValue: "discover"
        };
        chai.request(server)                
            .post("/app/createAttribute")
            .send(attr)
            .end((err, response) => {
                response.should.have.status(400);
                response.body.should.have.property('error').eq(400);
                response.body.should.have.property('message').eq("Attribute with same name already exists.");
            done();
            });
    });
    it("It should NOT CREATE a new property without the attrName property", (done) => {
        const task = {
            attrValue: 'qwery'
        };
        chai.request(server)                
            .post("/app/createAttribute")
            .send(task)
            .end((err, response) => {
                response.should.have.status(404);
                response.body.should.have.property('message').eq("Blank data cannot be processed.");
            done();
            });
    });

});