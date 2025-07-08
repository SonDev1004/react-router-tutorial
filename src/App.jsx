import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import './App.css'
import {useState} from "react";


function App() {
    const [isLogin, setIsLogin] = useState(null);

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("username");
        navigate("/login");
        alert("Logout successfully");
    }

    return (
        <div className="w-full">
            <div className="bg-gray-800 text-white py-4">
                <div className="container mx-auto flex justify-between items-center ">
                    <nav className="flex justify-between items-center h-[64px] ">
                        <Link className="px-6 py-2" to="/">Home</Link>
                        <Link className="px-6 py-2" to="/about">About</Link>

                    </nav>
                    <div className="flex items-center">
                        {!isLogin && <Link to="/login">Login</Link>}

                        {isLogin && <button onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </div>

            <Routes>
                <Route path="/" element={<Home checkLogin={setIsLogin}/>} />
                <Route path="/about" element={<About checkLogin={setIsLogin}/>} />
                <Route path="/login" element={<Login checkLogin={setIsLogin}/>} />
            </Routes>

        </div>
    );
}

export default App
