import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';
import { Redirect } from 'react-router-dom';
// import './LoginForm.css';

const LoginFormPage = () => {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser) return (
        <Redirect to='/' />
    );

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([]);
        const user = {
            credential,
            password
        };
        try {
            await dispatch(login(user));
        } catch (err) {
            let resBody = await err.json();
            setErrors(resBody.errors);
        }
        setPassword('');
    }

    return (
        <div className='form-page'>
            <div className={errors.length ? 'errors-div' : 'errors-hidden'}>
                <ul className='errors-ul'>
                    {errors.map((error, index) => (
                            <li key={index}>
                                {error}
                            </li>
                        ))}
                </ul>
            </div>
            <form
            className='auth-form'
                onSubmit={handleSubmit}
            >
                <div className='auth-form-field'>
                    <label htmlFor='credential'>
                        Username or Email Address:
                    </label>
                    <input
                        type='text'
                        name='credential'
                        id='credential'
                        onChange={e => setCredential(e.target.value)}
                        value={credential}
                        className='auth-form-input'
                    >
                    </input>
                </div>
                <div className='auth-form-field'>
                    <label htmlFor='password'>
                        Password:
                    </label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        className='auth-form-input'
                    >
                    </input>
                </div>
                <button className='auth-button'>
                    Log In
                </button>
            </form>
        </div>
    )
}

export default LoginFormPage;