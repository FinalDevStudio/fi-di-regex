# Fi Di Regex

Diacritic RegExp builder.

Build a diacritic insensitive regular expression ideal to match names when making searches.


## Installation

```sh
npm i fi-di-regex
```


## Usage

```js
const diregex = require('fi-di-regex');

const regex = diregex.build('juan', { flags: 'gi' }); // /j[uùúûü][aàáâãäå][nñńņǹ]/gi

regex.test('Juán'); // true
```


### Options

| Options | Type | Description |
|---|---|---|
| `string` | `Boolean` | Whether to return a String instead of a RegExp. |
| `upper` | `Boolean` | Whether to return an uppercase String or RegExp. |
| `lower` | `Boolean` | Whether to return a lowercase String or RegExp. |
| `flags` | `String` | Any valid RegExp flags. |
| `mappings` | `Object` | Mappings to merge with the default ones. If a property with the same name of an existing mapping is passed, it will overwrite the default completely. |


## Use Case

Assume we are looking for an employee named `Juán` but the user isn't aware that computers are not diacritic insensitive.

There will be no results and this is will really annoy our user.

With this library you can create a regex that will match `juan` with `Juán` as expected by the user:

```js
diregex.build('juan', { flags: 'gi' }); // /j[uùúûü][aàáâãäå][nñńņǹ]/gi
```

Our user is happy again.


## A Note On Mappings

We've taken the time to map many of the diacritic equivalents on multiple letters but there may be some missing or unnecessary. If you happen to found either a missing or unnecessary mapping, then please open an issue or, better yet, open a pull request.

Every little bit counts.


### Current Mappings

```js
{
  A: 'AÀÁÂÃÄÅ',
  a: 'aàáâãäå',
  C: 'CÇĆĈČ',
  c: 'cçćĉč',
  E: 'EÈÉÊËĘĚ',
  e: 'eèéêëęě',
  I: 'IÌÍÎÏ',
  i: 'iìíîï',
  N: 'NÑŃŅǸ',
  n: 'nñńņǹ',
  O: 'OÒÓÔÕÖØ',
  o: 'oòóôõöø',
  S: 'SŚŜŞŠ',
  s: 'sśŝşš',
  U: 'UÙÚÛÜ',
  u: 'uùúûü',
  Y: 'YÝŸŶỲ',
  y: 'yýÿŷỳ',
  Z: 'ZŽ',
  z: 'zž'
}
```


## Important

There is a bug in V8 which is not matching Ÿ with ÿ when the i flag is set.

Please see https://bugs.chromium.org/p/v8/issues/detail?id=6940 for details.



