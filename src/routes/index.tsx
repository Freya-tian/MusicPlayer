import { ReactNode, lazy } from "react";
import LayoutDefault from '../layouts/LayoutDefaule'
import LayoutMain from "../layouts/LayoutMain.tsx"

// import {   Outlet } from 'react-router-dom';
const Loginview = lazy(() => import("../views/Loginview/Loginiew.tsx"))

const Homeview = lazy(() => import("../views/Homeview/Homeview"))
const Registerview = lazy(() => import("../views/Registerview/Registerview.tsx"))


interface Route {
    path?: string,
    name?: string,
    element: ReactNode,
    children?: Route[],
    auth?: boolean
}
export const routes: Route[] = [
    {
        element: <LayoutDefault></LayoutDefault>,
        children: [
            {
                path: '/',
                element: <Homeview />,
            }
        ]
    },
    {
        element: <LayoutMain></LayoutMain>,
        children: [{
            path: '/Login',
            element: <Loginview />
        },
        {
            path: '/Register',
            element: <Registerview />


        }]

    },
]