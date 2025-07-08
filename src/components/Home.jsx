import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Home({checkLogin}) {

    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = localStorage.getItem('username');
        if (!currentUser) {
            navigate("/login");
        } else {
            checkLogin(true);
        }
    })


    return (
        <div>
            <h1 className="text-3xl font-bold underline">Home page</h1>
        </div>
    );
}