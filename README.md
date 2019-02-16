# Date Counter

Simple lightweight Javascript's libraries to display countdowns date on websites.

## Installation

If you are using a module bundler like Webpack or Browserify...

```
npm install fursandy-date-counter
```

```js
import DateCounter from 'date-counter';
```

or manually inject the minified script into your website.

```html
<script src="dist/date-counter.min.js"></script>
```

### Easy setup via data attributes HTML

```html
<div class="date-counter" data-date="2019-05-30" data-time="09:00">
  <div class="date-counter__day">00</div>
  <div class="date-counter__hours">00</div>
  <div class="date-counter__minutes">00</div>
  <div class="date-counter__seconds">00</div>
</div>
```

### Via JavaScript with default option values

```js
new DateCounter({
  selector: '.date-counter',
  dateDistance: '2020-01-01',
  timeDistance: '00:00',
});
```

### On Change Events

```js
document.getElementsByClassName('your-element')[0].addEventListener('counter.change', function(e) {
  console.log(e.detail.day, e.detail.hours, e.detail.minutes, e.detail.seconds);
})
```

### On Complete Events

```js
document.getElementsByClassName('date-counter')[0].addEventListener('counter.complete', function(e) {
  console.log('complete datecounter');
});
```