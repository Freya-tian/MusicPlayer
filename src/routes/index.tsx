import { ReactNode, lazy } from "react";
import LayoutDefault from '../layouts/LayoutDefaule'
import LayoutMain from "../layouts/LayoutMain.tsx"

// import {   Outlet } from 'react-router-dom';
const Loginview = lazy(() => import("../views/Loginview/Loginiew.tsx"))

const Homeview = lazy(() => import("../views/Homeview/Homeview"))
const Registerview = lazy(() => import("../views/Registerview/Registerview.tsx"))
const Playing = lazy(() => import("../views/Playingview/Playing.tsx"))
const MyMuic = lazy(()=>import('../views/MyMusic/MyMusic.tsx'))
const Search = lazy(()=>import('../views/Search/Search.tsx'))

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
            },{
                path: '/Playing',
                element: <Playing />
    
    
            },
           {
                path: '/My',
                element: <MyMuic />  
            },{
                path:'/search',
                element:<Search/>
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


        },
       
    ]

    },
]