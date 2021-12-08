import { useState, useEffect } from 'react';
import './App.css';
import Field from './Field';

function App() {
  const [result, setResult] = useState([]);
  const [logicFields, setLogicFields] = useState([
    {
      id: Math.random(),
      value: null,
      operator: null,
    },
  ]);

  useEffect(() => {
    let finalLogicResult;
    const myResults = logicFields
      .map((el) => [el.value, el.operator])
      .map((el) => el.join(' '))
      .join(' ')
      .split(' ');

    for (let i = 0; i < myResults.length - 1; i++) {
      if (myResults[i] === 'false') myResults[i] = false;
      if (myResults[i] === 'true') myResults[i] = true;
    }
    //initial value
    finalLogicResult = myResults[0] ? true : false;
    //rest of logic
    for (let i = 1; i < myResults.length - 1; i++) {
      if (myResults[i] === '') return;
      if (i % 2 !== 0) {
        finalLogicResult =
          myResults[i] === '||'
            ? finalLogicResult || myResults[i + 1]
            : finalLogicResult && myResults[i + 1];
      }
    }

    console.log(myResults);

    if (myResults[0] === '') {
      return;
    }

    setResult(finalLogicResult ? 'true' : 'false');
  }, [logicFields]);

  const deleteFieldHandler = (id) => {
    setLogicFields((prev) => prev.filter((el) => el.id !== id));
  };

  const addFieldHandler = (operator, id) => {
    //just update operator
    let indexOfField = logicFields.findIndex((el) => el.id === id);
    if (indexOfField !== logicFields.length - 1) {
      setLogicFields((prev) => {
        const changedField = prev.find((el) => el.id === id);
        changedField.operator = operator;
        return [...prev];
      });
      return;
    }
    //add field and update operator
    setLogicFields((prev) => {
      const changedField = prev.find((el) => el.id === id);
      changedField.operator = operator;
      return [
        ...prev,
        {
          id: Math.random(),
          value: null,
          operator: null,
        },
      ];
    });
  };

  const changeValue = (value, id) => {
    setLogicFields((prev) => {
      const changedField = prev.find((el) => el.id === id);
      changedField.value = value === 'true' ? true : false;
      return [...prev];
    });
  };

  //console.log(result);

  return (
    <div className='wrapp'>
      {logicFields.map((el) => (
        <Field
          key={el.id}
          id={el.id}
          removeField={deleteFieldHandler}
          addFieldHandler={addFieldHandler}
          changeValue={changeValue}
        />
      ))}
      <p>result: {result}</p>
    </div>
  );
}

export default App;
