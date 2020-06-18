import React from 'react';
import './Registerpage.css';
// import { FaGooglePlusG } from "react-icons/fa";
import {  WaveLoading } from 'react-loadingg';
import { GoogleLogin } from 'react-google-login';
 

  
class Registerpage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fullname:"",
            gmail:"",
            password:"",
            isLoading:false
        }
    }

    handleFullname = (event) => {
        this.setState({
            fullname:event.target.value
        })

    }

    handleGmail = (event) => {
        this.setState({
            gmail:event.target.value
        })

    }

    handlePassword = (event) => {
        this.setState({
            password:event.target.value
        })

    }

    handleRegisterForm = (event) => {
        event.preventDefault();
        
        this.setState({
            isLoading:true
        })

        let user={
            "fullname":this.state.fullname,
            "gmail":this.state.gmail,
            "password":this.state.password
        }
        fetch("https://sleepy-bayou-07933.herokuapp.com/register",{
            headers:{
                'Content-Type':'application/json'
            },
            method:"POST",
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(res => {
            //what should be done to response 
            this.setState({
                isLoading:true
            })

            if(res==="other"){
                alert("some error occured");
            }else if(res==="registered"){
                this.props.onRouteChangeInRegisterForm();
                alert("successfully registered");
            }else{
                this.props.onRouteChangeInRegisterForm();
                alert(" you are already registered , try login");
            }
        })
        .catch(err => {
            this.setState({
                isLoading:false
            })
            alert("can't reach to server")
            console.log(err)
        })

    }

    handleGoogleStuff = (response) => {

        let googleUser = {
            fullname:response.profileObj.name,
            gmail:response.profileObj.email,
            password:response.profileObj.googleId
        }
        // console.log(googleUser)
        this.setState({
            isLoading:true
        })

        fetch("https://sleepy-bayou-07933.herokuapp.com/register",{
            headers:{
                'Content-Type':'application/json'
            },
            method:"POST",
            body: JSON.stringify(googleUser)
        })
        .then(res => res.json())
        .then(res => {
            //what should be done to response 
            this.setState({
                isLoading:true
            })

            if(res==="other"){
                alert("some error occured");
            }else if(res==="registered"){
                this.props.onRouteChangeInRegisterForm();
                alert("successfully registered");
            }else{
                this.props.onRouteChangeInRegisterForm();
                alert(" you are already registered , try login");
            }
        })
        .catch(err => {
            this.setState({
                isLoading:false
            })
            alert("can't reach to server")
            console.log(err)
        })

    }

    render(){

        return (
            <div className="containertop">
                
                <form onSubmit={this.handleRegisterForm}>
                    <h1 style={{marginLeft:"30%"}}>REGISTER</h1>
                    <div>
                        <div>
                            <label htmlFor="fullname"><strong>Full Name</strong></label><br />
                            <input 
                             type="text" 
                             placeholder="Enter Full Name" 
                             name="fullname" 
                             required 
                             onChange={this.handleFullname}
                            />
                        </div>
                        <div>
                            <label htmlFor="gmail"><strong>E-mail</strong></label><br />
                            <input 
                             type="text" 
                             placeholder="Enter E-mail" 
                             name="gmail" 
                             required 
                             onChange={this.handleGmail}
                            />
                        </div> 
                        <div>
                            <label htmlFor="password"><strong>Password</strong></label><br />
                            <input 
                             type="password" 
                             placeholder="Enter Password"
                             name="password" 
                             required 
                             onChange={this.handlePassword}
                            />
                        </div>
                        <div className="google-button">
                            <GoogleLogin
                                clientId="705596275371-h2jpgadc7ggp9s1nc8qelforr5n89nkl.apps.googleusercontent.com"
                                buttonText="Continue With Google"
                                onSuccess={this.handleGoogleStuff}
                                onFailure={this.handleGoogleStuff}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        {/* <div><br />
                            <a href="#" onClick={this.handleGoogleStuff}>
                                <span>
                                    <FaGooglePlusG  />
                                </span>
                                CONTINUE WITH GOOGLE
                            </a>
                        </div> */}
                       
                        <div>
                            {this.state.isLoading===true?
                            <span className="loading">
                                <br /><br /><br /><br />< WaveLoading color={"#000000"}/>
                            </span>:
                            <button type="submit"><strong>REGISTER</strong></button>                
                            }
                        </div>
                        
                    </div>
                    
                </form>
            </div>
        )
    }
}


export default Registerpage;
