'use strict';
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const shelljs = require('shelljs');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.gitInfo = {
      name: shelljs.exec('git config user.name', {silent: true}).output.replace(/\n/g, '') || 'Me',
      email: shelljs.exec('git config user.email', {silent: true}).output.replace(/\n/g, '') || 'me@example.net',
      github: shelljs.exec('git config github.user', {silent: true}).output.replace(/\n/g, '') || process.env.USER,
    };

    this.log(yosay(
      'Welcome to the ' + chalk.red('Bono 1.0') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'package',
      message: 'Package name?',
      default: this.gitInfo.github + '/' + this.appname
    }, {
      type: 'input',
      name: 'author',
      message: 'Author?',
      default: this.gitInfo.name + ' <' + this.gitInfo.email + '>'
    }, {
      type: 'input',
      name: 'license',
      message: 'License?',
      default: 'MIT'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.name = this.appname;

      var exploded = this.props.author.match(/([^<]+)<([^>]+)>/);
      this.props.authorName = (exploded[1] || '').trim();
      this.props.authorEmail = (exploded[2] || '').trim();

      done();
    }.bind(this));
  },

  writing: function () {
    this.log('Copying files...');
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationPath(),
      this.props
    );
  },

  install: function () {
    // this.log('Installing build tools...');
    // this.npmInstall([], {}, function() {
      this.log('Installing composer dependencies...');
      var cmd = this.spawnCommand('composer', ['update']);
      cmd.on('close', function() {
        this.log('To use gulp + php cli to serve');
        this.log('  npm install');
        this.log('  gulp');
        this.log('');
        this.log('Happy coding :)');
      }.bind(this));
    // }.bind(this));
  },
});
