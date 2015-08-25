# Bravocart generator [![Build Status][travis-image]][travis-url] [![npm version][npm-image]][npm-url]


> Yeoman generator for creating beautiful mobile shops using Bravocart and Ionicframework.

![][yeoman-demo]

## Features

- Scaffolding Bravocart projects with Yeoman
- [bravocart.js](https://github.com/bravocart/bravocart) integration for easy API access
- Cordova integration for building native apps
- Gulp tasks for building iOS/Android apps
- Browsersync live reload for development
- Painless dependency management with Bower

## Usage

```bash
npm install -g yo bower grunt-cli gulp generator-bravocart cordova ionic
```

Run `yo bravocart`.

```bash
yo bravocart
```

Run `gulp` for preview.

## Project Structure

    ├── hooks/                  - Hooks to be used by Cordova
    ├── platforms
    │   ├── ios                 - Created by `cordova platform add ios`
    │   ├── android/            - Created by `cordova platform add android`
    │   ├── platforms.json      - To be used by Cordova
    ├── plugins/                - Plugins to be used by Cordova
    ├── www/                    - Directory holding app
    │   ├── css/
    │   │   ├── style.css       - Global stylesheet
    │   ├── img/                - Images directory
    │   ├── js/
    │   │   ├── app.js          - AngularJS main module
    │   │   ├── controllers.js  - AngularJS controllers module
    │   │   ├── serivces.js     - AngularJS services module
    │   ├── lib/                - Project dependencies, managed by bower
    │   ├── templates/          - AngularJS template files
    │   ├── index.html          - Main app entry point
    ├── bower.json              - Front-end dependencies, managed by bower
    ├── config.xml              - Cordova global configuration file
    ├── gulpfile.js             - Gulp tasks
    ├── package.json            - Project dependencies, managed by npm
    ├── README.md               - Project's README file
    ├── .jshintrc               - Global JSHint configuration
    ├── .bowerrc                - Bower configuration file
    ├── .gitignore              - Commnly ignored files

## Workflow Commands

#### All platforms

### `gulp serve`

Desktop browser testing with live reload

#### iOS

### `gulp platform:ios`

Add iOS platform target with Cordova

### `gulp serve:ios`

Desktop browser testing with live reload

### `gulp build:ios`

Deploy app to iOS platform device

#### Android

### `gulp platform:android`

Add Android platform target with Cordova

### `gulp serve:android`

Desktop browser testing with live reload

### `gulp build:android`

Deploy app to Android platform device

### Community

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/bravocart/bravocart?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Further Reading

  * [API Documentation](http://docs.bravocart.io)
  * [Help Center](https://bravocart.zendesk.com/hc/en-us)
  * [Roadmap](https://github.com/bravocart/bravocart/wiki/Roadmap)

[npm-image]: https://badge.fury.io/js/bravocart.svg
[npm-url]: http://badge.fury.io/js/bravocart
[travis-image]: https://travis-ci.org/bravocart/bravocart.svg?branch=master
[travis-url]: https://travis-ci.org/bravocart/bravocart
[yeoman-demo]: http://bravocart.io/images/yeoman-bravocart.gif
