import { useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import classes from './SignIn.module.css'
import { NavLink } from 'react-router-dom';
import Success from '../Success/Success';

function SignIn(props:any) {

    const [active, setActive] = useState(false);

    const regExpEmail = /^[^\s@]+@[^\s@]{2,5}\.[^\s@]{2,3}$/;

    // Состояния
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const [emailDirty, setEmailDirty] = useState(false);
    const [passDirty, setPassDirty] = useState(false);


    const [emailError, setEmailError] = useState('Email не может быть пустым!');
    const [passError, setPassError] = useState('Пароль не может быть пустым!');


    // Изменения состояний
    const handleEmail = (newEmail:any) => {
        setEmail(newEmail);
    }

    const handlePass = (newPass:string) => {
        setPass(newPass);
    }

    // Вспомогательные функции ///////////////////////////////
    const hasUpper = (s:string) => !(s === s.toLowerCase());//
    const hasLower = (s:string) => !(s === s.toUpperCase());//
    //////////////////////////////////////////////////////////

    // Обработчики ошибок
    const validatePass = (newPass:string) => {
        if (newPass.length < 7) {
            console.log('Короткий пароль');
            setPassError('Короткий пароль');
        }
        else if (!hasUpper(newPass)) {
            setPassError('Отсутствует заглавная буква');
        }
        else if (!hasLower(newPass)) {
            setPassError('Отсутствует строчная буква');
        }
        else if(!/[0-9]/.test(newPass)) {
            setPassError('Отсутствует цифра');
        }
        else {
            setPassError('');
        }
       
    }

    const validationEmail = (newEmail:string) => {
        !regExpEmail.test(newEmail) ? setEmailError('Неправильный формат email') : setEmailError('');
    }


    // Объект с функциями валидации
    const validations = {
        validatePass: validatePass,
        validationEmail: validationEmail,
    }

    const blurHandler = (e:any) => {
    
        switch (e.target.name)
        {
            case 'email':
                setEmailDirty(true);
                break;
            case 'pass':
                setPassDirty(true);
                break;
        }
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();

        if (emailError === '' && passError === '') {
            setActive(true);
            handleEmail('');
            handlePass('');
        }
    }

    return (
        <div className={classes.signIn}>

            <h1>Вход</h1>
             <hr />

             <form className={classes.form} onSubmit={handleSubmit}>

                {(emailDirty && emailError) && <p style={{color: 'red', fontSize: '12px'}}>{emailError}</p>}
                <Input blurHandler={blurHandler} 
                name={'email'} 
                value ={email} 
                action = {handleEmail} 
                description = {'Введите email'} 
                actions = {validations.validationEmail}/>
                
                {(passDirty && passError) && <p style={{color: 'red', fontSize: '12px'}}>{passError}</p>}
                <Input blurHandler={blurHandler}
                 name={'pass'}
                 value={pass} 
                 action = {handlePass} 
                 description = {'Введите пароль'}
                 isPass = {true} 
                 actions = {validations.validatePass}/>
               
                <Button />
            </form>

             <ul className={classes.links}>
                <li><NavLink to={'/sign-up'}>Зарегистрироваться</NavLink></li>
                <li><NavLink to={'/reset-password'}>Забыли пароль?</NavLink></li>
            </ul>

            <Success active={active} setActive = {setActive}>
                <h3>Вы успешно вошли в аккаунт!</h3>
                <p>Позравляем</p>
            </Success>
        </div>
    );
}

export default SignIn;