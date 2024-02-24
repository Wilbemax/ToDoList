import TodoList from "../Todolist/TodoList";
import classes from './Main.module.css'
export default function Main() {
    return (
        <body className={classes.main}>

            <div className="container">
                <p className={classes.title}>Что планируете сегодня?</p>
                <TodoList /></div>


        </body>
    )
}
