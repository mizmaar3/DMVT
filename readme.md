# The Delivery Metric Visualization Tool

> Project tested with node v 6.2.2

Reading serialized data over http-request and creating visual chart of delivery / impression data. Codebase consist of [ES6](https://babeljs.io/docs/learn-es2015/) script with [ReastJs](https://facebook.github.io/react/) components and [Less](http://lesscss.org/) css preprocessor styles.

- [Browserify](http://browserify.org/) is used to `bundle` the Project.

- [react-google-charts](https://www.npmjs.com/package/react-google-chart) made it easy to create `Barchart`.

- I made a custom data view component called `Table View` (similar to google charts Table view) which is showing aggregated data in a table.

- Bundling done with simple commands using [Gulp](http://gulpjs.com/) which is famous build system to automate build process.


## Install

First, clone the repo via git:

```bash
git clone https://github.com/mizmaar3/DMVT your-folder-name
```

And then install dependencies.

```bash
$ cd your-folder-name && npm install
```


## Build

Run this command to build and bundle the project.

```bash
$ npm run build
```

or simple run

```bash
$ gulp
```

To get minified+uglified version of bundle.js please run

```bash
$ npm run release
```


inside your project folder


## Start Server

To start local server please run

```bash
$ npm run start
```

and goto http://127.0.0.1:9830 or http://localhost:9830

> Loading the page will show you two dropdown option boxes. If you only select a `campaign` it will generate a table view with each row showing goals of selected campaign and its total impression and impression per day aggregated.

> If a campaign is selected and then you select a goal, it will generate `Barchart` with x-axis as day and y-axis as total impression on that day. There is a tooltip on Barchart as well.


## Example Code Explanation

#### The JS folder

- This folder contains all react modules and util functions like http-request promise.


#### The common-ui

- It contains the only used input custom module for dropdown `select` options.


#### The LESS folder

- Less folder contains `.less` files which will be compiled with `gulp-less` and concatenated into single file `style.css`, can be found in `dist` folder after building project.
