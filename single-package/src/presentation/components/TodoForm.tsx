import React from "react";

type Props = {
  idForEdit?: string;
  onEnter?: () => void;
  editTodo: (id: string, title: string) => void;
  addNewTodo: (title: string) => void;
}

export const TodoForm: React.FC<Props> = ({ idForEdit, onEnter, editTodo, addNewTodo }) => {
  const [ title, setTitle ]  = React.useState("");

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (idForEdit) {
        editTodo(idForEdit, title || "");
        onEnter && onEnter();
      } else {
        addNewTodo(title || "");
      }
      setTitle("");
    }
  }

  return (
    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} onKeyPress={onKeyPress} />
  );
};
