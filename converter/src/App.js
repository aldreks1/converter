import React from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = React.useState("USD");
  const [toCurrency, setToCurrency] = React.useState("RUB");
  const [fromPrice, setFromPrice] = React.useState(1);
  const [toPrice, setToPrice] = React.useState(0);
  //const [eur, setRates] = React.useState({});
  const eurRef = React.useRef({});
  React.useEffect(() => {
    fetch(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json",
    )
      .then((res) => res.json())
      .then((json) => {
        eurRef.current = json.eur;
        onChangeFromPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось поолучить информацию");
      });
  }, []);
  const onChangeFromPrice = (value) => {
    result =
      (value / eurRef.current[fromCurrency.toLowerCase()]) *
      eurRef.current[toCurrency.toLowerCase()];
    setFromPrice(value);
    setToPrice(result.toFixed(3));
  };
  const onChangeToPrice = (value) => {
    result =
      (value / eurRef.current[toCurrency.toLowerCase()]) *
      eurRef.current[fromCurrency.toLowerCase()];
    setToPrice(value);
    setFromPrice(result.toFixed(3));
  };
  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);
  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [toCurrency]);
  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
