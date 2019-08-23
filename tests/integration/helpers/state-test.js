import { expect } from "chai";
import { describe, it } from "mocha";
import { setupComponentTest } from "ember-mocha";
import hbs from "htmlbars-inline-precompile";
import { click, find, findAll } from "@ember/test-helpers";
import { create } from "@microstates/ember";

describe("Integration | Helper | state", function() {
  setupComponentTest("state", {
    integration: true
  });

  it("renders", function() {
    this.render(hbs`
    {{#let (state) as |$|}}
      {{$.state}}
    {{/let}}
  `);

    expect(
      find('*').textContent
        .trim()
    ).to.equal("");
  });

  it("allows value to be set", async function() {
    this.render(hbs`
      {{#let (state) as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.set "hello world"}} />
      {{/let}}
    `);

    expect(find("span").textContent).to.equal("");

    await click(this.$("button")[0]);

    expect(find("span").textContent).to.equal("hello world");
  });

  it("allows to create a Microstate<Number> from a microstate", async function() {
    this.set("microstate", create(Number, 42));

    this.render(hbs`
      {{#let (state microstate) as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.increment}} />
      {{/let}}
    `);

    expect(find("span").textContent).to.equal("42");

    await click(this.$("button")[0]);

    expect(find("span").textContent).to.equal("43");
  });

  it("allows to create a Microstate<Number> from value", async function() {
    this.render(hbs`
      {{#let (state 42) as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.increment}} />
      {{/let}}
    `);

    expect(find("span").textContent).to.equal("42");

    await click(this.$("button")[0]);

    expect(find("span").textContent).to.equal("43");
  });

  it('allows to create a Microstate<Number> using (type "number")', async function() {
    this.render(hbs`
      {{#let (state (type "number") 42) as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.increment}} />
      {{/let}}
    `);

    expect(find('span').textContent).to.equal('42');

    await click(this.$('button')[0]);

    expect(find('span').textContent).to.equal('43');
  });

  it("allows to create a Microstate<Boolean> from value", async function() {
    this.render(hbs`
      {{#let (state true) as |$|}}
        <span>{{if $.state 'true' 'false'}}</span>
        <button {{action $.toggle}} />
      {{/let}}
    `);

    expect(find("span").textContent).to.equal("true");

    await click(this.$("button")[0]);

    expect(find("span").textContent).to.equal("false");
  });

  it('allows to create a Microstate<Boolean> using (type "boolean")', async function() {
    this.render(hbs`
      {{#let (state (type "boolean") true) as |$|}}
        <span>{{if $.state 'true' 'false'}}</span>
        <button {{action $.toggle}} />
      {{/let}}
    `);

    expect(find('span').textContent).to.equal('true');

    await click(this.$('button')[0]);

    expect(find('span').textContent).to.equal('false');
  });

  it("allows to create a Microstate<Boolean> from a microstate", async function() {
    this.set("microstate", create(Boolean, true));
    this.render(hbs`
      {{#let (state microstate) as |$|}}
        <span>{{if $.state 'true' 'false'}}</span>
        <button {{action $.toggle}} />
      {{/let}}
    `);

    expect(find("span").textContent).to.equal("true");

    await click(this.$("button")[0]);

    expect(find("span").textContent).to.equal("false");
  });

  it("allows to create a Microstate<String> from value", async function() {
    this.render(hbs`
      {{#let (state 'hello world') as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.concat '!!!'}} />
      {{/let}}
    `);

    expect(find("span").textContent).to.equal("hello world");

    await click(this.$("button")[0]);

    expect(find("span").textContent).to.equal("hello world!!!");
  });

  it("allows to create a Microstate<String> from a microstate", async function() {
    this.set("microstate", create(String, "hello world"));

    this.render(hbs`
      {{#let (state microstate) as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.concat '!!!'}} />
      {{/let}}
    `);

    expect(find("span").textContent).to.equal("hello world");

    await click(this.$("button")[0]);

    expect(find("span").textContent).to.equal("hello world!!!");
  });

  it('allows to create a Microstate<String> using (type "string")', async function() {
    this.render(hbs`
      {{#let (state (type "string") 'hello world') as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.concat '!!!'}} />
      {{/let}}
    `);

    expect(find('span').textContent).to.equal('hello world');

    await click(this.$('button')[0]);

    expect(find('span').textContent).to.equal('hello world!!!');
  });

  it("allows to create a Microstate<Object> from value", async function() {
    this.set("obj", { dog: "Santa's Little Helper", cat: "Snowball" });

    this.render(hbs`
      {{#let (state obj) as |$|}}
        <ul>
          {{#each $ as |entry|}}
            <li>{{entry.key}}: {{entry.value.state}}</li>
          {{/each}}
        </ul>
        <button {{action $.put 'second cat' 'Snowball II'}} />
      {{/let}}
    `);

    expect(find('li').textContent).to.equal("dog: Santa's Little Helper");
    expect(find(findAll('li')[1]).textContent).to.equal("cat: Snowball");

    await click(this.$("button")[0]);

    expect(find(findAll('li')[2]).textContent).to.equal("second cat: Snowball II");
  });

  it("allows to create a Microstate<Object> from a microstate", async function() {
    this.set(
      "microstate",
      create(Object, { dog: "Santa's Little Helper", cat: "Snowball" })
    );

    this.render(hbs`
      {{#let (state microstate) as |$|}}
        <ul>
          {{#each $ as |entry|}}
            <li>{{entry.key}}: {{entry.value.state}}</li>
          {{/each}}
        </ul>
        <button {{action $.put 'second cat' 'Snowball II'}} />
      {{/let}}
    `);

    expect(find('li').textContent).to.equal("dog: Santa's Little Helper");
    expect(find(findAll('li')[1]).textContent).to.equal("cat: Snowball");

    await click(this.$("button")[0]);

    expect(find(findAll('li')[2]).textContent).to.equal("second cat: Snowball II");
  });

  it('allows to create a Microstate<Object> using (type "object")', async function() {
    this.set('obj', { dog: 'Santa\'s Little Helper', cat: 'Snowball' })
    this.render(hbs`
      {{#let (state (type "object") obj) as |$|}}
        <ul>
          {{#each $ as |entry|}}
            <li>{{entry.key}}: {{entry.value.state}}</li>
          {{/each}}
        </ul>
        <button {{action $.put 'second cat' 'Snowball II'}} />
      {{/let}}
    `);

    expect(find('li').textContent).to.equal('dog: Santa\'s Little Helper');
    expect(find(findAll('li')[1]).textContent).to.equal('cat: Snowball');

    await click(this.$('button')[0]);

    expect(find(findAll('li')[2]).textContent).to.equal('second cat: Snowball II');
  });

  it("allows to create an Microstate<Array> from value", async function() {
    this.set("pets", ["dog", "cat", "bird"]);

    this.render(hbs`
      {{#let (state pets) as |$|}}
        <ul>
          {{#each $ as |pet|}}
            <li>{{pet.state}}</li>
          {{/each}}
        </ul>
        <span>{{$.state}}</span>
        <button {{action $.push 'fish'}} />
      {{/let}}
    `);

    expect(find('li').textContent).to.equal("dog");
    expect(find(findAll('li')[1]).textContent).to.equal("cat");
    expect(find(findAll('li')[2]).textContent).to.equal("bird");

    await click(this.$("button")[0]);

    expect(find(findAll('li')[3]).textContent).to.equal("fish");
  });

  it('allows to create a Microstate<Array> from a microstate', async function() {
    this.set('microstate', create(Array, ['dog', 'cat', 'bird']));

    this.render(hbs`
      {{#let (state microstate) as |$|}}
        <ul>
          {{#each $ as |pet|}}
            <li>{{pet.state}}</li>
          {{/each}}
        </ul>
        <span>{{$.state}}</span>
        <button {{action $.push 'fish'}} />
      {{/let}}
    `);

    expect(find('li').textContent).to.equal('dog');
    expect(find(findAll('li')[1]).textContent).to.equal('cat');
    expect(find(findAll('li')[2]).textContent).to.equal('bird');

    await click(this.$('button')[0]);

    expect(find(findAll('li')[3]).textContent).to.equal('fish');
  });

  it('allows to create a Microstate<Array> using (type "array")', async function() {
    this.set('pets', ['dog', 'cat', 'bird']);

    this.render(hbs`
      {{#let (state (type "array") pets) as |$|}}
        <ul>
          {{#each $ as |pet|}}
            <li>{{pet.state}}</li>
          {{/each}}
        </ul>
        <span>{{$.state}}</span>
        <button {{action $.push 'fish'}} />
      {{/let}}
    `);

    expect(find('li').textContent).to.equal('dog');
    expect(find(findAll('li')[1]).textContent).to.equal('cat');
    expect(find(findAll('li')[2]).textContent).to.equal('bird');

    await click(this.$('button')[0]);

    expect(find(findAll('li')[3]).textContent).to.equal('fish');
  });

  it('allows to create a Microstate<Person> using (type "person")', async function() {
    class Person {
      constructor() {
        this.firstName = String;
        this.lastName = String;
      }

      get fullName() {
        return `${this.firstName.state} ${this.lastName.state}`;
      }
    }

    this.set('Person', Person);

    this.set('value', { firstName: 'Homer', lastName: 'Simpson'});

    this.render(hbs`
      {{#let (state Person value) as |$|}}
        <span>{{$.fullName}}</span>
        <button {{action $.firstName.set 'Homer J'}} />
      {{/let}}
    `);

    expect(find('span').textContent).to.equal('Homer Simpson');

    await click(this.$('button')[0]);

    expect(find('span').textContent).to.equal('Homer J Simpson');
  });
});
