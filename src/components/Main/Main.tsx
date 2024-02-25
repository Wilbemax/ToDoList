import TodoList from "../Todolist/TodoList";
import classes from './Main.module.css'
import AddTask from './AddTask/AddTask'
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export interface List {
    value: string;
    id: number;
}

export default function Main() {
    const [title, setTitle] = useState<string>('')
    const [tasks, setTasks] = useState<List[]>([])
    const [disabled, setDisabled] = useState<boolean>(false);
    const [status, setStatus] = useState<{ value: "error" | "primary" | "success", message: string }>({ value: "primary", message: "" });



    const handlChanged = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(value)
        setDisabled(value === '')
        setStatus(value !== "" ? { value: "primary", message: "" } : { value: "error", message: "Поле не должно быть пустое" });
    }, [])

    const handlClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDisabled(true);
        if (title !== '') {
            setTasks([...tasks, { value: title, id: Date.now() }]);
            setTitle('');
            setStatus({ value: 'success', message: "" });
            setDisabled(false);
        } else {
            setStatus({ value: "error", message: "the field should not be empty" });
        }
    }, [tasks, title])

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
    return (
        <section className={classes.main}>

            <div className="container">
                <div className={classes.top}>
                    <p className={classes.title}>What are you planning today?</p>
                    <AddTask title={title} handlChanged={handlChanged} handlClick={handlClick} disabled={disabled} status={status} />
                </div>
                <div className={classes.list}>
                    {tasks.length > 0 ? tasks.map((item) => <><TodoList key={item.id} title={item.value} /></>) : <p className={classes.title}>You don't have a single task</p>}
                </div>


            </div>


        </section>
    )
}
