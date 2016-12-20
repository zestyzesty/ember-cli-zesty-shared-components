import Ember from 'ember';
import FreestyleController from 'ember-freestyle/controllers/freestyle';
import moment from 'moment';
import { task } from 'ember-concurrency';

const { inject } = Ember;

export default FreestyleController.extend({
  emberFreestyle: inject.service(),

  date: moment("2016-10-30T10:30"),
  interprettedDate: moment("2016-10-30T10:30"),
  updateDate: task(function*(date) {
    yield this.set('interprettedDate', date);
  }),

  statusFilterEntries: [
    Ember.Object.create({ status: 'new' }),
    Ember.Object.create({ status: 'new' }),
    Ember.Object.create({ status: 'saved' })
  ],

  colorPalette: {
    'primary': {
      'name': 'zesty-green',
      'base': '#becc29'
    },
    'accent': {
      'name': 'zesty-black',
      'base': '#393d3d'
    },
    'secondary': {
      'name': 'zesty-gray',
      'base': '#8c8e90'
    },
    'foreground': {
      'name': 'zesty-fog',
      'base': '#efefef'
    },
    'background': {
      'name': 'white',
      'base': '#ffffff'
    }
  }
});
