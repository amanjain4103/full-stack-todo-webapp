import React from 'react';
import './Navbar.css'
import {  WaveLoading } from 'react-loadingg';


const Navbar = (props) => {
    return(
        <div className="nav">
            <span className="fullname">
                {props.fullname}
            </span>
            <a href="#" onClick={props.handleHome}>HOME</a>
            {(props.isLoggedIn===true)?
                <div>
                    <a href="#" onClick={props.handleLogout}>LOGOUT</a>
                    {(props.isSaveLoading!==true)?
                     (<a href="#" onClick={props.handleSave}>SAVE</a>):
                     (<span className="loadButton">
                        < WaveLoading color={"#000000"}/>
                      </span>)}
                    
                </div>:
                (
                    (props.currentRoute==="main")?
                        <div>
                            <a href="#" onClick={props.handleLogin}>LOGIN</a>
                            <a href="#" onClick={props.handleRegister}>REGISTER</a>
                        </div>
                        :(props.currentRoute==="registerpage")?
                        (
                            <div>
                                <a href="#" onClick={props.handleLogin}>LOGIN</a>
                            </div>
                        ):(props.currentRoute==="loginpage")?
                        (
                            <div>
                                <a href="#" onClick={props.handleRegister}>REGISTER</a>
                            </div>   
                        ):
                        <div>
                            <a href="#" onClick={props.handleLogout}>LOGOUT</a>
                        </div>
                )
            }
            

        </div>
    )
}

export default Navbar;