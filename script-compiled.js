'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch(props) {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

    _this.state = {
      running: false,
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };

    _this.start = _this.start.bind(_this);
    _this.stop = _this.stop.bind(_this);
    _this.reset = _this.reset.bind(_this);
    _this.add = _this.add.bind(_this);
    _this.clear = _this.clear.bind(_this);
    _this.pad0 = _this.pad0.bind(_this);
    _this.print = _this.print.bind(_this);
    _this.step = _this.step.bind(_this);

    return _this;
  }

  _createClass(Stopwatch, [{
    key: 'print',
    value: function print() {
      var swatch = document.querySelector('.stopwatch');
      var stopwatch = this.format(this.state);
      swatch.innerHTML = stopwatch;
    }
  }, {
    key: 'format',
    value: function format(props) {
      return this.pad0(this.state.minutes) + ':' + this.pad0(this.state.seconds) + ':' + this.pad0(Math.floor(this.state.miliseconds));
    }
  }, {
    key: 'pad0',
    value: function pad0(value) {
      var result = value.toString();
      if (result.length < 2) {
        result = '0' + result;
      }
      return result;
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      if (!this.state.running) {
        this.setState({
          running: true
        });
        this.watch = setInterval(function () {
          return _this2.step();
        }, 10);
      }
      console.log('started');
    }
  }, {
    key: 'step',
    value: function step() {
      if (!this.state.running) return;
      var minutes = this.state.minutes;
      var seconds = this.state.seconds;
      var miliseconds = this.state.miliseconds;

      miliseconds++;
      if (miliseconds >= 100) {
        seconds += 1;
        miliseconds = 0;
      }

      if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
      }

      this.setState({
        minutes: minutes,
        seconds: seconds,
        miliseconds: miliseconds
      });

      this.print();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.setState({
        running: false
      });
      clearInterval(this.watch);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.setState({
        running: false,
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      });
      clearInterval(this.watch);
      this.print();
    }
  }, {
    key: 'add',
    value: function add() {
      var _this3 = this;

      var list = document.getElementById('results');
      var element = document.createElement('li');
      var id = list.children.length + 1;
      var rslt = this.format(this.state);

      element.innerHTML = rslt;
      element.setAttribute('id', 'result' + id);

      var removeButton = document.createElement('button');

      removeButton.classList.add('button');
      removeButton.innerHTML = 'X';
      removeButton.addEventListener('click', function () {
        return element.remove(_this3.id);
      });
      element.appendChild(removeButton);

      list.appendChild(element);
    }
  }, {
    key: 'clear',
    value: function clear() {
      var list = document.getElementById('results');

      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'nav',
          { className: 'controls' },
          React.createElement(
            'a',
            { href: '#body', className: 'button', onClick: this.start },
            'Start'
          ),
          React.createElement(
            'a',
            { href: '#', className: 'button', id: 'stop', onClick: this.stop },
            'Pause'
          ),
          React.createElement(
            'a',
            { href: '#', className: 'button', id: 'reset', onClick: this.reset },
            'Reset'
          )
        ),
        React.createElement(
          'div',
          { className: 'stopwatch' },
          this.print
        ),
        React.createElement(
          'a',
          { href: '#', className: 'button', id: 'add', onClick: this.add },
          'Add result'
        ),
        React.createElement(
          'a',
          { href: '#', className: 'button', id: 'clear', onClick: this.clear },
          'Clear List'
        ),
        React.createElement('ul', { className: 'results', id: 'results' })
      );
    }
  }]);

  return Stopwatch;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('body'));
