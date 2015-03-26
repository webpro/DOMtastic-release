# DOMtastic

Release repository for [DOMtastic](http://webpro.github.io/DOMtastic/). These files are what you get when you install the `domtastic` package from npm or Bower. Please refer to the [project page](http://webpro.github.io/DOMtastic/) for more documentation, source code, tests, etc.

## Why?

Why isn't the source project itself published to npm and Bower?

* The source files are written in ES6, so you would have to transpile it yourself. This might be an obstacle, or inconvenient.
* It is a bad practice to store generated files in a source repository (i.e. the commonly seen `/dist` folder).
* This gives a nice and clean package repository with just the files you need.

## What?

This repository release contains the following files:

`/domtastic.js`

The UMD bundle, which works with AMD, CommonJS and browser global as fallback.

This is also the file served by the [jsDelivr CDN](http://www.jsdelivr.com/) for easy inclusion anywhere. E.g. [//cdn.jsdelivr.net/domtastic/0.10/domtastic.js](https:////cdn.jsdelivr.net/domtastic/0.10/domtastic.js) will give you the most recent `0.10.x` version. Additionally, this might come in handy if you just want to fiddle around to try or test something on e.g. JSFiddle or JS Bin ([JSFiddle example](http://jsfiddle.net/56r00faz/), [JS Bin example](http://jsbin.com/huhixolabo/1/edit?html,js,output)).

`/domtastic.min.js`

The minified production version of `domtastic.js`.

Both files come with a `.map` source map file for debugging purposes.

`/amd`

The generated and clean AMD version of the ES6 source, to directly use in your AMD projects (e.g. with Require.js).

`/commonjs`

The generated and clean CommonJS version of the ES6 source. Works well with e.g. Browserify.

## How?

* The release is done with [release-it](https://github.com/webpro/release-it), which has the feature to release any build output to a separate repository & npm.
* The transpilation of ES6 to CommonJS and AMD is done using [Babel](https://babeljs.io).

## License

[MIT](http://webpro.mit-license.org)
