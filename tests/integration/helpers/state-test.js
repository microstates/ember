import { create } from "@microstates/ember";
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find, findAll } from "@ember/test-helpers";
import { hbs } from 'ember-cli-htmlbars';

module("Integration | Helper | state", function(hooks) {
  setupRenderingTest(hooks);

  test("renders", async function(assert) {
    await render(hbs`
      {{#let (state) as |$|}}
        {{$.state}}
      {{/let}}
    `);

    assert.equal(find('*').textContent.trim(), "");
  });

  test("allows value to be set", async function(assert) {
    await render(hbs`
      {{#let (state) as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.set "hello world"}} />
      {{/let}}
    `);

    assert.equal(find("span").textContent, "");

    await click(find("button"));

    assert.equal(find("span").textContent, "hello world");
  });

  test("allows to create a Microstate<Number> from a microstate", async function(assert) {
    this.set("microstate", create(Number, 42));

    await render(hbs`
      {{#let (state microstate) as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.increment}} />
      {{/let}}
    `);

    assert.equal(find("span").textContent, "42");

    await click(find("button"));

    assert.equal(find("span").textContent, "43");
  });

  test("allows to create a Microstate<Number> from value", async function(assert) {
    await render(hbs`
      {{#let (state 42) as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.increment}} />
      {{/let}}
    `);

    assert.equal(find("span").textContent, "42");

    await click(find("button"));

    assert.equal(find("span").textContent, "43");
  });

  test('allows to create a Microstate<Number> using (type "number")', async function(assert) {
    await render(hbs`
      {{#let (state (type "number") 42) as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.increment}} />
      {{/let}}
    `);

    assert.equal(find('span').textContent, '42');

    await click(find('button'));

    assert.equal(find('span').textContent, '43');
  });

  test("allows to create a Microstate<Boolean> from value", async function(assert) {
    await render(hbs`
      {{#let (state true) as |$|}}
        <span>{{if $.state 'true' 'false'}}</span>
        <button {{action $.toggle}} />
      {{/let}}
    `);

    assert.equal(find("span").textContent, "true");

    await click(find("button"));

    assert.equal(find("span").textContent, "false");
  });

  test('allows to create a Microstate<Boolean> using (type "boolean")', async function(assert) {
    await render(hbs`
      {{#let (state (type "boolean") true) as |$|}}
        <span>{{if $.state 'true' 'false'}}</span>
        <button {{action $.toggle}} />
      {{/let}}
    `);

    assert.equal(find('span').textContent, 'true');

    await click(find('button'));

    assert.equal(find('span').textContent, 'false');
  });

  test("allows to create a Microstate<Boolean> from a microstate", async function(assert) {
    this.set("microstate", create(Boolean, true));
    await render(hbs`
      {{#let (state microstate) as |$|}}
        <span>{{if $.state 'true' 'false'}}</span>
        <button {{action $.toggle}} />
      {{/let}}
    `);

    assert.equal(find("span").textContent, "true");

    await click(find("button"));

    assert.equal(find("span").textContent, "false");
  });

  test("allows to create a Microstate<String> from value", async function(assert) {
    await render(hbs`
      {{#let (state 'hello world') as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.concat '!!!'}} />
      {{/let}}
    `);

    assert.equal(find("span").textContent, "hello world");

    await click(find("button"));

    assert.equal(find("span").textContent, "hello world!!!");
  });

  test("allows to create a Microstate<String> from a microstate", async function(assert) {
    this.set("microstate", create(String, "hello world"));

    await render(hbs`
      {{#let (state microstate) as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.concat '!!!'}} />
      {{/let}}
    `);

    assert.equal(find("span").textContent, "hello world");

    await click(find("button"));

    assert.equal(find("span").textContent, "hello world!!!");
  });

  test('allows to create a Microstate<String> using (type "string")', async function(assert) {
    await render(hbs`
      {{#let (state (type "string") 'hello world') as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.concat '!!!'}} />
      {{/let}}
    `);

    assert.equal(find('span').textContent, 'hello world');

    await click(find('button'));

    assert.equal(find('span').textContent, 'hello world!!!');
  });

  test("allows to create a Microstate<Object> from value", async function(assert) {
    this.set("obj", { dog: "Santa's Little Helper", cat: "Snowball" });

    await render(hbs`
      {{#let (state obj) as |$|}}
        <ul>
          {{#each $ as |entry|}}
            <li>{{entry.key}}: {{entry.value.state}}</li>
          {{/each}}
        </ul>
        <button {{action $.put 'second cat' 'Snowball II'}} />
      {{/let}}
    `);

    assert.equal(find('li').textContent, "dog: Santa's Little Helper");
    assert.equal(find(findAll('li')[1]).textContent, "cat: Snowball");

    await click(find("button"));

    assert.equal(find(findAll('li')[2]).textContent, "second cat: Snowball II");
  });

  test("allows to create a Microstate<Object> from a microstate", async function(assert) {
    this.set(
      "microstate",
      create(Object, { dog: "Santa's Little Helper", cat: "Snowball" })
    );

    await render(hbs`
      {{#let (state microstate) as |$|}}
        <ul>
          {{#each $ as |entry|}}
            <li>{{entry.key}}: {{entry.value.state}}</li>
          {{/each}}
        </ul>
        <button {{action $.put 'second cat' 'Snowball II'}} />
      {{/let}}
    `);

    assert.equal(find('li').textContent, "dog: Santa's Little Helper");
    assert.equal(find(findAll('li')[1]).textContent, "cat: Snowball");

    await click(find("button"));

    assert.equal(find(findAll('li')[2]).textContent, "second cat: Snowball II");
  });

  test('allows to create a Microstate<Object> using (type "object")', async function(assert) {
    this.set('obj', { dog: 'Santa\'s Little Helper', cat: 'Snowball' })
    await render(hbs`
      {{#let (state (type "object") obj) as |$|}}
        <ul>
          {{#each $ as |entry|}}
            <li>{{entry.key}}: {{entry.value.state}}</li>
          {{/each}}
        </ul>
        <button {{action $.put 'second cat' 'Snowball II'}} />
      {{/let}}
    `);

    assert.equal(find('li').textContent, 'dog: Santa\'s Little Helper');
    assert.equal(find(findAll('li')[1]).textContent, 'cat: Snowball');

    await click(find('button'));

    assert.equal(find(findAll('li')[2]).textContent, 'second cat: Snowball II');
  });

  test("allows to create an Microstate<Array> from value", async function(assert) {
    this.set("pets", ["dog", "cat", "bird"]);

    await render(hbs`
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

    assert.equal(find('li').textContent, "dog");
    assert.equal(find(findAll('li')[1]).textContent, "cat");
    assert.equal(find(findAll('li')[2]).textContent, "bird");

    await click(find("button"));

    assert.equal(find(findAll('li')[3]).textContent, "fish");
  });

  test('allows to create a Microstate<Array> from a microstate', async function(assert) {
    this.set('microstate', create(Array, ['dog', 'cat', 'bird']));

    await render(hbs`
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

    assert.equal(find('li').textContent, 'dog');
    assert.equal(find(findAll('li')[1]).textContent, 'cat');
    assert.equal(find(findAll('li')[2]).textContent, 'bird');

    await click(find('button'));

    assert.equal(find(findAll('li')[3]).textContent, 'fish');
  });

  test('allows to create a Microstate<Array> using (type "array")', async function(assert) {
    this.set('pets', ['dog', 'cat', 'bird']);

    await render(hbs`
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

    assert.equal(find('li').textContent, 'dog');
    assert.equal(find(findAll('li')[1]).textContent, 'cat');
    assert.equal(find(findAll('li')[2]).textContent, 'bird');

    await click(find('button'));

    assert.equal(find(findAll('li')[3]).textContent, 'fish');
  });

  test('allows to create a Microstate<Person> using (type "person")', async function(assert) {
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

    await render(hbs`
      {{#let (state Person value) as |$|}}
        <span>{{$.fullName}}</span>
        <button {{action $.firstName.set 'Homer J'}} />
      {{/let}}
    `);

    assert.equal(find('span').textContent, 'Homer Simpson');

    await click(find('button'));

    assert.equal(find('span').textContent, 'Homer J Simpson');
  });
});
