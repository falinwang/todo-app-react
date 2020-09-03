import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  // console.log("🐱", input);

  // when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(
    () => {
      // this code here fires when the app.js loads
      db.collection("todos")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setTodos(
            snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
          );
        });
      // when database changes, we want to fire the useEffect
    },
    []
    // WHEN dependencies change/loads every time, the useEffect fires. if there's no dependency, only fires once when the app.js loads
  );

  const addTodo = (event) => {
    event.preventDefault(); //stop the refresh
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput(""); // clear up the input after clicking add todo
  };

  return (
    <div className="App">
      <h1>My Todo List</h1>
      <form action="">
        <FormControl>
          <InputLabel htmlFor="my-input">Write a todo</InputLabel>
          <Input
            id="my-input"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
        </FormControl>

        <Button
          disabled={!input} // if there's not input
          type="submit"
          variant="contained"
          color="primary"
          onClick={addTodo}
        >
          Add task
        </Button>
        {/* submit so you can press enter to submit */}
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} key={`${todo.id}`} />
        ))}
      </ul>
    </div>
  );
}

export default App;
