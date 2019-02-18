class DateCounter {
  /**
   * Create a DateCounter.
   * @param {Object} options - Optional settings object.
   */
  constructor(options) {
    this.config = DateCounter.mergeSetting(options);
    this.selector = typeof this.config.selector === 'string' ? document.querySelector(this.config.selector) : this.config.selector;

    if (this.selector === null) {
      throw new Error('Selector undefinded');
    }

    return this.init();
  }

  static mergeSetting(options) {
    const settings = {
      selector: '.date-counter',
      dateDistance: '2020-01-01',
      timeDistance: '10:00',
    };

    const userSettings = options;
    for (const attrname in userSettings) {
      settings[attrname] = userSettings[attrname];
    }

    return settings;
  }

  init() {
    const $this = this.selector;
    const date = $this.getAttribute('data-date') ? $this.getAttribute('data-date') : this.config.dateDistance;
    const time = $this.getAttribute('data-time') ? $this.getAttribute('data-time') : this.config.timeDistance;
    const msec = Date.parse(`${date}T${time}`);
    const distance = new Date(msec);
    let currentDate = new Date();

    if (distance - currentDate >= 0) {
      const interval = window.setInterval(() => {
        currentDate = new Date();
        const diff = (distance - currentDate) / 1000;

        const day = Math.floor(diff / (60 * 60 * 24));
        let hours = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
        let minutes = Math.floor((diff % (60 * 60)) / (60));
        let seconds = Math.floor(diff % 60);
        hours = (`0 ${hours}`).slice(-2);
        minutes = (`0 ${minutes}`).slice(-2);
        seconds = (`0 ${seconds}`).slice(-2);

        if (diff >= 0) {
          $this.querySelectorAll('.date-counter__day')[0].innerHTML = day;
          $this.querySelectorAll('.date-counter__hours')[0].innerHTML = hours;
          $this.querySelectorAll('.date-counter__minutes')[0].innerHTML = minutes;
          $this.querySelectorAll('.date-counter__seconds')[0].innerHTML = seconds;

          const event = new CustomEvent('counter.change', {
            bubbles: true,
            detail: {
              day: day,
              hours: hours,
              minutes: minutes,
              seconds: seconds
            }
          });
          $this.dispatchEvent(event);
        }
        else {
          window.clearInterval(interval);
          $this.classList.add('counter-done');
          const event = new CustomEvent('counter.complete');
          $this.dispatchEvent(event);
        }
      }, 1000);
    }
    else {
      console.log(distance, currentDate);
      $this.classList.add('counter-done');
      const event = new CustomEvent('counter.complete');
      $this.dispatchEvent(event);
    }
  }
}

export default DateCounter;

// Install function
if (document.getElementsByClassName('date-counter').length) {
  new DateCounter();
}

(function funcCustomEvent() {
  if (typeof window.CustomEvent === 'function') { return false; }

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: null
    };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();
