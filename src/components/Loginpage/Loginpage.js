import React from 'react';
import './Loginpage.css';
// import { FaGooglePlusG } from "react-icons/fa";
import {  WaveLoading } from 'react-loadingg';
import { GoogleLogin } from 'react-google-login';


class Loginpage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            gmail:"",
            password:"",
            isLoading:false
        }
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

    handleLoginForm = (event) => {
        event.preventDefault();
        this.setState({
            isLoading:true
        })
        let user={
            "gmail":this.state.gmail,
            "password":this.state.password
        }

        fetch("https://sleepy-bayou-07933.herokuapp.com/login",{
            headers:{
                'Content-Type':'application/json'
            },
            method:"POST",
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(res => {
            //what should be done to response 
            if(res==="wrongMail"){
                this.setState({
                    isLoading:false
                })
                alert("you have entered wrong mail");
            }else if(res==="wrongPassword"){
                this.setState({
                    isLoading:false
                })
                alert("you have entered a wrong password");
            }else if(res==="other"){
                this.setState({
                    isLoading:false
                })
                alert("can't reach server");
            }else{
                this.setState({
                    isLoading:false
                })
                this.props.whenLoginFormRecieveData(res)
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

        fetch("https://sleepy-bayou-07933.herokuapp.com/login",{
            headers:{
                'Content-Type':'application/json'
            },
            method:"POST",
            body: JSON.stringify(googleUser)
        })
        .then(res => res.json())
        .then(res => {
                //what should be done to response 
                if(res==="wrongMail"){
                    this.setState({
                        isLoading:false
                    })
                    alert("you have entered wrong mail");
                }else if(res==="wrongPassword"){
                    this.setState({
                        isLoading:false
                    })
                    alert("you have entered a wrong password");
                }else if(res==="other"){
                    this.setState({
                        isLoading:false
                    })
                    alert("can't reach server");
                }else{
                    this.setState({
                        isLoading:false
                    })
                    this.props.whenLoginFormRecieveData(res)
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
        return(
            <div className="containertop">
    
                <form onSubmit={this.handleLoginForm}>
                    <h1 style={{marginLeft:"30%"}}>LOG IN</h1>
                    <div>
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
    
                        <div>
                            <GoogleLogin
                                clientId="705596275371-h2jpgadc7ggp9s1nc8qelforr5n89nkl.apps.googleusercontent.com"
                                buttonText="Continue With Google"
                                onSuccess={this.handleGoogleStuff}
                                onFailure={this.handleGoogleStuff}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                       
                        <div>
                        {this.state.isLoading===true?
                            <span className="loading">
                                <br /><br /><br /><br />< WaveLoading color={"#000000"}/>
                            </span>:
                            <button type="submit"><strong>LOG IN</strong></button>                
                            }
                                          
                        </div>
                        
                    </div>
                    
                </form>
            </div>
        )
    }

}

export default Loginpage;
