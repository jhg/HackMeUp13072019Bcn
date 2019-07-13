'use strict';

const split = require('./split').split;
const expect = require('chai').expect;

describe('split module', () => {
  describe('"split"', () => {
    it('should export a function', () => {
      expect(split).to.be.a('function');
    });
    it('sould split "a,b,c" with delimiter "," as ["a", "b", "c"]', () => {
      expect(split("a,b,c", ",")).to.be.eql(["a", "b", "c"]);
    });
    it('sould split "aabccc" with delimiter "bc" as ["aa", "cc"]', () => {
      expect(split("aabccc", "bc")).to.be.eql(["aa", "cc"]);
    });
    it('sould split "" as []', () => {
      expect(split("", "")).to.be.eql([]);
    });
    it('sould split ",a,b,c" with delimiter "," as ["", "a", "b", "c"]', () => {
      expect(split(",a,b,c", ",")).to.be.eql(["", "a", "b", "c"]);
    });
    it('sould split "a,b,c," with delimiter "," as ["a", "b", "c", ""]', () => {
      expect(split("a,b,c,", ",")).to.be.eql(["a", "b", "c", ""]);
    });
  });
});
