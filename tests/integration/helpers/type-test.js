import { find } from '@ember/test-helpers';
import { expect } from "chai";
import { describe, it } from "mocha";
import { setupComponentTest } from "ember-mocha";
import hbs from "htmlbars-inline-precompile";
import { initialize } from 'dummy/initializers/microstates';

describe("Integration | Helper | type", function() {
  setupComponentTest("type", {
    integration: true
  });

  it("looks up Any", async function() {
    initialize(this);

    this.render(
      hbs`{{if (eq (type "any") (import "microstates?Any")) "true" "false"}}`
    );

    expect(
      find('*').textContent
        .trim()
    ).to.equal("true");
  });

  it("looks up BooleanType", async function() {
    initialize(this);

    this.render(
      hbs`{{if (eq (type "boolean") (import "microstates?BooleanType")) "true" "false"}}`
    );

    expect(
      find('*').textContent
        .trim()
    ).to.equal("true");
  });

  it("looks up StringType", async function() {
    initialize(this);

    this.render(
      hbs`{{if (eq (type "string") (import "microstates?StringType")) "true" "false"}}`
    );

    expect(
      find('*').textContent
        .trim()
    ).to.equal("true");
  });

  it("looks up NumberType", async function() {
    initialize(this);

    this.render(
      hbs`{{if (eq (type "number") (import "microstates?NumberType")) "true" "false"}}`
    );

    expect(
      find('*').textContent
        .trim()
    ).to.equal("true");
  });

  it("looks up ArrayType", async function() {
    initialize(this);

    this.render(
      hbs`{{if (eq (type "array") (import "microstates?ArrayType")) "true" "false"}}`
    );

    expect(
      find('*').textContent
        .trim()
    ).to.equal("true");
  });

  it("looks up ObjectType", async function() {
    initialize(this);

    this.render(
      hbs`{{if (eq (type "object") (import "microstates?ObjectType")) "true" "false"}}`
    );

    expect(
      find('*').textContent
        .trim()
    ).to.equal("true");
  });

  it("looks up Person from app", async function() {
    initialize(this);

    this.render(
      hbs`{{if (eq (type "person") (import "dummy/types/person")) "true" "false"}}`
    );

    expect(
      find('*').textContent
        .trim()
    ).to.equal("true");
  });

  it('throws an exception for unregistered type', async function() {
    initialize(this);

    expect(() => {
      this.render(
        hbs`{{type "car"}}`
      );
    }).to.throw(/\(type "car"\) could not be looked up/)
  });
});
