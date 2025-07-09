import {Outlet} from "react-router-dom";

export function Product() {
    return (
        <>
            <h1>Products header</h1>
            {/* Render các component con*/}
            <Outlet />
            <h1>Products footer</h1>
        </>
    );
};