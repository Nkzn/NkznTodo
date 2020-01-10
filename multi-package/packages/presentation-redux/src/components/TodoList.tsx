import React, { useState } from "react";
import { Todo } from "nkzn-todo-domain";

type Props = {
  todos: Todo[];
  hasError: boolean;
  onCheckChanged: (id: string, done: boolean) => void;
  onClickDelete: (id: string) => void;
  TodoForm: React.ComponentType<{
    idForEdit?: string;
    onEnter?: () => void;
  }>
};

export const TodoList: React.FC<Props> = ({
  todos,
  hasError,
  onCheckChanged,
  onClickDelete,
  TodoForm
}) => {
  const [ editingTodoId, setEditingTodoId ] = useState<string>();

  const onEnter = () => {
    setEditingTodoId(void 0);
  }

  const onClickTitle = (id: string) => {
    setEditingTodoId(id);
  };

  const _onCheckChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked: done, value: id } = e.target;
    onCheckChanged(id, done);
  };

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span style={{ display: "inline-block", width: 50 }}>#{todo.id}</span> 
            <span onClick={() => onClickTitle(todo.id)} style={{ display: "inline-block", width: 150 }} >{editingTodoId === todo.id ? <TodoForm idForEdit={todo.id} onEnter={() => onEnter()} /> : todo.title}</span>
            <input onChange={(e) => _onCheckChanged(e)} type="checkbox" name="todo" value={todo.id} checked={todo.done} />
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
