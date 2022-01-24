import {useEffect, useState} from "react";

function App() {

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [coins, setCoins] = useState([]);
  const [myPrice, setMyPrice] = useState("");
  const [selectCoin, setSelectCoin] = useState("");
  const [cost, setCost] = useState("");
  

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {   
      setCoins(json);
      setLoading(false);
    });
  },[]);

  const handleInputValue = (event)=> {
    setMyPrice(event.target.value);
  };

  const handelChangeSelect = (event) => {
    const result = coins.find((i) => i.symbol === event.target.value);
    setSelectCoin(result);
  };

  const onclick = () => {
    setCost(myPrice/selectCoin.quotes.USD.price);
    setSubmitting(true);
  }

  return (
    <div>
      
      <h2>Conis 계산기</h2>
      {loading ? 
        <div>Loading...</div> : 
        <div>
          <select onChange={handelChangeSelect}>
            <option>Select Coin!</option>
            {coins.map((coin) => 
              <option key={coin.id} value={coin.symbol}> {coin.rank}. {coin.name}</option>)
            }
          </select>
          <input type="number" value={myPrice} onChange={handleInputValue} placeholder="$를 입력해주세요." />
          <button type="button" onClick={onclick}>계산하기</button>
        </div>
      }

      {
      submitting ? 
       <h3>$ {myPrice}를 가지고 {selectCoin.name}({selectCoin.symbol}) {cost}개를 가질 수 있습니다.</h3> : null
      }
      
      
      <hr /><br /><br /><br /><br />
      <h2>Conis 시세</h2>
      {loading ? 
        <div>Loading...</div> : 
        <ul>
          {coins.map((coin) => 
            <li key={coin.id} value={coin.symbol}> {coin.rank}. {coin.name} = 1{coin.symbol} : $ {coin.quotes.USD.price}</li>)
          }
        </ul>
      }

    </div>
  );
}

export default App;
