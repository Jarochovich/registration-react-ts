import { NavLink, Outlet } from 'react-router-dom';
import classes from './Layout.module.css';

function Layout(props:any) {
    
    return (
        <div className={classes.wrapper}>
       
            <main className={classes.content}>
                <Outlet/>
            </main>
            
        </div>
    );
}

export default Layout;