import { TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"

type ControlInputPropsType = {
    title: string,
    handleChangeTitle: (value: string) => void,
    // status: {value: string, massage: string}
}
export default function ControlInput(props: ControlInputPropsType) {
    const [title, setTitle] = useState<string>(props.title)
    const [mode, setMode] = useState<boolean>(false)

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setTitle(e.target.value)
        
    }
    function activateModeHendler() {
        setMode(!mode)
    }
    function deActivateModeHendler() {
        setMode(!mode)
        props.handleChangeTitle(title)
    }
    return (
        <>
            {mode ? (<TextField
                required
                id="outlined-required"
                autoFocus
                value={title}
                margin='normal'
                onBlur={deActivateModeHendler}
                onChange={handleChange}

            />) : (<p onDoubleClick={activateModeHendler}>{title}</p>)}
        </>
    )
}
