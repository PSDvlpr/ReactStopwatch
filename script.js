class Stopwatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      running: false,
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    }

    reset = () => {
      this.setState({
        running: false
      });
      this.print();
    }

    print = () => {
      return this.format(this.state);
    }

    format = () => {
      return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.miliseconds))}`;
    }

    start = () => {
      if(this.running === false) {
        this.setState({
          running: true
        });
      }
      this.watch = setInterval(() => this.step(), 10);
    }
}
    render() {
      return (
        <div className="container">
          <nav className="controls">
            <a href="#body" className="button" onClick="{this.start}">Start</a>
            <a href="#" className="button" id="stop" onClick="{this.stop}">Pause</a>
            <a href="#" className="button" id="reset" onClick="{this.resetwatch}">Reset</a>
          </nav>
          <div className="stopwatch">{this.print}</div>
            <a href="#" className="button" id="add" onClick="{this.add}">Add result</a>
            <a href="#" className="button" id="clear" onClick="{this.clear}">Clear List</a>
            <ul className="results" id="results"></ul>

        </div>
        );
    }

}
