// TodoItem.tsx
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import classes from './TodoItem.module.css'
import Checkbox from '@mui/material/Checkbox';
import ControlInput from '../../../widgets/ControlInput/ControlInput';


interface TodoItemProps {
    todo: {
        value: string;
        isDone: boolean;
        id: string;
    };
    onCheck: (id: string) => void;
    onDelete: (id: string) => void;
    handlChangeTitle: (title: string, id: string) => void;
}
const TodoItem: React.FC<TodoItemProps> = ({ todo, onCheck, onDelete, handlChangeTitle }) => {

    return (
        <>
            {todo.isDone !== true ? (<li key={todo.id} className={classes.item}>

                <div className={classes.typography}>
                    <div className={classes.text}>
                        <Checkbox onClick={() => onCheck(todo.id)} checked={todo.isDone} />
                    </div>
                    <ControlInput taskId={todo.id} handlChangeTitle={handlChangeTitle} title={todo.value} />
                </div>

                <Tooltip title="Delete">
                    <IconButton onClick={() => onDelete(todo.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </li>) : (<li key={todo.id} className={classes.item}>

                <div className={classes.typography}>

                    <Checkbox onClick={() => onCheck(todo.id)} checked={todo.isDone} />
                    <div className={classes.textDone}>
                        <ControlInput taskId={todo.id} handlChangeTitle={handlChangeTitle} title={todo.value} />
                    </div>
                </div>

                <Tooltip title="Delete">
                    <IconButton onClick={() => onDelete(todo.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </li>)}

        </>
    );
};
export default TodoItem;