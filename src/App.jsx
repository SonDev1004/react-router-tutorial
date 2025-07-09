import {Routes, Route, Link, useNavigate, useRoutes} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import './App.css'
import React, {useState} from "react";
import {NotFound} from "./components/NotFound.jsx";
import {Product} from "./components/product/Product.jsx";
import {Laptop} from "./components/product/Laptop.jsx";
import {Mobile} from "./components/product/Mobile.jsx";
import {BestSeller} from "./components/product/BestSeller.jsx";
import {Courses} from "./components/course/Courses.jsx";
import {CourseDetail} from "./components/course/CourseDetail.jsx";
import AddCourse from "./components/course/AddCourse.jsx";
import EditCourse from "./components/course/EditCourse.jsx";
import CourseType from "./components/course/CourseType.jsx";
import PrivateRoutes from "./components/privateRouter/PrivateRoutes.jsx";
import Personal from "./components/privateRouter/Personal.jsx";
import Account from "./components/privateRouter/Account.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

const LazyAbout = React.lazy(() => import('./components/About.jsx'));


function App() {
    const [isLogin, setIsLogin] = useState(null);

    const navigate = useNavigate();

    const routes = [
        {element: <ScrollToTop/>},
        {
            element: <PrivateRoutes/>,
            children: [
                {path: '/personal', element: <Personal/>},
                {path: '/account', element: <Account/>},
            ]
        },
        {path: "/", element: <Home checkLogin={setIsLogin}/>},
        {
            path: '/about', element: (
                <React.Suspense fallback={<div>Loading...</div>}>
                    <LazyAbout checkLogin={setIsLogin}/>
                </React.Suspense>
            )
        },
        {path: '/login', element: <Login checkLogin={setIsLogin}/>},
        {
            path: '/product', element: <Product checkLogin={setIsLogin}/>, children: [
                {index: true, element: <BestSeller/>},
                {path: 'laptop', element: <Laptop/>},
                {path: 'mobile', element: <Mobile/>},
            ]
        },
        {path:'/courses', element: <Courses />},
        {path:'/courses/add-course', element: <AddCourse />},
        {path:'/courses/edit-course', element: <EditCourse />},
        {path:'/courses/:courseType/:courseId', element: <CourseDetail />},
        {path:'/courses/:courseType', element: <CourseType/>},
        {path: '*', element: <NotFound/>}
    ];

    const elementRoutes = useRoutes(routes);

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
                        <Link className="px-6 py-2" to="/product">Product</Link><Link className="px-6 py-2"
                                                                                      to="/product/mobile">Mobile</Link>
                        <Link className="px-6 py-2" to="/product/laptop">Laptop</Link>

                    </nav>
                    <div className="flex items-center">
                        {!isLogin && <Link to="/login">Login</Link>}

                        {isLogin && <button onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </div>
            {elementRoutes}

            {/*<Routes>*/}
            {/*    <Route element={<PrivateRoutes/>}>*/}
            {/*        <Route path='/personal' element={<Personal/>}/>*/}
            {/*        <Route path='/account' element={<Account/>}/>*/}
            {/*    </Route>*/}

            {/*    <Route path="/" element={<Home checkLogin={setIsLogin}/>}/>*/}

            {/*    /!*Lazy loading*!/*/}
            {/*    <Route*/}
            {/*        path="/about"*/}
            {/*        element={*/}
            {/*            <React.Suspense fallback={<div>Loading...</div>}>*/}
            {/*                <LazyAbout checkLogin={setIsLogin}/>*/}
            {/*            </React.Suspense>*/}
            {/*        }/>*/}
            {/*    <Route path="/login" element={<Login checkLogin={setIsLogin}/>}/>*/}

            {/*    <Route path="/product" element={<Product checkLogin={setIsLogin}/>}>*/}
            {/*        <Route index element={<BestSeller/>}/>*/}
            {/*        <Route path="laptop" element={<Laptop/>}/>*/}
            {/*        <Route path="mobile" element={<Mobile/>}/>*/}
            {/*    </Route>*/}

            {/*    /!*Courses*!/*/}
            {/*    <Route path="/courses" element={<Courses/>}/>*/}
            {/*    <Route path="/courses/add-course" element={<AddCourse/>}/>*/}
            {/*    <Route path="/courses/edit-course" element={<EditCourse/>}/>*/}
            {/*    <Route path="/courses/:courseType/:courseId" element={<CourseDetail/>}/>*/}
            {/*    <Route path="/courses/:courseType/" element={<CourseType/>}/>*/}


            {/*    <Route path="*" element={<NotFound/>}/>*/}
            {/*</Routes>*/}

        </div>
    );
}

    export default App
