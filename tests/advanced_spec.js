// TODO: Add tests that you find necessary.

const { isValidXML } = require("../src");

describe("advanced validator test", () => {
  describe("given valid xml", () => {
    it("should return true for an xml with a self closing node without blank", () => {
      expect(isValidXML("<a/>")).toBeTruthy();
    });
  });
});
