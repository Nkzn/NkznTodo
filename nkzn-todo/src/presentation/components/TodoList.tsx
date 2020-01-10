import React, { useState } from "react";
import { Todo } from "../../domain";

type Props = {
  todos: Todo[];
  hasError: boolean;
  changeDoneState: (id: string, done: boolean) => void;
  deleteTodo: (id: string) => void;
  TodoForm: React.ComponentType<{
    idForEdit?: string;
    onEnter?: () => void;
  }>
};

export const TodoList: React.FC<Props> = ({
  todos,
  hasError,
  changeDoneState,
  deleteTodo,
  TodoForm
}) => {
  const [ editingTodoId, setEditingTodoId ] = useState<string>();

  const onEnter = () => {
    setEditingTodoId(void 0);
  }

  const onClickTitle = (id: string) => {
    setEditingTodoId(id);
  };

  const onCheckChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked: done, value: id } = e.target;
    changeDoneState(id, done);
  };

  const onClickDelete = (id: string) => {
    deleteTodo(id);
  };

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span style={{ display: "inline-block", width: 50 }}>#{todo.id}</span> 
            <span onClick={() => onClickTitle(todo.id)} style={{ display: "inline-block", width: 150 }} >{editingTodoId === todo.id ? <TodoForm idForEdit={todo.id} onEnter={() => onEnter()} /> : todo.title}</span>
            <input onChange={(e) => onCheckChanged(e)} type="checkbox" name="todo" value={todo.id} checked={todo.done} />
            <span onClick={() => onClickDelete(todo.id)} style={{ marginLeft: 8 }}>🗑</span>
          </li>
        ))}
        <li>
          <TodoForm />
        </li>
      </ul>
      {hasError && <span style={{color: "red"}}>エラーがありました</span>}
    </div>
  );
};
