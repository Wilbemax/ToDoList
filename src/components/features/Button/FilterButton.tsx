// FilterButton.tsx
import React from 'react';
import { Button } from '@mui/material';
import { TodoTypes } from '../../Todolist/TodoList';

interface FilterButtonProps {
    type: TodoTypes;
    isActive: boolean;
    onClick: (type: TodoTypes) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ type, isActive, onClick }) => {
    return (
        <Button variant={isActive ? "contained" : "outlined"} onClick={() => onClick(type)}>
            {type}
        </Button>
    );
};

export default FilterButton;
