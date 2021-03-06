import components from './components';
import appRouter from './app.router';
import './css/main.less';
import style from './app.less';
import angular from 'angular';
import ngRoute from 'angular-route';

let appComponent = {
  restrict: 'E',
  template: require('./app.html'),
  controller: function() {
    this.class = style;
    this.url = 'softlucky.com';
  },
  controllerAs: 'app'
};

export default angular.module('myApp', [ngRoute, components, 'hello'])
  .config(appRouter)
  .component('app', appComponent)
  .name;
angular.module('hello', []);
