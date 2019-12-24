# @microstates/ember

## [API Index](https://ember-microstates.netlify.com/api) [Live Demo](https://ember-microstates.netlify.com)

[![npm version](https://badge.fury.io/js/%40microstates%2Fember.svg)](https://badge.fury.io/js/%40microstates%2Fember)
[![Ember Observer Score](https://emberobserver.com/badges/-microstates-ember.svg)](https://emberobserver.com/addons/@microstates/ember)
[![Build Status](https://travis-ci.org/microstates/ember.svg?branch=master)](https://travis-ci.org/microstates/ember) [![Greenkeeper badge](https://badges.greenkeeper.io/microstates/ember.svg)](https://greenkeeper.io/) [![Chat on Discord](https://img.shields.io/discord/556202291586269214.svg)](http://bit.ly/microstates-discord)


* Ember.js v3.8 or above
* Ember CLI v2.13 or above
* Node.js v8 or above

## Why Microstates?

Short explanation, it's going to be the most fun you've had working with state in any framework.

Long explanation, components have values and actions that can be invoked to change these values. We call this state. 
To change the state of a component, you call an action that calls `this.set` to change the value. State and its
transitions become an inseperable part of the component. Microstates make component state seperable from the component. 
To learn what makes this seperation possible, checkout [How do Microstates work in Ember]()?

A Microstate is an object that is created from type and value. Type declares what states are created when a microstate is created
from this type and how these microstates can be transitioned. Seperating state from the component makes many difficult things easy and fun.

Here are some benefits,

* Unit testing state becomes trivially easy.
* Serializing and deserializing complex graphs of state is built in.
* Never have to use `this.set` or `this.get` in a Microstate.
* Never have to write actions.
* Write mostly template only components.
* Make state portable across apps and frameworks.

## What is a Microstate?

A microstate is an immmutable object that knows how to derive changed version of itself. 

Microstates comes with 6 built-in types: `Boolean`, `Number`, `String`, `Array`, `Object` and `Any`. All other types you create yourself by composing primitive types into data structures that reflect the needs of your UI. You can declare custom types by using ES6 class syntax.

```js
class Person {
  age = Number;
  name = String;
  isEmberiño = Boolean;
}
```

These custom types can be composed further to create complex graphs of state that match complexity of your component. Microstates handles lazily materializing complex data structures allowing you to represent complex one directional graphs without worrying about penality of materializing state that your component might not be using.

Microstates have simple rules:

1. Parents have access to their children
2. Children *do not* have access to their parents
3. Transitions are pure and immutable
4. Derived state can be safely cached

To learn more about Microstates, go to [microstates/microstate.js](http://github.com/microstates/microstates.js). For a deeper funner introduction to Microstates checkout Charles Lowell's [presentation at EmberATX meetup](https://www.youtube.com/watch?v=kt5aRmhaE2M).

## How to use Microstates?

`@microstates/ember` makes it easy to create microstates that cause Ember to re-render when a transition on the microstate is called. You can create a microstate in JavaScript using `state` macro or in a template using `state` helper. In both cases, you will get an object that will have transitions that you can invoke. When you call the transition, the state will update accordingly and your change will be reflected. 

Here is one of the simplest Microstates you can make.

```hbs
{{#let (state 10) as |counter|}}
  {{counter.state}}
  <button {{on "click" (noargs counter.increment)}}>Increment</button>
{{/let}}
```

`state` helper is polymorphic, meaning that it accepts arguments of different types. Based on the type of data that you pass to you,
you will get a microstate with different transitions that you can invoke in your template. For primitive types, you can create a microstate
by providing the initial value. 

`(noargs)` helper is something to prevent passing down the event since `increment` and `decrement` take an optional value.
It looks like this:

```js
import { helper } from '@ember/component/helper';

export default helper(([act]) => {
  return () => {
    return act();
  };
});
```

For custom type, you can use `(type name)` helper to resolve the type via Ember's dependency injection system. Here is how we'd use our Person type.

```js
// app/types/person.js
class Person {
  age = Number;
  name = String;
  isEmberino = Boolean;
}
```

```hbs
{{#let (state (type "person") initial) as |person|}}
  {{person.name.state}} - {{person.age.state}} {{person.isEmberino.state}}
  <input type="text" onchange={{action person.name.set value="target.value"}}>
  <button {{action person.age.increment}}>Make older</button>
  <button {{action person.isEmberino.toggle}}>Change projects</button>
{{/let}}
```

### How do Microstates work in Ember?

To understand how Microstates work in Ember we must decompose actions into their distict parts. These parts are,

1. Transition of state
2. Initiate rerender

*Transition of state* is done by changing properties on the component with `this.set`. A rerender is initiated as a side-effect of
calling `this.set`. 

Microstates makes these two operations much clearer. Microstates by default are pure. They do not have any side-effects. However, 
we still need to call `this.set` when a transition computed the next state to initiate a rerender. Microstates provides a `Store`
mechanism that accepts a callback. We use this callback to invoke `this.set` to initiate a rerender.

Here is what that would look like if we didn't use the macro that `@microstates/ember` provides.

```js
import Component from '@ember/component';
import { computed } from '@ember/object';
import { create, Store } from '@microstates/ember';

class Person {
  name = String;
  age = Number;
}

let microstate = create(Person, { name: 'Taras' });

export default Component.extend({
  state: computed({
    get() {
      return Store(microstate, next => this.set('state', next))
    },
    set(key, state) {
      return state;
    }
  })
});
```

Now any transition that you invoke on the state, will automatically create the next state and trigger a re-render. Here is the same
component with the macro.

```js
import Component from '@ember/component';
import { computed } from '@ember/object';
import { create, state } from '@microstates/ember';

class Person {
  name = String;
  age = Number;
}

let microstate = create(Person, { name: 'Taras' });

export default Component.extend({
  state: state(microstate)
});
```

**[Checkout the demos for examples of how Microstates can be used.](https://ember-microstates.netlify.com)**

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

[1]: https://github.com/DockYard/ember-composable-helpers
[2]: https://github.com/jmurphyau/ember-truth-helpers
