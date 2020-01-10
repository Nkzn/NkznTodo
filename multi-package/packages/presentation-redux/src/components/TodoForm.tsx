import React from "react";

type Props = {
  idForEdit?: string;
  onEnter?: () => void;
  onEnterForEdit: (id: string, title: string | undefined) => void;
  onEnterForCreate: (title: string | undefined) => void;
}

export const TodoForm: React.FC<Props> = ({ idForEdit, onEnter, onEnterForEdit, onEnterForCreate }) => {
  const [ title, setTitle ]  = React.useState("");

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (idForEdit) {
        onEnterForEdit(idForEdit, title);
        onEnter && onEnter();
      } else {
        onEnterForCreate(title);
      }
      setTitle("");
    }
  }

  return (
    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} onKeyPress={onKeyPress} />
  );
};
