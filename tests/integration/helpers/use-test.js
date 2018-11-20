import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { click } from '@ember/test-helpers';
import { create } from 'ember-microstates';

describe('Integration | Helper | use', function() {
  setupComponentTest('use', {
    integration: true
  });

  it('renders', function() {
    this.render(hbs`
      {{#let (use) as |$|}}
        {{$.state}}
      {{/let}}
    `);

    expect(this.$().text().trim()).to.equal('');
  });

  it('allows value to be set', async function() {
    this.render(hbs`
      {{#let (use) as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.set "hello world"}} />
      {{/let}}
    `);

    expect(this.$('span').text()).to.equal('');

    await click(this.$('button')[0]);

    expect(this.$('span').text()).to.equal('hello world');
  });

  it('allows to create a Microstate<Number>', async function() {
    this.set('microstate', create(Number, 42));

    this.render(hbs`
      {{#let (use microstate) as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.increment}} />
      {{/let}}
    `);

    expect(this.$('span').text()).to.equal('42');

    await click(this.$('button')[0]);

    expect(this.$('span').text()).to.equal('43');
  });

  it('allows to create a Microstate<Boolean>', async function() {
    this.set('microstate', create(Boolean, true));
    this.render(hbs`
      {{#let (use microstate) as |$|}}
        <span>{{if $.state 'true' 'false'}}</span>
        <button {{action $.toggle}} />
      {{/let}}
    `);

    expect(this.$('span').text()).to.equal('true');

    await click(this.$('button')[0]);

    expect(this.$('span').text()).to.equal('false');
  });

  it('allows to create a Microstate<String>', async function() {
    this.set('microstate', create(String, 'hello world'));

    this.render(hbs`
      {{#let (use microstate) as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.concat '!!!'}} />
      {{/let}}
    `);

    expect(this.$('span').text()).to.equal('hello world');

    await click(this.$('button')[0]);

    expect(this.$('span').text()).to.equal('hello world!!!');
  });

  it('allows to create a Microstate<Object>', async function() {
    this.set('microstate', create(Object, { dog: 'Santa\'s Little Helper', cat: 'Snowball' }));
    
    this.render(hbs`
      {{#let (use microstate) as |$|}}
        <ul>
          {{#each $ as |entry|}}
            <li>{{entry.key}}: {{entry.value.state}}</li>
          {{/each}}
        </ul>
        <button {{action $.put 'second cat' 'Snowball II'}} />
      {{/let}}
    `);

    expect(this.$('li:eq(0)').text()).to.equal('dog: Santa\'s Little Helper');
    expect(this.$('li:eq(1)').text()).to.equal('cat: Snowball');

    await click(this.$('button')[0]);

    expect(this.$('li:eq(2)').text()).to.equal('second cat: Snowball II');
  });

  it('allows to create a Microstate<Array>', async function() {
    this.set('microstate', create(Array, ['dog', 'cat', 'bird']));

    this.render(hbs`
      {{#let (use microstate) as |$|}}
        <ul>
          {{#each $ as |pet|}}
            <li>{{pet.state}}</li>
          {{/each}}
        </ul>
        <span>{{$.state}}</span>
        <button {{action $.push 'fish'}} />
      {{/let}}
    `);

    expect(this.$('li:eq(0)').text()).to.equal('dog');
    expect(this.$('li:eq(1)').text()).to.equal('cat');
    expect(this.$('li:eq(2)').text()).to.equal('bird');

    await click(this.$('button')[0]);

    expect(this.$('li:eq(3)').text()).to.equal('fish');
  });

  it('allows to create a Microstate<Person>', async function() {
    class Person {
      constructor() {
        this.firstName = String;
        this.lastName = String;
      }

      get fullName() {
        return `${this.firstName.state} ${this.lastName.state}`;
      }
    }

    this.set('microstate', create(Person, { firstName: 'Homer', lastName: 'Simpson'}));

    this.render(hbs`
      {{#let (use microstate) as |$|}}
        <span>{{$.fullName}}</span>
        <button {{action $.firstName.set 'Homer J'}} />
      {{/let}}
    `);

    expect(this.$('span').text()).to.equal('Homer Simpson');

    await click(this.$('button')[0]);

    expect(this.$('span').text()).to.equal('Homer J Simpson');
  });
});

