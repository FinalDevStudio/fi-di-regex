'use strict';

const expect = require('chai').expect;
const diregex = require('../lib');

/**
 * Builds a test for each character.
 *
 * @param {String} char The mapping char to test.
 * @param {Object} options The options to pass to the regex.
 */
function testMappingChar(char, options) {
  const chars = diregex.MAPPINGS[char].split('');

  for (let j = 0, k = chars.length; j < k; j++) {
    let ch = chars[j];
    let regex = diregex.build(ch, options);

    /* Test for 6940 bug */
    let is6940 = /ÿ/.test(ch) && options && options.flags &&
      options.flags.indexOf('i') >= 0 && options.upper;

    if (is6940) {
      console.warn('The character "ÿ" case insesitive match against it\'s uppercase equivalent "Ÿ" is bugged on V8!');
      console.log('Please see https://bugs.chromium.org/p/v8/issues/detail?id=6940');
    } else {
      if (options && options.flags && options.flags.indexOf('g') >= 0) {
        const str = `www${ch}qqq${ch}45656`;
        expect(str).to.match(regex);
      } else {
        expect(ch).to.match(regex);
      }
    }
  }
}

describe('Fi Di Regex', function () {
  it('should be an object', function () {
    expect(diregex).to.be.an('object');
  });

  describe('MAPPINGS property', function () {
    it('should be an object', function () {
      expect(diregex.MAPPINGS).to.be.an('object');
    });
  });

  describe('build method', function () {
    it('should be a function', function () {
      expect(diregex.build).to.be.a('function');
    });

    it('should accept a string without options', function () {
      expect(diregex.build.bind(null, 'test')).to.not.throw();
    });

    it('should accept a string with options', function () {
      expect(diregex.build.bind(null, 'test', {})).to.not.throw();
    });

    it('should build a RegExp object with replaced characters', function () {
      const di = diregex.build('aeuioucny');

      expect(di).to.be.a('regexp');
      expect('aeuioucny').to.match(di);
    });

    it('should build a String with replaced characters', function () {
      const di = diregex.build('aeuioucny', {
        string: true
      });

      expect(di).to.be.a('string');
      expect('aeuioucny').to.match(new RegExp(di));
    });

    describe('by characters', function () {
      Object.keys(diregex.MAPPINGS).forEach((char) => {
        it(`should match any "${char}" variant`, () => testMappingChar(char));
      });
    });

    describe('by characters in lowercase', function () {
      const opts = {
        lower: true
      };

      Object.keys(diregex.MAPPINGS).forEach((char) => {
        it(`should match any "${char}" variant`, () => testMappingChar(char.toLowerCase(), opts));
      });
    });

    describe('by characters in uppercase', function () {
      const opts = {
        upper: true
      };

      Object.keys(diregex.MAPPINGS).forEach((char) => {
        it(`should match any "${char}" variant`, () => testMappingChar(char.toUpperCase(), opts));
      });
    });

    describe('by characters, case insensitive', function () {
      const opts = {
        flags: 'i'
      };

      Object.keys(diregex.MAPPINGS).forEach((char) => {
        it(`should match any "${char}" variant`, () => testMappingChar(char, opts));
      });
    });

    describe('by characters in lowercase and case insensitive', function () {
      const opts = {
        lower: true,
        flags: 'i'
      };

      Object.keys(diregex.MAPPINGS).forEach((char) => {
        it(`should match any "${char}" variant`, () => testMappingChar(char, opts));
      });
    });

    describe('by characters in uppercase and case insensitive', function () {
      const opts = {
        upper: true,
        flags: 'i'
      };

      Object.keys(diregex.MAPPINGS).forEach((char) => {
        it(`should match any "${char}" variant`, () => testMappingChar(char, opts));
      });
    });

    describe('by characters, global and case insensitive', function () {
      const opts = {
        flags: 'gi'
      };

      Object.keys(diregex.MAPPINGS).forEach((char) => {
        it(`should match any "${char}" variant`, () => testMappingChar(char, opts));
      });
    });

    describe('by characters in lowercase, global and case insensitive', function () {
      const opts = {
        lower: true,
        flags: 'gi'
      };

      Object.keys(diregex.MAPPINGS).forEach((char) => {
        it(`should match any "${char}" variant`, () => testMappingChar(char, opts));
      });
    });

    describe('by characters in uppercase, global and case insensitive', function () {
      const opts = {
        upper: true,
        flags: 'gi'
      };

      Object.keys(diregex.MAPPINGS).forEach((char) => {
        it(`should match any "${char}" variant`, () => testMappingChar(char, opts));
      });
    });

    describe('by custom match', function () {
      const opts = {
        lower: true,
        flags: 'gi'
      };

      it('should match names with diacritics', () => {
        /* This names were randomly generated with http://www.behindthename.com/random */
        expect('Theudobald Zbygněv Donnelly').to.match(diregex.build('gnev', opts));
        expect('Faramund Leoš Parent').to.match(diregex.build('leos', opts));
        expect('Živko Satchel Legolas Elsie Enns').to.match(diregex.build('zivko', opts));
        expect('Arsène Tejal Blaise').to.match(diregex.build('arse', opts));
        expect('León Ossian Ray').to.match(diregex.build('leo', opts));
        expect('Günther Enrica O\'Hannegan').to.match(diregex.build('Gunther', opts));
        expect('Zlatko Ranka Wägner').to.match(diregex.build('agner', opts));
        expect('Ardito Upasana Ekmekçi').to.match(diregex.build('mekci', opts));
        expect('Rowan Anup Puskás').to.match(diregex.build('puskas', opts));
        expect('Nichola Şermin Fortier').to.match(diregex.build('sermin', opts));
        expect('Teodoro Sayyid Babić').to.match(diregex.build('babic', opts));
        expect('Archil Carla Velázquez').to.match(diregex.build('velazquez', opts));
        expect('Lia Ryou Holmström').to.match(diregex.build('holmstrom', opts));
        expect('Prasert Ana Vlašič').to.match(diregex.build('vlasic', opts));
        expect('Kristel Maryanne Ozoliņš').to.match(diregex.build('ozolins', opts));
        expect('Lütfü Radana Winton').to.match(diregex.build('lutfu', opts));
        expect('Jędrzej Elene Armando').to.match(diregex.build('jed', opts));
        expect('Sofía Hadley Iordanou').to.match(diregex.build('sofi', opts));
        expect('Gaëtan Raz Andrysiak').to.match(diregex.build('gaetan', opts));
        expect('Kristian Katharina Sørensen').to.match(diregex.build('soren', opts));
        expect('Kjell Herleif Årud').to.match(diregex.build('arud', opts));
        expect('Jázmin Hrothgar Petrić').to.match(diregex.build('jazmin', opts))
          .and.to.match(diregex.build('petric', opts));
        expect('Judicaël Dakarai Benítez').to.match(diregex.build('cael', opts))
          .and.to.match(diregex.build('benitez', opts));
      });
    });
  });
});
