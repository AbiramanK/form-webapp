import React, { Component } from 'react';
 
import {    
        TextField,
        Button,
        Grid,
        Typography,
        RadioGroup,
        Radio,
        FormControlLabel, 
        Checkbox,
        FormControl,
        Paper

} from '@material-ui/core'

import {
        postData,
        postDataEthics
} from '../../../../actions/FormActions/FormActions'
import { RTSuccess } from '../../../../utilities/NotificationUtilities/NotificationUtilities';

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
               name:'',
               telephone:0,
               email:'',
               website:'',
               is_ecno_available:'',
               streetaddress:'',
               city:'',
               state:'',
               pincode:0,
               ec_reg_no:0,
               checked:false
        }
    }

    handleChange = (event) => {
        this.setState({ 
          [event.target.name]: event.target.value 
        });
      };

    handleRadio = (event) => {
       this.setState({is_ecno_available:event.target.value});
      };
    
      handleCheck = () =>{
          this.setState({checked:!this.state.checked})
      }

      handleSubmit = () =>{
            const data = {
               name:this.state.name,
               telephone:this.state.telephone,
               email:this.state.email,
               website:this.state.website,
               is_ecno_available:this.state.is_ecno_available,
               streetaddress:this.state.streetaddress,
               city:this.state.city,
               state:this.state.state,
               pincode:this.state.pincode,
               ec_reg_no:this.state.ec_reg_no,
            }
        console.log(data)
        if(this.state.checked){
            postDataEthics(data).then((res)=>{
                if(res.status === "success"){
                    RTSuccess("SuucessFully registered")
                    this.props.history.push('/userview')
                }
            console.log(res)
         })
        }
        
      }
    
    render() { 
        return (
            <div style={styles.root} >
                <Typography 
                        style={styles.typography}
                    >Ethics Committee</Typography>
                    <div>
                <Button
                    variant={`contained`} 
                    color={`primary`}
                    style={{marginRight: 10}}
                    onClick={() => {this.props.history.push("/site-info")}} 
                >Home</Button>
                </div>
                <Grid container xs={12} >
                    <Grid  item xs={6} >
                        <Paper style={styles.paper} >
                            <div style={styles.divstyle} >
                                <TextField 
                                    autoFocus
                                    required 
                                    label="Name"
                                    name={"name"}   
                                    style={styles.inputField}  
                                    onChange={this.handleChange}
                                    /> 
                                    <br/>
                                <TextField 
                                            required 
                                            label="Telephone" 
                                            onChange={this.handleChange}
                                            margin="normal"
                                            name={"telephone"}   
                                           style={styles.inputField}
                                            // placeholder="Password"  
                                            />
                                            <br/>
                                <TextField 
                                            required
                                            id="email"
                                            type="email"
                                            label="email"
                                            name={"email"}
                                            onChange={this.handleChange}
                                            margin="normal"

                                            style={styles.inputField}
                                            // placeholder="Password"  
                                            />
                                            <br/>
                                <TextField 
                                            required 
                                            label="Website"
                                            onChange={this.handleChange}
                                            margin="normal"
                                            name={"website"}   
                                            style={styles.inputField}
                                            // placeholder="Password"  
                                            />
                                            <br/>
                                <Typography>
                                        Ethics Committee registered with CDSCO?
                                </Typography> 
                                <FormControl>
                                <RadioGroup aria-label="gender" name="gender1" value={this.state.is_ecno_available} onChange={this.handleRadio}>
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" /> 
                                </RadioGroup>
                                </FormControl>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} > 
                        <Paper style={styles.paper} >
                            <div style={styles.divstyle} >
                                <TextField 
                                            required
                                            id="Street Address"
                                            type="Street Address"
                                            label="Street Address"
                                            name={"streetaddress"}
                                            onChange={this.handleChange}
                                            margin="normal"
                                            style={styles.inputField}
                                            // placeholder="Password"  
                                            />
                                <br/>
                                <TextField 
                                            required
                                            id="City"
                                            type="City"
                                            label="City"
                                            name={"city"}
                                            onChange={this.handleChange}
                                            margin="normal"
                                            style={styles.inputField}
                                            // placeholder="Password"  
                                            />
                                            <br/>
                                <TextField 
                                            required
                                            id="State"
                                            type="State"
                                            label="State"
                                            name={"state"}
                                            onChange={this.handleChange}
                                            margin="normal"
                                            style={styles.inputField}
                                            // placeholder="Password"  
                                            />
                                            <br/>
                                <TextField 
                                            required
                                            id="PinCode"
                                            type="PinCode"
                                            label="PinCode"
                                            name={"pincode"}
                                            onChange={this.handleChange}
                                            margin="normal"
                                            style={styles.inputField}
                                            // placeholder="Password"  
                                            />
                                            <br/>
                                <TextField  disabled={this.state.is_ecno_available === "Yes"?false:true}
                                            required 
                                            label="EC No"
                                            onChange={this.handleChange}
                                            margin="ec_reg_no"
                                            style={styles.inputField} 
                                            // placeholder="Password"  
                                            />
                                
                        </div>
                        </Paper>
                    </Grid>
                </Grid>

                <div style={styles.checkbox} >
                    <Checkbox 
                        onChange={this.handleCheck} 
                        color="default"
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                    />
                    <Typography style={styles.declaration} >I hereby declare that all above-mentioned information is in accordance with fact or truth
                                up to my knowledge and I bear the responsibilities for the correctness of the above-mentioned
                                particulars
                    </Typography>
                </div>
               <Button
                  variant="contained"
                  color="primary" 
                  style={styles.button}
                  onClick={this.handleSubmit}
                >
                  Submit
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
        // height:window.innerHeight
    },
    inputField:{
        width:'90%'
    },
    checkbox:{
        display:'flex',
        flexDirection:'row',
        marginTop:5
    },
    declaration:{
        marginTop:20
    },
    paper:{
        margin:10,  
        display:'flex',
        flexDirection:"column",
        alignItems: 'flex-start',
        height:400
    },
    divstyle:{
        marginLeft:20
    },
    button:{
        marginTop:10
    },
    typography:{
        fontSize:35,
        fontWeight:'bolder'
    }
}
 
export default Login;