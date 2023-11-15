import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [todoList, setTodoList] = useState(null);
  const fetchData = async () => {
    const res = await axios.get(process.env.REACT_APP_URL);
    setTodoList(res.data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const done = e.target.done.checked;

    await axios.post(process.env.REACT_APP_URL, {text, done})
    fetchData();

    e.target.text.value = "";
  }

  return (
    <div>
      <h1>TODO LIST</h1>
      <form onSubmit={onSubmitHandler}>
        <input type="text" name="text" />
        <input type="checkbox" name="done" />
        <input type="submit" />
      </form>
      {todoList?.map((todo) => {
        return (
          <div key={todo.id} style={{display : "flex"}}>
            <div>{todo.id}</div>
            <div>{todo.text}</div>
            <div>{todo.done ? "Y" : "N"}</div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
