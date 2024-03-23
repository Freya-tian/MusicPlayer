import React from "react";
import'./UserOption.scss'
import { Link } from "react-router-dom";

/**
 * 模板页面，
 * 
 */
type layoutProps = {
    children: React.ReactNode
}
function UserOption(props: layoutProps) {
    return (
        <div className="UserContainer">
            <Link to='/' className="logocontainer"></Link>

            {props.children}

            <Link to='/' className="logocontainerLast"></Link>
        </div>
    )
}
export default UserOption