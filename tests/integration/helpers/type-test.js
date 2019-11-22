import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from "@ember/test-helpers";
import { hbs } from 'ember-cli-htmlbars';
import { initialize } from 'dummy/initializers/microstates';

module("Integration | Helper | type", function(hooks) {
  setupRenderingTest(hooks);

  test("looks up Any", async function(assert) {
    initialize(this.owner);

    await render(
      hbs`{{if (eq (type "any") (import "microstates?Any")) "true" "false"}}`
    );

    assert.equal(find('*').textContent.trim(), "true");
  });

  test("looks up BooleanType", async function(assert) {
    initialize(this.owner);

    await render(
      hbs`{{if (eq (type "boolean") (import "microstates?BooleanType")) "true" "false"}}`
    );

    assert.equal(find('*').textContent.trim(), "true");
  });

  test("looks up StringType", async function(assert) {
    initialize(this.owner);

    await render(
      hbs`{{if (eq (type "string") (import "microstates?StringType")) "true" "false"}}`
    );

    assert.equal(find('*').textContent.trim(), "true");
  });

  test("looks up NumberType", async function(assert) {
    initialize(this.owner);

    await render(
      hbs`{{if (eq (type "number") (import "microstates?NumberType")) "true" "false"}}`
    );

    assert.equal(find('*').textContent.trim(), "true");
  });

  test("looks up ArrayType", async function(assert) {
    initialize(this.owner);

    await render(
      hbs`{{if (eq (type "array") (import "microstates?ArrayType")) "true" "false"}}`
    );

    assert.equal(find('*').textContent.trim(), "true");
  });

  test("looks up ObjectType", async function(assert) {
    initialize(this.owner);

    await render(
      hbs`{{if (eq (type "object") (import "microstates?ObjectType")) "true" "false"}}`
    );

    assert.equal(find('*').textContent.trim(), "true");
  });

  test("looks up Person from app", async function(assert) {
    initialize(this.owner);

    await render(
      hbs`{{if (eq (type "person") (import "dummy/types/person")) "true" "false"}}`
    );

    assert.equal(find('*').textContent.trim(), "true");
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
