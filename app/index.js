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
      message: 'What is the name of your your project (no space allowed)?',
      default: 'bravoshop',
      store   : true
    }, {
      type: 'input',
      name: 'apiKey',
      message: 'What is your API key (found at https://bravocart.io/settings)?',
      store   : true
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
        this.templatePath('**/+(index.html|app.js|controllers.js|services.js|package.json|config.xml)'),
        this.destinationPath(),
        this.props
      );
    },
    files: function() {
      this.fs.copy(
        this.templatePath('**/!(index.html|app.js|controllers.js|services.js|package.json|config.xml)'),
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
    this.spawnCommand('ionic', ['serve']);
  }

});
