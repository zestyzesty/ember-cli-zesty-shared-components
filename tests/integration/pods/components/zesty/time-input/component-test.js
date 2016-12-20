import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('zesty/time-input', 'Integration | Component | zesty/time-input', {
  integration: true
});

test('can update a moment date', async function(assert) {
  assert.expect(3);

  this.set('date', moment("2016-11-03T10:30"));
  this.set('updateDate', (date) => {
    assert.equal(moment.isMoment(date), true, "sends up a moment object");
    assert.equal(moment("2016-11-03T10:45").isSame(date), true, "has the same date");
  });

  await this.render(hbs`
    {{zesty/time-input
    value=date
    action=(action updateDate)
    entries=entries
    property="status"
    format="h.mm a"
    }}
  `);

  assert.equal(this.$("input").val(), "10.30 am");

  this.$("input").val("10.45 am");
  await this.$("input").blur();
});

test('can update a js date', async function(assert) {
  assert.expect(3);

  this.set('date', new Date(2016, 10, 3, 10, 30));
  this.set('updateDate', (date) => {
    assert.equal(moment.isDate(date), true, "sends up a moment object");
    assert.equal(moment("2016-11-03T10:45").isSame(moment(date)), true, "has the same date");
  });

  await this.render(hbs`
    {{zesty/time-input
    value=date
    action=(action updateDate)
    entries=entries
    property="status"
    format="h.mm a"
    }}
  `);

  assert.equal(this.$("input").val(), "10.30 am");

  this.$("input").val("10.45 am");
  await this.$("input").blur();
});
