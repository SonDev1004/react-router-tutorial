import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form'
import yup from '../validation/yupGlobal.js';
import {yupResolver} from "@hookform/resolvers/yup/src/index.js";

const schema = yup.object({
    username: yup.string()
        .required('Required')
        .username('username invalid'),
    password: yup.string()
        .required('Required')
        .password('Password invalid'),
});

export default function Login({checkLogin}) {
    const[loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema),
    });


    useEffect(() => {
        const currentUser = localStorage.getItem('username');
        if (!currentUser) {
            navigate("/login");
        } else {
            checkLogin(true);
            navigate("/");
        }
    }, [])

    function onSubmit(data) {
        console.log(data)

        if(data.username === 'admin' && data.password === 'admin@123Aa@'){
            // localStorage.setItem('username', data.username);
            localStorage.username = data.username;
            data.username = '';
            data.password = '';
            navigate('/');
        } else {
            setLoginError("Invalid username or password");
        }
    }

    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-center  w-[400px] mx-auto mt-8 border p-4 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold py-4">Login page</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 w-full">
                        <label
                            htmlFor="username"
                            className="block text-gray-700 text-sm font-semibold mb-2">Username:</label>
                        <input
                            id='username'
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded focous:outline-none focus:ring-2 focous:ring-blue-400 transition duration-200"
                            placeholder="Username"
                            {...register('username')}
                        />

                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                    </div>
                    <div className="mb-4 w-full">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focous:outline-none focus:ring-2 focous:ring-blue-400 transition duration-200"
                            placeholder='Password'
                            {...register('password')}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    {loginError && <p className="text-red-500 text-sm mt-1">{loginError}</p>}
                    <button type='submit'
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200">
                        Login
                    </button>
                </form>
            </div>

        </div>
    );
}