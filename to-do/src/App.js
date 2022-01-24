import { useState } from "react";
import styles from "./App.module.css";

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const onChange = (event) => {
    setTodo(event.target.value);
  };  

  const onSubmit = (event) => {
    event.preventDefault();
    if (todo === "") return;
    setTodos((curAtty) => [todo, ...curAtty]);
    setTodo("");
  }

  return (
    <div className={styles.mainBody}>
      <h2>my to dos ({todos.length})</h2>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={todo} type="text" placeholder="write your to do" />    
      </form>
      <button type="sumit" onClick={onSubmit}>add</button>
      <hr />
      <ul>
        {todos.map((item, index)=> <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
}

export default App;
