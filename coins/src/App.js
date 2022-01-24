import {useEffect, useState} from "react";
import "./App.css";

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
    <div className="wrapper"> 
      <div className="coin_calculator">
        <h2>Coins 계산하기</h2>
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
      </div>

      <hr />
      <div className="coin_price">
        <h2>Coins 시세 정보</h2>
        {loading ? 
          <div>Loading...</div> : 
          <ul className="ul">
            {coins.map((coin) => 
              <li className="li" key={coin.id} value={coin.symbol}> 
                <span className="name">{coin.rank}. {coin.name} </span>
                <span className="price">1{coin.symbol} : $ {coin.quotes.USD.price}</span>
              </li>)
            }
          </ul>
        }
      </div>

    </div>
  );
}

export default App;