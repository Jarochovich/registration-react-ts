import classes from "./Button.module.css";

function Button(props:any) {

    return (
        <button 
        className={classes.button}
        onClick={(event) => {
        } }
        >
            Отправить
        </button>
    );
}

export default Button;
