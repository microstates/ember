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
      hbs`{{if (equals (type "any") (import "microstates/dist/microstates.cjs?Any")) "true" "false"}}`
    );

    expect(
      this.$()
        .text()
        .trim()
    ).to.equal("true");
  });

  it("looks up BooleanType", async function() {
    initialize(this);

    this.render(
      hbs`{{if (equals (type "boolean") (import "microstates/dist/microstates.cjs?BooleanType")) "true" "false"}}`
    );

    expect(
      this.$()
        .text()
        .trim()
    ).to.equal("true");
  });

  it("looks up StringType", async function() {
    initialize(this);

    this.render(
      hbs`{{if (equals (type "string") (import "microstates/dist/microstates.cjs?StringType")) "true" "false"}}`
    );

    expect(
      this.$()
        .text()
        .trim()
    ).to.equal("true");
  });

  it("looks up NumberType", async function() {
    initialize(this);

    this.render(
      hbs`{{if (equals (type "number") (import "microstates/dist/microstates.cjs?NumberType")) "true" "false"}}`
    );

    expect(
      this.$()
        .text()
        .trim()
    ).to.equal("true");
  });

  it("looks up ArrayType", async function() {
    initialize(this);

    this.render(
      hbs`{{if (equals (type "array") (import "microstates/dist/microstates.cjs?ArrayType")) "true" "false"}}`
    );

    expect(
      this.$()
        .text()
        .trim()
    ).to.equal("true");
  });

  it("looks up ObjectType", async function() {
    initialize(this);

    this.render(
      hbs`{{if (equals (type "object") (import "microstates/dist/microstates.cjs?ObjectType")) "true" "false"}}`
    );

    expect(
      this.$()
        .text()
        .trim()
    ).to.equal("true");
  });

  it("looks up Person from app", async function() {
    initialize(this);

    this.render(
      hbs`{{if (equals (type "person") (import "dummy/types/person")) "true" "false"}}`
    );

    expect(
      this.$()
        .text()
        .trim()
    ).to.equal("true");
  });

  it("allows to extend types", async function() {
    initialize(this);

    this.render(
      hbs`{{if (get (use-type (type "validated-number")) 'isValid') "true" "false"}}`
    );

    expect(
      this.$()
        .text()
        .trim()
    ).to.equal("true");
  });
});
