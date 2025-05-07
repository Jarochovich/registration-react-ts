import classes from './Reset.module.css'
import { NavLink } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useState } from 'react';
import Success from '../Success/Success';

function ResetPass(props:any) {

    const [active, setActive] = useState(false);

    const regExpEmail = /^[^\s@]+@[^\s@]{2,5}\.[^\s@]{2,3}$/;

    // Состояния
    const [email, setEmail] = useState('');

    const [emailDirty, setEmailDirty] = useState(false);

    const [emailError, setEmailError] = useState('Email не может быть пустым!');


    // Изменения состояний
    const handleEmail = (newEmail:any) => {
        setEmail(newEmail);
    }


    // Обработчики ошибок
    const validationEmail = (newEmail:string) => {
        !regExpEmail.test(newEmail) ? setEmailError('Неправильный формат email') : setEmailError('');
    }

    const blurHandler = (e:any) => {
        if (e.target.name === 'email') {
            setEmailDirty(true);
        }
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();

        if (emailError === '') {
            setActive(true);
            handleEmail('');
        }
    }

    // Генерация нового пароля
    const generateNewPass = () => Math.random().toString(36).substring(2, 10);

    return (
        <div className={classes.resetPass}>
            <h1>Восстановление пароля</h1>

            <form className={classes.form} onSubmit={handleSubmit}>

                {(emailDirty && emailError) && <p style={{color: 'red', fontSize: '12px'}}>{emailError}</p>}
                <Input blurHandler={blurHandler} 
                name={'email'} 
                value ={email} 
                action = {handleEmail} 
                description = {'Введите email'} 
                actions = {validationEmail}/>

                <Button>Сбросить пароль</Button>
            </form>

            <ul className={classes.links}>
                <li><NavLink to={'/sign-in'}>Назад</NavLink></li>
            </ul>

            <Success active={active} setActive = {setActive}>
                <h3>Пароль успешно сброшен!</h3>
                <p>Ваш новый пароль: <b>{generateNewPass()}</b> </p>
            </Success>

        </div>

    );
}

export default ResetPass;