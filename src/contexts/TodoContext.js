import { useContext, createContext } from "react";

const TodoContext = createContext({
    todos: [{ id: 1, msg: "Todo 1", completed: false }],
    addTodo: () => {},
    updateTodo: () => {},
    deleteTodo: () => {},
    completeToggle: () => {},
});

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = TodoContext.Provider;
