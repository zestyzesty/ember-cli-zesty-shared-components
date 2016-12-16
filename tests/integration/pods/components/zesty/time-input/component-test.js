import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('zesty/time-input', 'Integration | Component | zesty/time-input', {
  integration: true
});

test('displays an input field', async function(assert) {
  await this.render(hbs`
    {{zesty/time-input
    entries=entries
    property="status"}}
  `);

  assert.equal(this.$("input").length, 1);
});
