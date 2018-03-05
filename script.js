class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
      results: []
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.add = this.add.bind(this);
    this.clear = this.clear.bind(this);
    this.pad0 = this.pad0.bind(this);
    this.step = this.step.bind(this);
    this.remove = this.remove.bind(this);

  }

  format(props) {
    return `${this.pad0(this.state.minutes)}:${this.pad0(this.state.seconds)}:${this.pad0(Math.floor(this.state.miliseconds))}`;
  }

  pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
      result = '0' + result;
    }
    return result;
  }

  start() {
    if (!this.state.running) {
      this.setState({
        running: true
      });
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.state.running) return;

    let minutes = this.state.minutes;
    let seconds = this.state.seconds;
    let miliseconds = this.state.miliseconds;

    miliseconds++;
    if (miliseconds >=100) {
      seconds += 1;
      miliseconds = 0;
    }

    if (seconds >= 60) {
      minutes +=1;
      seconds = 0;
    }

    this.setState({
      minutes,
      seconds,
      miliseconds
    });
  }

  stop() {
    this.setState({
      running: false
    });
    clearInterval(this.watch);
  }


  reset() {
    this.setState({
      running: false,
      minutes: 0,
      seconds: 0,
      miliseconds: 0

    });
    clearInterval(this.watch);
  }

  add() {
    let arr = this.state.results;
    let arrEl = this.format(this.state);

    this.setState({
      results: [...arr, arrEl]
    });
  }

  clear() {
    this.setState({
      results: []
    });
  }

  remove(index) {
    this.setState({
      results: [...this.state.results.slice(0, index), ...this.state.results.slice(index+1)]
    });
  }

  render() {
    return (
      <div className="container">
        <nav className="controls">
          <a href="#body" className="button" onClick={this.start}>Start</a>
          <a href="#" className="button" id="stop" onClick={this.stop}>Pause</a>
          <a href="#" className="button" id="reset" onClick={this.reset}>Reset</a>
        </nav>
        <div className="stopwatch">{this.format()}</div>
        <a href="#" className="button" id="add" onClick={this.add}>Add result</a>
        <a href="#" className="button" id="clear" onClick={this.clear}>Clear List</a>
        <ResultList resultArr = {this.state.results} remove={this.remove} />
      </div>
    );
  }
}

class ResultList extends React.Component {
  get resultArr() {
    return this.props.resultArr.map((result, i) => <Result key={i} resultItem={result} remove={() => this.props.remove(i)} />);
  }

  render() {
    return (
      <ul>
        {this.resultArr}
      </ul>
    );
  }
}

class Result extends React.Component {
  render() {
    return (
      <li id={this.props.resultItem}>{this.props.resultItem}
          <button className="button" onClick={this.props.remove}> X </button>
      </li>
    );
  }
}

ReactDOM.render(
  <Stopwatch />,
  document.getElementById('body')
);
