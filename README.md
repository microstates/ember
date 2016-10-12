# Ember Microstates

### [API Index](#api)

[![npm version](https://badge.fury.io/js/ember-microstates.svg)](https://badge.fury.io/js/ember-microstates)
[![Ember Observer Score](https://emberobserver.com/badges/ember-microstates.svg)](https://emberobserver.com/addons/ember-microstates)
[![Build Status](https://travis-ci.org/cowboyd/ember-microstates.svg?branch=master)](https://travis-ci.org/cowboyd/ember-microstates)


## The State of State

In Ember components, managing state has historically been a manual
process. We render values in our templates, and then inside our
components, controllers and routes, we write custom code to oversee
each state transition. Forexample, how often have you seen or written
an action like this?

```javascript
actions: { 
  toggleOpen() { 
    this.toggleProperty("isOpen"); 
  }
}
```

and then bound it to an event in your template:

``` handlebars
<button onclick={{action "toggleOpen"}}>Toggle</button>

<div class={{if isOpen "showing" "hidden"}}>
  Here is the content !~!REVEALED!~!
</div>
```

In this case, a boolean value is stored on the `isOpen` property of
the component, and the toggle action transitions it from its current
value to its logical inverse. But if we think about it, all boolean
values _by their vary nature_ can be toggled.

And really, the same can be said about any data type you care to
choose, be it a list, number, string or what have you. The point is
that the set of valid state transitions is _implicit_ to type of data
you have. So why should we have to implement state transitions at all?

What if you could declare the type of data that you had, and then all
the action implementations were just written for you?

That's where microstates come in. They take advantage of the fact that
the operations which can be performed on a piece of data are fully
known before hand so that you can simply declare which operations
correspond to which HTML events.

Using Microstates, we would rewrite the example above using the
`boolean` helper like so:

```handlebars
{{let isOpen=(boolean)}}

<button onclick={{action isOpen.toggle}}>Toggle</button>

<div class={{if isOpen "showing" "hidden"}}>
  Here is the content !~!REVEALED!~!
</div>
```

There is no accompanying JavaScript here because there doesn't
need to be. We know we have a boolean, so why would we need code to
manage it by hand?

The same applies for other data types as well, and there are currently
microstates for [objects][#object], [lists][#list], [strings][#string]
and [numbers][#number].


## Isn't This Just Putting Logic In My Templates?

No.

Unlike templating power-ups like [Ember Truth Helpers][1]
and [Ember Composeable Helpers][2] (which are awesome by the way),
Ember Microstates is _not about deriving new state from existing state_.

Instead, it is about declarativly mapping transitions of one state to
the next. So:

``` handlebars
{{action "toggleOpen"}}
```

becomes

``` handlebars
{{action isOpen.toggle}}
```

Notice how the value being referred to is explicit and obvious as
opposed to hidden in a component `.js` file. Notice also how the
transition to be invoked is explicit and obvious without the need to
look any where else. Power is gained. Intention is revealed.

## Writing Your Own Microstates

What if you're not satisfied with the microstates provided? What if
you want more?

This is currently an advanced topic. Our plan is to make the story
around building your own microstate helpers a lot easier, but for now
it involves some leg-work.

That said, it *is* possible today, and if you're interested your best
bet is to hit up `#e-microstates` channel in the ember community slack.

## API

* [`object`](#object)
  + [`assign(attributes)`](#assignattributes)
  + [`delete(key)`](#deletekey)
  + [`put(key,value)`](#putkeyvalue)
  + [`set(value)`](#setvalue)
* [`list`](#list)
  + [`concat(list)`](#concatlist)
  + [`pop`](#pop)
  + [`push(item)`](#pushitem)
  + [`remove(item)`](#removeitem)
  + [`replace(item,other)`](#removeitemother)
  + [`shift`](#shift)
  + [`unshift(item)`](#unshiftitem)
* [`boolean`](#boolean)
  + [`toggle`](#toggle)
* [`string`](#string)
  + [`concat(string)`](#concatstring)
* [`number`](#number)
  + [`add(number)`](#addnumber)
  + [`subtract(number)`](#subtractnumber)
  + [`multiply(number)`](#multiplynumber)
  + [`divide(number)`](#dividenumber)

### `object`

The object state serves as the base for all other microstates. The
transitions that are available to it are available on all objects:

``` handlebars
{{let car=(object make="Ford" model="Mustang" year=1967)}}
```

#### `assign(attributes)`

Transitions this microstate into a new version that has `attributes`
merged in with its current key-value pairs.

``` handlebars
<button onclick={{car.assign (hash model="Taurus" year=2015)}}>
  Make Sedan
</button>
{{!clicking will result in {make: 'Ford', model: 'Taurus', year: 2015}}}
```

#### `delete(key)`
#### `put(key, value)`
#### `set(value)`

### `list`

#### `concat(list)`
#### `pop()`
#### `push(item)`
#### `remove(item)`
#### `replace(item,other)`
#### `shift()`
#### `unshift(item)`

### `boolean`

#### `toggle()`

### `string`

#### `concat(string)`

### `number`

#### `add(number)`
#### `subtract(number)`
#### `multiply(number)`
#### `divide(number)`

## Example Usage

* [tests/dummy/app/templates/application.hbs](https://github.com/cowboyd/ember-microstates/blob/master/tests/dummy/app/templates/application.hbs)

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
