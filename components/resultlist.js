function ResultList(props) {
  const results = props.resultArr;

  return <ul>
          {results.map((result, i) => <Result key={i} resultItem={result} />)}
        </ul>
  );
}

function Result(props) {

  return <li id={props.key}>{props.resultItem}
            <button className="button"> X </button>
        </li>
}
