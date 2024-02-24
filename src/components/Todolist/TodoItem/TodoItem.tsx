// TodoItem.tsx
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import classes from './TodoItem.module.css'
import Checkbox from '@mui/material/Checkbox';


interface TodoItemProps {
    todo: {
        value: string;
        isDone: boolean;
        id: number;
    };
    onCheck: (id: number) => void;
    onDelete: (id: number) => void;
}
const TodoItem: React.FC<TodoItemProps> = ({ todo, onCheck, onDelete }) => {
    return (
        <li key={todo.id} className={classes.item}>
            <div className={classes.typography}>
            <Checkbox  onClick={() => onCheck(todo.id)} checked={todo.isDone} />
            <p className={classes.text}>{todo.value}</p>
            </div>
            
            <Tooltip title="Delete">
                <IconButton onClick={() => onDelete(todo.id)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </li>
    );
};
export default TodoItem;