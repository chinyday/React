import { useState } from "react";

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

  console.log(todos);

  return (
    <div>
      <h2>my to dos ({todos.length})</h2>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={todo} type="text" placeholder="write your to do" />    
      </form>
      <button type="sumit" onClick={onSubmit}>add text</button>
    </div>
  );
}

export default App;
