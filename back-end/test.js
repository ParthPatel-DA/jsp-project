let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
let server = require("./app");
//Our parent block
describe("Podcast", () => {

  // describe("/GET getAllPost", () => {
  //   it("it should GET all the podcast", (done) => {
  //     chai
  //       .request(server)
  //       .get("/api/getAllPost")
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a("object");
  //         res.body.podcasts.length.should.be.eql(1);
  //         done();
  //       });
  //   });
  // });

  describe("/GET getUserDetail", () => {
    it("it should GET a message", (done) => {
      chai
        .request(server)
        .get("/api/getUserDetail")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
  
});
