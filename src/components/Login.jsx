import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login({checkLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = localStorage.getItem('username');
        if (!currentUser) {
            navigate("/login");
        } else {
            checkLogin(true);
            navigate("/");
        }
    },[])

    function handleSubmit(e) {
        e.preventDefault();

        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('username', username);
            setUsername('');
            setPassword('');
            navigate("/");
        } else {
            alert('Invalid username or password');
        }
    }

    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-center  w-[400px] mx-auto mt-8 border p-4 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold py-4">Login page</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 w-full">
                        <label
                            htmlFor="username"
                            className="block text-gray-700 text-sm font-semibold mb-2">Username:</label>
                        <input
                            id='username'
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded focous:outline-none focus:ring-2 focous:ring-blue-400 transition duration-200"
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focous:outline-none focus:ring-2 focous:ring-blue-400 transition duration-200"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            required
                        />
                    </div>
                    <button type='submit'
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200">
                        Login
                    </button>
                </form>
            </div>

        </div>
    );
}