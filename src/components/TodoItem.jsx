import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";
import PropTypes from "prop-types";

TodoItem.propTypes = {
    todo: PropTypes.exact({
        id: PropTypes.number.isRequired,
        msg: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }),
};

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.msg);
    const { updateTodo, deleteTodo, completeToggle } = useTodo();

    const editTodo = (e) => {
        e.preventDefault();
        if (todo.completed) return;

        if (isTodoEditable) {
            updateTodo(todo.id, { ...todo, msg: todoMsg });
            setIsTodoEditable(false);
        } else setIsTodoEditable((prev) => !prev);
    };

    const toggleCompleted = () => {
        completeToggle(todo.id);
    };

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <form onSubmit={editTodo} className="flex w-full gap-x-3">
                <input
                    type="text"
                    className={`border outline-none w-full bg-transparent rounded-lg ${
                        isTodoEditable
                            ? "border-black/10 px-2"
                            : "border-transparent"
                    } ${todo.completed ? "line-through" : ""}`}
                    value={todoMsg}
                    onChange={(e) => setTodoMsg(e.target.value)}
                    readOnly={!isTodoEditable}
                />
                <button
                    className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded-lg border-black/10 bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                    type="submit"
                    disabled={todo.completed}
                >
                    {isTodoEditable ? "💾" : "✏️"}
                </button>
            </form>
            <button
                onClick={() => deleteTodo(todo.id)}
                className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded-lg border-black/10 bg-gray-50 hover:bg-gray-100 shrink-0"
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
