import React ,{useState} from "react";
import { increment, decrement } from "../../redux/actions/counterActions";
import { connect,useDispatch  } from "react-redux";
import { softdeletetraine,deletetraine } from '../../redux/actions/deletetraine';
import {useAppDispatch} from "../../hooks/hooks"

const Counter = (props: any) => {
  const dispatch = useAppDispatch();
  // const useTypedDispatch: () => AppDispatch = useDispatch
  const { value ,delettraine,softdeletettraine} = props;

  console.log(props);
  const [postId, setPostID] = useState<string>("");
  console.log(delettraine.error);
  const Add = () => {
    props.increment();
  };
  const Subtract = () => {
    props.decrement();
  };
    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await dispatch(deletetraine(postId));
  }

  return (
    <div>
      <h1>SIMPLE REDUX FUNCTIONALITY</h1>
      <button onClick={Add}>+</button>
      <p>{value}</p>
      <button onClick={Subtract}>-</button>
        <div>
        <form onSubmit={onSubmitHandler}>
          <input type={"text"} value={postId} onChange={(e) => setPostID(e.target.value)} />
          <button type="submit"> submit </button>
        </form>
      </div>
    </div>
  );
};

const mapState = ({ counter }: { counter: any }) => {
  return { 
    value: counter,
    delettraine:deletetraine,
    softdeletettraine:softdeletetraine,
   };
};

export default connect(mapState, {
  increment,
  decrement,
  deletetraine,
  softdeletetraine
})(Counter);
