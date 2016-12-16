import Ember from 'ember';
import layout from './template';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  layout,

  /* arguments */
  entries: [],
  defaultFilter: "",
  property: "",

  /* state */
  currentFilter: null,

  /* properties */
  filteredEntries: Ember.computed('entries', 'currentFilter', 'property', function() {
    return this.get('entries').filter((entry) => {
      if (this.get('currentFilter')) {
        return this.get('currentFilter') === entry.get(this.get('property'));
      } else {
        return this.get('entries');
      }
    });
  }),

  /* init */
  didReceiveAttrs() {
    this._super(...arguments);
    if(!this.get('currentFilter')) {
      this.set('currentFilter', this.get('defaultFilter'));
    }
  },

  /* tasks */
  setFilter: task(function*(newValue) {
    yield this.set('currentFilter', newValue);
  })
});
