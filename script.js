class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };


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
    if (!this.state.running) {
      this.setState({
        running: true
      });
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step = () => {
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
    })

    this.print();
  }

  stop = () => {
    this.setState({
      running: false
    });
    clearInterval(this.watch);
  }


  reset = () => {
    this.setState({
      running: false,
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    });
    clearInterval(this.watch);
    this.print();
  }


  // TO DO
  //
  // add = () => {
  //   const list = document.getElementById('results');
  //   const element = document.createElement('li');
  //   const id = list.children.length + 1;
  //   const rslt = this.format(this.times);
  //
  //   element.innerHTML = rslt;
  //   element.setAttribute('id', 'result' + id);
  //
  //   const removeButton = document.createElement('button');
  //
  //   removeButton.classList.add('button')
  //   removeButton.innerHTML = 'X';
  //   removeButton.addEventListener('click', () => element.remove(this.id));
  //   element.appendChild(removeButton);
  //
  //   list.appendChild(element);
  //   }

  // clear = () => {
  //   const list = document.getElementById('results');
  //
  //   while(list.firstChild) {
  //     list.removeChild(list.firstChild);
  //   }
  // }
}

render() {
  return (
    <div className="container">
      <nav className="controls">
        <a href="#body" className="button" onClick={this.start}>Start</a>
        <a href="#" className="button" id="stop" onClick={this.stop}>Pause</a>
        <a href="#" className="button" id="reset" onClick={this.reset}>Reset</a>
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
        document.getElementById('body'));
