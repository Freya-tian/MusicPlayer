import React from "react";
import UserOption from "./UserOpreation/UserOption";
import { Outlet } from "react-router-dom";
/**
 * 模板页面，
 * 
 */

function LayoutDefault() {
    return (
        <UserOption>
           <Outlet></Outlet>
        </UserOption>       
    )
}
export default LayoutDefault