import { useRef } from 'react';
import classes from './Field.module.css';

const Field = (props) => {
  const logicValue = useRef();
  const value = useRef();

  const deleteHandler = () => {
    props.removeField(props.id);
  };

  const changeFieldLogicHandler = () => {
    props.addFieldHandler(logicValue.current.value, props.id);
  };

  const changeFieldValueHandler = () => {
    props.changeValue(value.current.value, props.id);
  };

  return (
    <div className={classes.wrap}>
      <button onClick={deleteHandler}>X</button>
      <select onChange={changeFieldValueHandler} ref={value}>
        <option disabled selected>
          choose
        </option>
        <option value='false'>False</option>
        <option value='true'>True</option>
      </select>
      <select onChange={changeFieldLogicHandler} ref={logicValue}>
        <option disabled selected>
          choose
        </option>
        <option value='&&'>AND</option>
        <option value='||'>OR</option>
      </select>
    </div>
  );
};

export default Field;
