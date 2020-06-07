import React, { Component } from 'react';
 
import {    
        TextField,
        Button

} from '@material-ui/core'

import {
        register
} from '../../../../actions/AuthAction/AuthAction'
class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:'',
             email:'',
             password:'',
        }
    }

    handleChange = (event) => {
        this.setState({ 
          [event.target.name]: event.target.value 
        });
      };
    
    handleSubmit = () =>{
        const data = {
            name:this.state.name , 
            email:this.state.email , 
            pass:this.state.password,
        }
    console.log("Data :" ,data )
      register(this.state.name , this.state.email , this.state.password).then((res)=>{
          console.log("Reg Res : " , res)
      })
    }

    render() { 
        return (
            <div style={styles.root} >
                   <TextField 
                        required
                        id="name"
                        type="name"
                        label="Name"
                        name={"name"} 
                        margin="normal"
                        variant="filled"
                        style={styles.inputField} 
                        // placeholder="Email"
                        onChange={this.handleChange}
                        /> 
                <br/>
               <TextField 
                        required
                        id="email"
                        type="email"
                        label="Email"
                        name={"email"} 
                        margin="normal"
                        variant="filled"
                        style={styles.inputField} 
                        // placeholder="Email"
                        onChange={this.handleChange}
                        /> 
                <br/>
               <TextField 
                        required
                        id="password"
                        type="password"
                        label="Password"
                        name={"password"}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="filled"
                        style={styles.inputField}
                        // placeholder="Password"  
                        />
               
               <Button
                  variant="contained"
                  color="primary"
                //   style={styles.loginButton}
                  onClick={this.handleSubmit}
                >Register
              </Button>

            </div>
        );
    }
}

const styles = {
    root:{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
        height:window.innerHeight
    },
    inputField:{
        width:'50%'
    }
}
 
export default Register;