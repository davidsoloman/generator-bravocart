'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var path = require('path');

module.exports = yeoman.Base.extend({
  prompting: function() {
    var done = this.async();
    this.log(yosay(
      'Yo, let\'s build an ...' + chalk.red('\nawesome Bravocart shop!! ')
    ));
    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the name of your your project?',
      default: 'bravoshop',
      store   : true
    }, {
      type: 'input',
      name: 'apiKey',
      message: 'What is your API key (found at https://bravocart.io/settings)?',
      store   : true
    }, {
      type: 'list',
      name: 'currency',
      message: 'In which currency you want to display prices?',
      choices: ['USD', 'EUR', 'GBP', 'JPY', 'BTC'],
      store: true
    }];
    this.prompt(prompts, function (props) {
      this.destinationRoot(props.name);
      this.props = props;
      this.config.save();
      done();
    }.bind(this));
  },

  writing: {
    templates: function() {
      this.fs.copyTpl(
        this.templatePath('**/+(index.html|app.js|package.json)'),
        this.destinationPath(),
        this.props
      );
    },
    files: function() {
      this.fs.copy(
        this.templatePath('**/!(index.html|app.js|package.json)'),
        this.destinationPath()
      );
    },
    dotfiles: function() {
      this.fs.copy(
        this.templatePath('**/.*'),
        this.destinationPath()
      );
    }
  },

  install: function () {
    this.config.save();
    this.installDependencies();
  },

  end: function() {
    this.spawnCommand('gulp', ['serve']);
  }

});
