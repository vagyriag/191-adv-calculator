import React from 'react';
import './App.css';
import Button from '../Button/Button';
import Display from '../Display/Display';

function App() {
  const [ currentDisplay, setCurrentDisplay ] = React.useState('0');
  const [ formulaDisplay, setFormulaDisplay ] = React.useState('');
  const [ isReady, setIsReady ] = React.useState(true);
  const [ result, setResult ] = React.useState(false);

  function handleNumber(number) {
    // si solo hay 0 en el current
    if(currentDisplay === '0'){
      // reemplazo el 0 por el número recibido
      setCurrentDisplay(number);
    } else {
      // concateno los números
      setCurrentDisplay(currentDisplay + number);
    }
    // avisamos que estamos listos para operar
    setIsReady(true);
  }

  function handleOperation(operation){
    // solo si estamos listos para operar
    if(isReady){
      // concatenamos la operación anterior con la siguiente
      setFormulaDisplay(formulaDisplay + ' ' + currentDisplay + ' ' + operation);

      if(result === false){
        setResult(parseFloat(currentDisplay));
      } else {
        setResult(operate(result, formulaDisplay.substr(-1), currentDisplay));
      }

      // devolvemos el valor del display a 0
      setCurrentDisplay('0');
      // avisamos que no estamos listos
      setIsReady(false);
    }
  }

  return (
    <div className="App">

      <Display
        formula={formulaDisplay}
        current={isReady ? currentDisplay : result}
        />

      <section className="Keyboard">
        <Button type="controller" value="CE" />
        <Button type="controller" value="C" />
        <Button type="controller" value="◁" />
        <Button type="operation" value="÷"
          onClick={handleOperation} />

        <Button type="number" value="7"
          onClick={handleNumber} />
        <Button type="number" value="8"
          onClick={handleNumber} />
        <Button type="number" value="9"
          onClick={handleNumber} />
        <Button type="operation" value="X"
          onClick={handleOperation} />

        <Button type="number" value="4"
          onClick={handleNumber} />
        <Button type="number" value="5"
          onClick={handleNumber} />
        <Button type="number" value="6"
          onClick={handleNumber} />
        <Button type="operation" value="-"
          onClick={handleOperation} />

        <Button type="number" value="1"
          onClick={handleNumber} />
        <Button type="number" value="2"
          onClick={handleNumber} />
        <Button type="number" value="3"
          onClick={handleNumber} />
        <Button type="operation" value="+"
          onClick={handleOperation} />

        <Button type="controller" value="±" />
        <Button type="number" value="0"
          onClick={handleNumber} />
        <Button type="controller" value="," />
        <Button type="operation" value="="
          onClick={handleOperation} />
      </section>
    </div>
  );
}

function operate(a, operation, b){
  a = parseFloat(a);
  b = parseFloat(b);
  switch(operation){
    case '+':
      return a + b;
    case 'X':
      return a * b;
    case '-':
      return a - b;
    case '÷':
      return a / b;
  }
}

export default App;
