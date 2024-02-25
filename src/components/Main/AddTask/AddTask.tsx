// import classes from './AddTask.module.css'
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { ChangeEvent } from 'react';


interface PropsType {
	title: string;
	disabled: boolean;
	status: { value: "error" | "primary" | "success", message: string };
	handlChanged: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	handlClick: (e: React.MouseEvent<HTMLButtonElement>) => void;

}

export default function AddTask({ title, disabled, status, handlChanged, handlClick }: PropsType) {
	return (
		<>
			<TextField
				required
				id="outlined-required"
				label={
					status.value === 'primary'
						? 'enter to do'
						: status.value === 'success'
							? 'Done'
							: 'Error'
				}
				color={status.value}
				error={status.value === 'error'}
				value={title}

				helperText={status.message}
				size='small'

				onChange={(e) => handlChanged(e)}
			/>
			<Button
				variant="outlined"
				color={
					status.value === 'error' &&
						status.message === 'the field should not be empty'
						? 'error'
						: status.value === 'success'
							? 'success'
							: undefined
				}
				disabled={disabled}

				onClick={(e) => handlClick(e)}>
				add new todo
			</Button>
		</>
	);
}
