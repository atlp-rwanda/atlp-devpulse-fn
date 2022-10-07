import React from "react";
import { increment, decrement } from "../../redux/actions/counterActions";
import { connect } from "react-redux";

const Counter = (props: any) => {
  const { value } = props;

  console.log(props);

  const Add = () => {
    props.increment();
  };
  const Subtract = () => {
    props.decrement();
  };

  return (
    <div>
      <h1>HAVING FUN WITH REDUX</h1>
      <button onClick={Add}>+</button>
      <p>{value}</p>
      <button onClick={Subtract}>-</button>
    </div>
  );
};

const mapState = ({ counter }: { counter: number }) => {
  return { value: counter };
};

export default connect(mapState, {
  increment,
  decrement,
})(Counter);
