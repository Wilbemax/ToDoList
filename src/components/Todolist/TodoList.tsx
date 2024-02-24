import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import classes from "./Todolist.module.css";
import TodoItem from './TodoItem/TodoItem';
import FilterButton from '../features/Button/FilterButton';


interface Todo {
    value: string;
    isDone: boolean;
    id: number;
}

export type TodoTypes = "all" | "complited" | "active";

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([
        { value: "react", isDone: false, id: Date.now() }
    ]);
    const [todo, setTodo] = useState<{ value: string }>({ value: '' });
    const [status, setStatus] = useState<{ value: "error" | "primary" | "success", message: string }>({ value: "primary", message: "" });
    const [disabled, setDisabled] = useState<boolean>(false);
    const [type, setType] = useState<TodoTypes>("all");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodo({ value: e.target.value });

        setDisabled(e.target.value === "");

        setStatus(e.target.value !== "" ? { value: "primary", message: "" } : { value: "error", message: "Поле не должно быть пустое" })
    };

    const handleCheck = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo));
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDisabled(true);
        if (todo.value !== '') {
            setTodos([...todos, { ...todo, id: Date.now(), isDone: false }]);
            setTodo({ value: '' });
            setStatus({ value: 'success', message: "" });
            setDisabled(false);

            return;
        } else {
            setStatus({ value: "error", message: "поле не должно быть пустым" });
            return;
        }
    };

    useEffect(() => {
        let interval: number | null = null;

        if (status.value === "success") {
            interval = window.setInterval(() => {
                setStatus({ value: 'primary', message: '' });
            }, 2000);
        }

        return () => {
            if (interval !== null) {
                window.clearInterval(interval);
            }
        };
    }, [status.value]);

    const handleDelete = (id: number) => {
        const updatedTodos = todos.filter(item => item.id !== id);
        setTodos(updatedTodos);
    };

    const chooseType = (type: TodoTypes) => {
        setType(type);
    };

    let readyTodo = todos;
    if (type === "complited") {
        readyTodo = todos.filter(todo => todo.isDone === true);
    }
    if (type === "active") {
        readyTodo = todos.filter(todo => todo.isDone === false);
    }

    return (
       

            <div className={classes.list}>
                    <TextField
                        required
                        id="outlined-required"
                        label={status.value === "primary" ? "enter to do" : (status.value === "success" ? "Done" : "Error")}
                        color={status.value}
                        error={status.value === "error"}
                        value={todo.value}
                        margin='normal'
                        helperText={status.message}

                        onChange={handleChange}
                    />
                    <Button variant="outlined" color={status.value === "error" && status.message === "поле не должно быть пустым" ? "error" : (status.value === "success" ? "success" : undefined)} disabled={disabled} onClick={handleClick}>add new todo</Button>
                <ul className={classes.item}>
                    {readyTodo.map(todo => (
                        <TodoItem key={todo.id} todo={todo} onCheck={handleCheck} onDelete={handleDelete} />
                    ))}
                </ul>
                <div className={classes.buttons}>
                    <FilterButton type="all" isActive={type === 'all'} onClick={chooseType} />
                    <FilterButton type="complited" isActive={type === 'complited'} onClick={chooseType} />
                    <FilterButton type="active" isActive={type === 'active'} onClick={chooseType} />
                </div>

            </div>
      
    );
};

export default TodoList;