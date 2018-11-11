import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { click } from '@ember/test-helpers';

describe('Integration | Helper | use-type', function() {
  setupComponentTest('use-type', {
    integration: true
  });

  it('renders', function() {
    this.render(hbs`
    {{#let (use-type) as |$|}}
      {{$.state}}
    {{/let}}
  `);

    expect(this.$().text().trim()).to.equal('');
  });

  it('allows value to be set', async function() {
    this.render(hbs`
      {{#let (use-type) as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.set "hello world"}} />
      {{/let}}
    `);

    expect(this.$('span').text()).to.equal('');

    await click(this.$('button')[0]);

    expect(this.$('span').text()).to.equal('hello world');
  });

  it('allows to create a Number type using ember-import from ember-microstates/types/number', async function() {
    this.render(hbs`
      {{#let (use-type (import 'ember-microstates/types/number') 42) as |$|}}
        {{log (import 'microstates?NumberType')}}
        <span>{{$.state}}</span>
        <button {{action $.increment}} />
      {{/let}}
    `);

    expect(this.$('span').text()).to.equal('42');

    await click(this.$('button')[0]);

    expect(this.$('span').text()).to.equal('43');
  });

  it('allows person to be created from custom type', async function() {
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
      {{#let (use-type Person value) as |$|}}
        <span>{{$.fullName}}</span>
        <button {{action $.firstName.set 'Homer J'}} />
      {{/let}}
    `);

    expect(this.$('span').text()).to.equal('Homer Simpson');

    await click(this.$('button')[0]);

    expect(this.$('span').text()).to.equal('Homer J Simpson');
  });
});

