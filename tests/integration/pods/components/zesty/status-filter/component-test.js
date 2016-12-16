import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import Ember from 'ember';

moduleForComponent('zesty/status-filter', 'Integration | Component | zesty/status filter', {
  integration: true
});

test('it filters by a property', async function(assert) {

  await this.set('entries', [
    Ember.Object.create({ status: 'new' }),
    Ember.Object.create({ status: 'new' }),
    Ember.Object.create({ status: 'saved' })
  ]);

  await this.render(hbs`
    {{#zesty/status-filter
    entries=entries
    property="status"
    as |filteredEntries currentFilter setFilter|}}
      <div data-test-current-filter>{{currentFilter}}</div>

      <button onclick={{perform setFilter ""}} data-test-set-filter-all>All entries</button>
      <button onclick={{perform setFilter "new"}} data-test-set-filter-new>New entries</button>
      <button onclick={{perform setFilter "saved"}} data-test-set-filter-saved>Saved entries</button>

      {{#each filteredEntries as |entry|}}
        <div data-test-filtered-entry>Hello, I'm Shelley Duvall</div>
      {{/each}}
    {{/zesty/status-filter}}
  `);

  assert.equal(this.$("[data-test-current-filter]").text().trim(), "");
  assert.equal(this.$("[data-test-filtered-entry]").length, 3);

  await this.$("[data-test-set-filter-new]").click();
  assert.equal(this.$("[data-test-current-filter]").text().trim(), "new");
  assert.equal(this.$("[data-test-filtered-entry]").length, 2);

  await this.$("[data-test-set-filter-saved]").click();
  assert.equal(this.$("[data-test-current-filter]").text().trim(), "saved");
  assert.equal(this.$("[data-test-filtered-entry]").length, 1);

  await this.$("[data-test-set-filter-all]").click();
  assert.equal(this.$("[data-test-current-filter]").text().trim(), "");
  assert.equal(this.$("[data-test-filtered-entry]").length, 3);
});
