export default class DateCounter {
  /**
   * Create a Siema.
   * @param {Object} options - Optional settings object.
   */
  constructor(options) {
    this.config = DateCounter.mergeSetting(options);
    this.selector = typeof this.config.selector === 'string' ? document.querySelector(this.config.selector) : this.config.selector;

    if (this.selector === null) {
      throw new Error('Something wrong with your selector');
    }
    return this.init();
  }

  static mergeSetting(options) {
    const settings = {
      selector: '.event-countdown',
      dateDistance: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
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
    const msec = Date.parse(`${date} ${time}`);
    const distance = new Date(msec);
    const currentDate = new Date();
    let result = [];
    let day = null;
    let hours = null;
    let minutes = null;
    let seconds = null;
    let interval = null;

    const counter = () => {
      if (distance - currentDate >= 0) {
        const diff = (distance - currentDate) / 1000;

        day = Math.floor(diff / (60 * 60 * 24));
        hours = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
        minutes = Math.floor((diff % (60 * 60)) / (60));
        seconds = Math.floor(diff % 60);

        hours = (`0 ${hours}`).slice(-2);
        minutes = (`0 ${minutes}`).slice(-2);
        seconds = (`0 ${seconds}`).slice(-2);

        if (diff >= 0) {
          result = {
            day: day,
            hours: hours,
            minutes: minutes,
            seconds: seconds
          };

          return result;
        }
        result = {
          day: '--',
          hours: '--',
          minutes: '--',
          seconds: '--'
        };
        window.clearInterval(interval);
        return result;
      }
      result = {
        day: '--',
        hours: '--',
        minutes: '--',
        seconds: '--'
      };
      $this.classList.add('passed');

      return result;
    };

    interval = window.setInterval(counter(), 1000);
  }
}
