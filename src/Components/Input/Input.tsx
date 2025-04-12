import classes from "./Input.module.css";

function Input(props:any) {
    return (
        <div className={classes.wrapper}>
            <input 
            className={classes.input}
            name={props.name}
            value={props.value}
            placeholder={props.description}
            onChange = {(event) => { 
                props.action(event.target.value);
                
                props.actions(event.target.value);
            } 
            
            }
            onBlur={(e) => props.blurHandler(e)}
            type={props.isPass ? 'password' : ''}
            required
            >

            </input>
            <p className={classes.error}></p>
        </div>
    );
}

export default Input;