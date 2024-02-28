import { TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"

type ControlInputPropsType = {
    title: string,
    taskId: string,
    handlChangeTitle: (title: string, id: string) => void,
}
export default function ControlInput(props: ControlInputPropsType) {
    const [title, setTitle] = useState<string>(props.title)
    const [mode, setMode] = useState<boolean>(false)
    const [status, setStatus] = useState<{ value: "error" | "primary" | "success", message: string }>({ value: "primary", message: "" });

    const trimmedTitle = title.trim();

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setTitle(e.target.value)
        
    }
    function activateModeHendler() {
        setMode(!mode)
    }
    function deActivateModeHendler() {
        if (trimmedTitle === ""){
            setStatus({value: "error", message: "the field should not be empty"})
            return
        } else{
            setStatus({value: "primary", message: ""})
            setMode(!mode)
            props.handlChangeTitle(title, props.taskId)
        }

    }


    return (
        <>
            {mode ? (<TextField
                required
                id="outlined-required"
                autoFocus
                fullWidth
                value={title}
                color={status.value}
                error={status.value === "error"}
                helperText={status.message}
                margin='normal'
                onBlur={deActivateModeHendler}
                onChange={handleChange}

            />) : (<p onDoubleClick={activateModeHendler}>{title}</p>)}
        </>
    )
}
