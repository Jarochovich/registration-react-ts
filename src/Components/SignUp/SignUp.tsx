import { useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import classes from './SignUp.module.css'
import { NavLink } from 'react-router-dom';
import Success from '../Success/Success';

function SignUp(props:any) {

    const [active, setActive] = useState(false);

    const regExpNumber = /\d/;
    const regExpEmail = /^[^\s@]+@[^\s@]{2,5}\.[^\s@]{2,3}$/;

    // Состояния
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [repeatPass, setRepeatPass] = useState('');

    const [nameDirty, setNameDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [passDirty, setPassDirty] = useState(false);
    const [repeatPassDirty, setRepeatPassDirty] = useState(false);

    const [nameError, setNameError] = useState('Имя не может быть пустым!');
    const [emailError, setEmailError] = useState('Email не может быть пустым!');
    const [passError, setPassError] = useState('Пароль не может быть пустым!');
    const [repeatPassError, setRepeatPassError] = useState('Пароли не совпадают!');

    // Изменения состояний
    const handleName = (newName:string) => {
        setName(newName);
    }

    const handleEmail = (newEmail:string) => {
        setEmail(newEmail);
    }

    const handlePass = (newPass:string) => {
        setPass(newPass);
    }

    const handleRepeatPass = (newRepeatPass:string) => {
        setRepeatPass(newRepeatPass);
    }

    // Обработчики ошибок
    const overlapPass = (newRepeatPass:string) => {
        pass !== newRepeatPass ? setRepeatPassError('Пароли не совпадают!') : setRepeatPassError('');
    }

    const overlapRepPass = (newPass:string) => {
        newPass !== repeatPass ? setRepeatPassError('Пароли не совпадают!') : setRepeatPassError('');
    }

    // Вспомогательные функции ///////////////////////////////
    const hasUpper = (s:string) => !(s === s.toLowerCase());//
    const hasLower = (s:string) => !(s === s.toUpperCase());//
    //////////////////////////////////////////////////////////
    
    const validatePass = (newPass:string) => {
        if (newPass.length < 7) {
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

    const validationName = (newName:string) => {
        if (newName.length < 2 || newName.length > 50) {
            setNameError('Неккоректная длина имени!');
        }
        else if (regExpNumber.test(newName)) {
            setNameError('В имени содержится цифра!');
        }
        else {
            setNameError('');
        }
    }

    // Объект с функциями валидации
    const validations = {
        overlapPass: overlapPass,
        validatePass: validatePass,
        validationEmail: validationEmail,
        validationName: validationName,
        overlapRepPass: overlapRepPass
    }

    // Прочие функции
    const blurHandler = (e:any) => {
    
        switch (e.target.name)
        {
            case 'name':
                setNameDirty(true);
                break;
            case 'email':
                setEmailDirty(true);
                break;
            case 'pass':
                setPassDirty(true);
                break;
            case 'repeatPass':
                setRepeatPassDirty(true);
                break;
        }
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();

        if (nameError === '' &&
            emailError === '' &&
            passError === '' &&
            repeatPassError === ''
        ) 
        {
            setActive(true);
            handleName('');
            handleEmail('');
            handlePass('');
            handleRepeatPass('');
        }
    }

    return (
        <div className={classes.SignUp}>
            <h1>Регистрация</h1>
            <hr />

            <form className={classes.form} onSubmit={handleSubmit}>

                {(nameDirty && nameError) && <p style={{color: 'red', fontSize: '12px'}}>{nameError}</p>}
                <Input blurHandler={blurHandler}
                name={'name'}
                value={name} 
                action = {handleName} 
                description = {'Введите имя'} 
                actions = {validations.validationName}/>
               

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
                

                {(repeatPassDirty && repeatPassError) && <p style={{color: 'red', fontSize: '12px'}}>{repeatPassError}</p>}
                <Input blurHandler={blurHandler} 
                name={'repeatPass'} 
                value={repeatPass} 
                action = {handleRepeatPass} 
                description = {'Повторите пароль'}
                isPass = {true} 
                actions = {validations.overlapPass}/>
                
                <Button>Регистрация</Button>
            </form>

            <ul className={classes.links}>
                <li><NavLink to={'/sign-in'}>У меня есть аккаунт</NavLink></li>
            </ul>

            <Success active={active} setActive = {setActive}>
                <h3>Вы успешно зарегистрировались!</h3>
                <p>Поздравляем</p>
            </Success>
        </div>
    );
}

export default SignUp;