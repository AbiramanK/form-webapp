import React, { Component } from 'react';
 
import {    
        TextField,
        Button

} from '@material-ui/core'

import {
    setAuthToken,
    getAuthToken,
    login
} from '../../../../actions/AuthAction/AuthAction'
import { RTSuccess } from '../../../../utilities/NotificationUtilities/NotificationUtilities';

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             password:'',
        }
    }

    componentDidMount = () => {
      this.initialLoad()
    };
    
    initialLoad = () => {
        let token = getAuthToken();

        if(token != null) {
            this.props.history.push("/site-info")
        }
    }

    handleChange = (event) => {
        this.setState({ 
          [event.target.name]: event.target.value 
        });
      };

    handleSubmit = () =>{
        login(this.state.email , this.state.password).then((res)=>{
            if(res.status == "success") {
                RTSuccess(res.message)
                setAuthToken(res.access_token);
                this.props.history.push("/site-info")
            }
        })
    }
    
    render() { 
        return (
            <div style={styles.root} >
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
                >
                  Login
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
 
export default Login;