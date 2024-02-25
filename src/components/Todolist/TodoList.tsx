import React, { useState, ChangeEvent, useEffect, useMemo, useCallback } from 'react';
import { Button, TextField } from '@mui/material';
import classes from "./Todolist.module.css";
import TodoItem from './TodoItem/TodoItem';
import FilterButton from '../features/Button/FilterButton';



interface Todo {
    value: string;
    isDone: boolean;
    id: number;
}
type TodoListProps = {
    title: string;
}

export type TodoTypes = "all" | "complited" | "active";

const TodoList: React.FC<TodoListProps> = ({ title }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todo, setTodo] = useState<{ value: string }>({ value: '' });
    const [status, setStatus] = useState<{ value: "error" | "primary" | "success", message: string }>({ value: "primary", message: "" });
    const [disabled, setDisabled] = useState<boolean>(false);
    const [type, setType] = useState<TodoTypes>("all");

    const handleChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setTodo({ value });
        setDisabled(value === "");
        setStatus(value !== "" ? { value: "primary", message: "" } : { value: "error", message: "Поле не должно быть пустое" });
    }, []);



    const handleCheck = useCallback((id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo));
    }, [todos]);

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDisabled(true);
        if (todo.value !== '') {
            setTodos([...todos, { ...todo, id: Date.now(), isDone: false }]);
            setTodo({ value: '' });
            setStatus({ value: 'success', message: "" });
            setDisabled(false);
        } else {
            setStatus({ value: "error", message: "the field should not be empty" });
        }
    }, [todos, todo]);

    const handleDelete = useCallback((id: number) => {
        const updatedTodos = todos.filter(item => item.id !== id);
        setTodos(updatedTodos);
    }, [todos]);

    const chooseType = useCallback((type: TodoTypes) => {
        setType(type);
    }, []);



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


    const readyTodo = useMemo(() => {
        switch (type) {
            case "complited":
                return todos.filter(todo => todo.isDone === true);
            case "active":
                return todos.filter(todo => todo.isDone === false);
            default:
                return todos;
        }
    }, [todos, type]);


    return (


        <div className={classes.list}>
            <p className={classes.title}>{title}</p>
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
            <Button variant="outlined" color={status.value === "error" && status.message === "the field should not be empty" ? "error" : (status.value === "success" ? "success" : undefined)} disabled={disabled} onClick={handleClick}>add new task</Button>

            {readyTodo.length > 0 ? <ul className={classes.item}>
                {readyTodo.map(todo => (
                    <TodoItem key={todo.id} todo={todo} onCheck={handleCheck} onDelete={handleDelete} />
                ))}
            </ul> : <p className={classes.item}>Add a task to see them here</p>}


            <div className={classes.buttons}>
                <FilterButton type="all" isActive={type === 'all'} onClick={chooseType} />
                <FilterButton type="complited" isActive={type === 'complited'} onClick={chooseType} />
                <FilterButton type="active" isActive={type === 'active'} onClick={chooseType} />
            </div>

        </div>

    );
};

export default TodoList;