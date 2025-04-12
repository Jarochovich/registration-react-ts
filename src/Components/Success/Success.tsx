import classes from './Success.module.css'


function Success(props:any) {


    return (
        <div className={props.active ? `${classes.wrapper} ${classes.active}` : classes.wrapper} onClick={() => props.setActive(false)}>
            <div className={classes.content} onClick={(e) => e.stopPropagation()}>
                {props.children}
            </div>
        </div>

        
    );
}

export default Success;