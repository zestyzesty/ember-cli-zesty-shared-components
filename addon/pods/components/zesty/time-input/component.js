import Ember from 'ember';
import layout from './template';
import moment from 'moment';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  layout,

  classNames: ['time-input'],
  classNameBindings: ['invalid'],

  format: 'hhmm',
  invalid: false,

  inputIsNativeDate: Ember.computed('value', function() {
    return this.get('value') instanceof Date;
  }),

  momentDate: Ember.computed('value', function() {
    if (this.get('value')) {
      return moment(this.get('value'));
    }
  }),

  userInput: null,
  valueString: Ember.computed('momentDate', 'format', 'userInput', function() {
    if (this.get('userInput') !== null) {
      return this.get('userInput')
    }

    var date = this.get('momentDate');
    return date ? date.format(this.get('format')) : '';
  }),

  valueChanged: task(function*(valueString) {
    this.set('userInput', valueString);
    var parsed = moment(valueString, this.get('format'));
    this.set('invalid', !parsed.isValid());
    if (!parsed.isValid()) {
      return;
    }

    var oldDate = this.get('momentDate');
    var newDate = oldDate ? oldDate.clone() : moment();
    newDate.hours(parsed.hours());
    newDate.minutes(parsed.minutes());

    if (this.get('inputIsNativeDate')) {
      newDate = newDate.toDate();
    }

    this.set('value', newDate);
    yield this.sendAction('action', newDate);
  }),
});
