let expect = require("chai").expect;
let request = require("request");

describe("Status and content", function () {
  describe("Get response from api", function () {
    it("status", function (done) {
      request("http://localhost:3001/api", function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it("content", function (done) {
      request("http://localhost:3001/api", function (error, response, body) {
        expect(body).to.equal("Hello from Evans server!");
        done();
      });
    });
  });
});
