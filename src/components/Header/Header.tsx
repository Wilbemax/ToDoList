import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "../../them/ThemeContextProvider";
import classes from "./Header.module.css"

export default function Header() {

    const { mode, toggleColorMode } = useThemeContext();

    return (
        <header className={classes.bg}>
           <div className='container'>
                <div className={classes.header}>

                    <p className={classes.title}>TO-DO-LIST made by Wilbemax</p>
                    <div className={classes.button}>
                        <span>{mode}  mode</span>
                        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </div>
                </div>
            </div>
        </header>

    );

}
