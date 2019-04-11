// TODO: Add tests that you find necessary.

const { isValidXML } = require("../src");

describe("advanced validator test", () => {
  describe("given valid xml", () => {
    it("should return true for an xml with a self closing node without blank", () => {
      expect(isValidXML("<a/>")).toBeTruthy();
    });
  });
  describe("given invalid xml", () => {
    it("should return false for an xml with open tag different with close tag", () => {
      expect(isValidXML("<a></b>")).toBeFalsy();
    });
  });
});
