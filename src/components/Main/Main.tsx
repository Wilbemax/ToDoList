import { Button, TextField } from '@mui/material';
import React, { useState, ChangeEvent, useEffect } from 'react';
import classes from "./Main.module.css"

// Определение интерфейса для объекта todo
interface Todo {
    value: string;
    isDone: boolean;
    id: number; // Добавлено для соответствия структуре объекта в массиве todos
}

// Определение типа для состояния todos
type Todos = Todo[];

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todos>([
        { value: "react", isDone: false, id: Date.now() }
    ]);
    const [todo, setTodo] = useState<{ value: string }>({ value: '' });
    const [status, setStatus] = useState<{ value: "error" | "primary" | "success", message: string }>({ value: "primary", message: "" })
    const [disabled, setDisabled] = useState<boolean>(false)


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodo({ value: e.target.value });
        {e.target.value !== "" ? setDisabled(false) : setDisabled(true)}
    };

    const handleCheck = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDisabled(true);
        if (todo.value === '') {
            setStatus({ value: "error", message: "поле не должно быть пустым" })
            return
        } else {
            setTodos([...todos, { ...todo, id: Date.now(), isDone: false }]);
            setTodo({ value: '' })
            setStatus({ value: 'success', message: "" })
            setDisabled(false)
        }

    };
    useEffect(() => {
        let interval: number | null = null; // Объявление переменной в области видимости useEffect

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

    return (
        <div className="continer">
            <div className={classes.main}>
                <TextField
                    required
                    id="outlined-required"
                    label={status.value === "primary" ? "enter to do" : (status.value === "success" ? "Done" : "Error")}
                    color={status.value}
                    error={status.value === "error"}
                    value={todo.value}
                    helperText={status.message}
                    onChange={handleChange}
                />
                <Button variant="outlined" disabled={disabled} onClick={handleClick}>add new todo</Button>

                <ul>
                    {todos.map(index => {
                        return (
                            <li className={classes.to_do} key={index.id}>
                                <input type="checkbox" onClick={() => handleCheck(index.id)} checked={index.isDone} /><p>{index.value}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>

    );
};

export default TodoList;
