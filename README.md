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
`Boolean` helper like so:

```handlebars
{{let isOpen=(Boolean)}}

<button onclick={{action isOpen.toggle}}>Toggle</button>

<div class={{if isOpen "showing" "hidden"}}>
  Here is the content !~!REVEALED!~!
</div>
```

There is no accompanying JavaScript here because there doesn't
need to be. We know we have a boolean, so why would we need code to
manage it by hand?

The same applies for other data types as well, and there are currently
microstates for [objects](#object), [lists](#list), [strings](#string)
and [numbers](#number).


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

* [`Object`](#object)
  + [`assign(attributes)`](#assignattributes)
  + [`delete(key)`](#deletekey)
  + [`put(key,value)`](#putkeyvalue)
  + [`set(object)`](#setobject)
* [`List`](#list)
  + [`concat(list)`](#concatlist)
  + [`pop`](#pop)
  + [`push(item)`](#pushitem)
  + [`remove(item)`](#removeitem)
  + [`replace(item, other)`](#removeitemother)
  + [`shift`](#shift)
  + [`unshift(item)`](#unshiftitem)
  + [`set(list)`](#setlist)
* [`Boolean`](#boolean)
  + [`toggle`](#toggle)
  + [`set(boolean)`](#setboolean)  
* [`String`](#string)
  + [`concat(string)`](#concatstring)
  + [`set(string)`](#setstring)  
* [`Number`](#number)
  + [`add(number)`](#addnumber)
  + [`subtract(number)`](#subtractnumber)
  + [`multiply(number)`](#multiplynumber)
  + [`divide(number)`](#dividenumber)
  + [`set(number)`](#setnumber)

### `object`

The object state serves as the base for all other microstates. The
transitions that are available to object are available to all other types:

``` handlebars
{{let car=(Object make="Ford" model="Mustang" year=1967)}}
```

#### `assign(attributes)`

Transitions this microstate into a new version that has `attributes`
merged in with its current key-value pairs. Any key-values already present are
retained. For example if we use our car, which has  "make", "model", and "year"
properties, we can specify an action that will assign to the "model" and "year",
but leave the "make" as is.

``` handlebars
<button onclick={{action car.assign (hash model="Taurus" year=2015)}}>
  Make Sedan
</button>
{{!clicking will result in {make: 'Ford', model: 'Taurus', year: 2015}}}
```

#### `delete(key)`

Remove a key (and subsequent value) from this object. For example, to delete the
"year" property from our car:

``` handlebars
<button onclick={{action car.delete "year"}}>
  Remove Year
</button>
{{!clicking will result in {make: 'Ford', model: 'Mustang'}}}
```

#### `put(key, value)`

Add property with a given name and value to the object. It will update the property with the given value if it already exists.

```handlebars
<button onclick={{action car.put "color" "blue"}}>
  Add color
</button>
```

#### `set(object)`

Replace current object microstate with a new object microstate from given hash.

```handlebars
<button onclick={{action car.set (hash make="Toyota" model="Supra" year="1982")}}>
  Update car
</button>
```

### `List`

List microstate represents an ordered collection of values. 

```hbs
{{let numbers=(List (array 1 2 3))}}

{{each numbers as |item|}}
  {{item}}
{{/each}}
```

#### `concat(list)`

Makes a new list with all of the items from the given list added to the end of the current list.

```handlebars
<button onclick={{action numbers.concat (array 4 5 6)}}>
  Add more items
</button>
```

#### `pop()`

Makes a new list the last item removed from current list.

```handlebars
<button onclick={{action numbers.pop}}>
  Remove last item
</button>
```

#### `push(item)`

Makes a new list with item added to the end of the current list.

```handlebars
<button onclick={{action numbers.push 4}}>
  Add 4
</button>
```

#### `remove(item)`

Makes a new list the given item removed from the current list.

```handlebars
<button onclick={{action numbers.remove 3}}>
  Remove 3
</button>
```

#### `replace(item, other)`

Makes a new list with a new item in place of the given item in the current list.

```handlebars
<button onclick={{action numbers.replace 3 6}}>
  Replace 3 with 6
</button>
```

#### `shift()`

Makes a new list with the first item of the list removed.

```handlebars
<button onclick={{action numbers.shift}}>
  Remove first
</button>
```

#### `unshift(item)`

Add an item to the beginning of the list.

```handlebars
<button onclick={{action numbers.unshift 7}}>
  Add to the beginning
</button>
```

#### `set(list)`

Replaces current list with given list.

```handlebars
<button onclick={{action list.set (array 4 5 6)}}>
  Replace the list
</button>
```

### `Boolean`

Boolean represent a `true` or `false` value.

```handlebars
{{let isYa=(Boolean true)}}

{{#if isYa}}
  Yes
{{else}}
  No
{{/if}}
```

#### `toggle()`

Transition the Boolean microstate to opposite of it's current value.

```handlebars
<button onclick={{action isYa.toggle}}>
  Flip the value
</button>
```

#### `set(boolean)`

Transition the microstate to give the value.

```handlebars
<button onclick={{action isYa.set false}}>
  Make false
</button>
```

### `String`

Represents a String object.

```handlebars
{{let message=(String 'hello world')}}

{{message}}
```

#### `concat(string)`

Add string to the end of the existing value.

```handlebars
<button onclick={{action message.concat '!!!'}}>
  Exclaim!!!
</button>
```

#### `set(string)`

Replace current value with new string.

```handlebars
<button onclick={{action message.set 'I come in pieces'}}>
  Confuse
</button>
```

### `Number`

Represents a numerical value.

```handlebars
{{let age=(Number 34)}}

{{age}}
```

#### `add(number)`

Increase the value by given number.

```handlebars
<button onclick={{action age.add 1}}>
  Increase by one
</button>
```

#### `subtract(number)`

Decrease the value by given number.

```handlebars
<button onclick={{action age.subtract 1}}>
  Decrease by one
</button>
```

#### `multiply(number)`

Multiply the value by given number.

```handlebars
<button onclick={{action age.multiply 10}}>
  Multipy by 10
</button>
```

#### `divide(number)`

Divide the value by given number.

```handlebars
<button onclick={{action age.divide 10}}>
  Divide by 10
</button>
```

#### `set(number)`

Replace the value with given number.

```handlebars
<button onclick={{action age.set 21}}>
  Set age to 21
</button>
```

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
