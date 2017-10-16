'use strict';

/* Default mappings */
const MAPPINGS = {
  A: String.fromCharCode(65, 192, 193, 194, 195, 196, 197),
  a: String.fromCharCode(97, 224, 225, 226, 227, 228, 229),
  C: String.fromCharCode(67, 199, 262, 264, 268),
  c: String.fromCharCode(99, 231, 263, 265, 269),
  E: String.fromCharCode(69, 200, 201, 202, 203, 280, 282),
  e: String.fromCharCode(101, 232, 233, 234, 235, 281, 283),
  I: String.fromCharCode(73, 204, 205, 206, 207),
  i: String.fromCharCode(105, 236, 237, 238, 239),
  N: String.fromCharCode(78, 209, 323, 325, 504),
  n: String.fromCharCode(110, 241, 324, 326, 505),
  O: String.fromCharCode(79, 210, 211, 212, 213, 214, 216),
  o: String.fromCharCode(111, 242, 243, 244, 245, 246, 248),
  S: String.fromCharCode(83, 346, 348, 350, 352),
  s: String.fromCharCode(115, 347, 349, 351, 353),
  U: String.fromCharCode(85, 217, 218, 219, 220),
  u: String.fromCharCode(117, 249, 250, 251, 252),
  Y: String.fromCharCode(89, 221, 376, 374, 7922),
  y: String.fromCharCode(121, 253, 255, 375, 7923),
  Z: String.fromCharCode(90, 381),
  z: String.fromCharCode(122, 382),
};

/**
 * Merges default mappings with new ones.
 *
 * @param {Object} mapps A mappings object.
 *
 * @returns {Object} Merged mappings object.
 */
function mergeMappings(mapps) {
  const merged = Object.assign({}, MAPPINGS);

  if (mapps) {
    Object.assign(merged, mapps);
  }

  return merged;
}

/**
 * Replaces all mapped characters with case insensitive ones.
 *
 * @param {String} input The input string to process.
 * @param {Object} mappings The character mapping to use.
 * @param {Object} options The options object.
 * @param {Boolean} options.upper Whether to return an upper-case string.
 * @param {Boolean} options.lower Whether to return a lower-case string.
 *
 * @returns {String} The replaced string.
 */
function replacer(input, mappings, options) {
  const replaced = input.split('').map((letter) => {
    for (let mapping in mappings) {
      let shouldReplace = mapping && mapping !== mappings[mapping] &&
        (mapping === letter || mappings[mapping].indexOf(letter) !== -1);

      if (shouldReplace) {
        letter = `[${mappings[mapping]}]`;

        break;
      }
    }

    return letter;
  }).join('');

  if (options.upper) {
    return replaced.toUpperCase();
  }

  if (options.lower) {
    return replaced.toLowerCase();
  }

  return replaced;
}

/**
 * Parses a string and replaces the diacritic sensitive characters with its
 * diacritic insensitive equivalents.
 *
 * @param {String} input The input string to replace.
 * @param {Object} options The options object.
 * @param {Boolean} options.string Whether to return a string instead of a
 * regex.
 * @param {Object} options.mappings Mappings to merge with the defaults.
 * @param {String} options.flags The regular expression flags.
 * @param {Boolean} options.upper Whether to return an upper-case string or regex.
 * @param {Boolean} options.lower Whether to return a lower-case string or regex.
 *
 * @returns {String|RegExp} The resulting string or regular expression.
 */
function build(input, options) {
  if (!options) {
    options = {};
  }

  const mappings = mergeMappings(options.mappings);
  const replaced = replacer(input, mappings, options);

  if (options.string) {
    return replaced;
  }

  return new RegExp(replaced, options.flags);
}

module.exports = {
  MAPPINGS,

  replacer,
  build,
};
