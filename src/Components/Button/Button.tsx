import classes from "./Button.module.css";

function Button(props:any) {

    return (
        <button 
        className={classes.button}
        onClick={(event) => {
        } }
        >
            {props.children}
        </button>
    );
}

export default Button;
