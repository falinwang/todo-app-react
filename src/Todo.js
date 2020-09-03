import React, { useState } from "react";
import "./Todo.css";
import { List, ListItem, ListItemText, Modal, Button } from "@material-ui/core";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const updateTodo = () => {
    // update the todo with the new input text
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <div className="todo__list">
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <form action="">
            <h1>I am a modal</h1>
            <input
              type="text"
              placeholder={props.todo.todo}
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button onClick={(e) => updateTodo()} type="submit">
              Update Todo
            </Button>
          </form>
        </div>
      </Modal>
      <List>
        <ListItem>
          <ListItemText primary={props.todo.todo} secondary="Dummy deadline" />
        </ListItem>
        <Button onClick={(e) => setOpen(true)}>Edit</Button>
        <DeleteForeverIcon
          className="button"
          onClick={(e) => db.collection("todos").doc(props.todo.id).delete()}
        />
      </List>
    </div>
  );
}

export default Todo;
