class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }

    reset = () => {
      this.state();
      this.print();
    }


    print = () => {
      return this.format(this.state);
    }

    format = (props) => {
      function pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
          result = '0' + result;
        }
        return result;
      }

      return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.miliseconds))}`;
    }


    start = () => {
      if (this.state.running == false) {
        this.setState({
          running: true
        });
        this.watch = setInterval(() => this.step(), 10);
      }
    }

    stop = () => {
      this.setState({
        running: false
      });
      clearInterval(this.watch);
      }

    step = () => {
      let miliseconds = this.state.miliseconds;
      let seconds = this.state.seconds;
      let miunutes = this.state.minutes;

      miliseconds++;
      if (miliseconds >=100) {
        seconds += 1;
        miliseconds = 0;
      }

      if (seconds >= 60) {
        minutes +=1;
        cesconds = 0;
      }

      this.setState({
        minutes,
        seconds,
        miliseconds
      })

      this.print();
    }

    render() {
      return (
        <div className="container">
          <nav className="controls">
            <a href="#body" className="button" onClick={this.start}>Start</a>
            <a href="#" className="button" id="stop" onClick={this.stop}>Pause</a>
            <a href="#" className="button" id="reset" onClick={reset}>Reset</a>
          </nav>
          <div className="stopwatch">{this.print}</div>
            <a href="#" className="button" id="add" onClick={this.add}>Add result</a>
            <a href="#" className="button" id="clear" onClick={this.clear}>Clear List</a>
            <ul className="results" id="results"></ul>
        </div>

        );
    }
  }

    ReactDOM.render(
            <Stopwatch />,
            document.getElementById('body')
        );
