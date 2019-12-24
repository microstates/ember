import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from "@ember/test-helpers";
import { hbs } from 'ember-cli-htmlbars';
import { initialize } from 'dummy/initializers/microstates';

module("Integration | Helper | type", function(hooks) {
  setupRenderingTest(hooks);

  test("looks up Any", async function(assert) {
    initialize(this.owner);

    await render(hbs`
      <div id="inner">
        {{if (eq (type "any") (import "microstates?Any")) "true" "false"}}
      </div>
    `);

    assert.dom('#inner').hasText('true');
  });

  test("looks up BooleanType", async function(assert) {
    initialize(this.owner);

    await render(hbs`
      <div id="inner">
        {{if (eq (type "boolean") (import "microstates?BooleanType")) "true" "false"}}
      </div>
    `);

    assert.dom('#inner').hasText('true');
  });

  test("looks up StringType", async function(assert) {
    initialize(this.owner);

    await render(hbs`
      <div id="inner">
        {{if (eq (type "string") (import "microstates?StringType")) "true" "false"}}
      </div>
    `);

    assert.dom('#inner').hasText('true');
  });

  test("looks up NumberType", async function(assert) {
    initialize(this.owner);

    await render(hbs`
      <div id="inner">
        {{if (eq (type "number") (import "microstates?NumberType")) "true" "false"}}
      </div>
    `);

    assert.dom('#inner').hasText('true');
  });

  test("looks up ArrayType", async function(assert) {
    initialize(this.owner);

    await render(hbs`
      <div id="inner">
        {{if (eq (type "array") (import "microstates?ArrayType")) "true" "false"}}
      </div>
    `);

    assert.dom('#inner').hasText('true');
  });

  test("looks up ObjectType", async function(assert) {
    initialize(this.owner);

    await render(hbs`
      <div id="inner">
        {{if (eq (type "object") (import "microstates?ObjectType")) "true" "false"}}
      </div>
    `);

    assert.dom('#inner').hasText('true');
  });

  test("looks up Person from app", async function(assert) {
    initialize(this.owner);

    await render(hbs`
      <div id="inner">
        {{if (eq (type "person") (import "dummy/types/person")) "true" "false"}}
      </div>
    `);

    assert.dom('#inner').hasText('true');
  });

  // @see: https://github.com/emberjs/ember-test-helpers/issues/310
  skip('throws an exception for unregistered type', async function(assert) {
    initialize(this.owner);

    assert.throws(async () => {
      await render(
        hbs`{{type "car"}}`
      );
    }, /\(type "car"\) could not be looked up/)
  });
});
