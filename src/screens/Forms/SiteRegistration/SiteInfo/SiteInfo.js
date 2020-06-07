import React, { Component } from 'react';

import {
    TextField,
    Button,
    Grid,
    Typography,
    RadioGroup,
    Radio,
    FormControlLabel,
    FormControl,
    FormLabel,
    Paper
} from '@material-ui/core'

import {
    logout,
    removeAuthToken,
    getAuthToken
} from './../../../../actions/AuthAction/AuthAction';

import {
    postData,
    postDataEthics
} from '../../../../actions/FormActions/FormActions'

import {
    RTSuccess
} from './../../../../utilities/NotificationUtilities/NotificationUtilities';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            password: '',
            Ecvalue: 'NO',
            clinicname: '',
            telephone: 0,
            email: '',
            website: '',
            streetaddress: '',
            city: '',
            state: '',
            pincode: 0,
        }
    }

    componentDidMount = () => {
        this.initialLoad()
      };
      
      initialLoad = () => {
          let token = getAuthToken();
  
          if(token == null) {
              this.props.history.push("/")
          }
      }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleRadio = (event) => {
        this.setState({ Ecvalue: event.target.value });
    };

    handleSubmit = () => {
        const data = {
            clinic_name: this.state.clinicname,
            telephone: this.state.telephone,
            email: this.state.email,
            website: this.state.website,
            ec_available: this.state.Ecvalue,
            streetaddress: this.state.streetaddress,
            city: this.state.city,
            state: this.state.state,
            pincode: this.state.pincode,
            accept: "NO"
        }
        postData(data).then((res) => {
            console.log("Res", res)
            if (res.status === "success") {
                if (this.state.Ecvalue === "YES") {
                    RTSuccess(res.message)
                    this.props.history.push('/ethics-com')
                }
                else {
                    RTSuccess(res.message)
                    this.props.history.push('/userview')
                }
            }
        })
    }

    logout = () => {
        logout().then((res) => {
            console.log("logout response", res)
            if(res.status == "success") {
                removeAuthToken()
                RTSuccess(res.message)
                this.props.history.push("/")
            }
        })
    }

    render() {
        return (
            <div style={styles.root} >
                <Typography
                    style={styles.typography}
                >Site Information</Typography>
                <div>
                <Button
                    variant={`contained`} 
                    color={`primary`}
                    style={{marginRight: 10}}
                    onClick={() => {this.props.history.push("/userview")}} 
                >Registered sites</Button>
                <Button
                    variant={`contained`} 
                    color={`primary`}
                    style={{marginRight: 10}}
                    onClick={() => {this.props.history.push("/adminview")}} 
                >Admin</Button>
                <Button
                    variant={`contained`} 
                    color={`primary`}
                    onClick={() => this.logout()} 
                >Logout</Button>
                </div>
                <Grid container >
                    <Grid style={{ justifyContent: 'center' }} item xs={6} >
                        <Paper style={styles.paper} >
                            <div style={styles.divstyle} >
                                <TextField
                                    autoFocus
                                    required
                                    label="Clinic/Hospital Name"
                                    name={"clinicname"}
                                    style={styles.inputField}
                                    onChange={this.handleChange}
                                />
                                <br />
                                <TextField
                                    required
                                    label="Telephone"
                                    type="Number"
                                    name={"telephone"}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    style={styles.inputField}
                                // placeholder="Password"  
                                />
                                <br />
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
                                <br />
                                <TextField
                                    required
                                    label="Website"
                                    name={"website"}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    style={styles.inputField}
                                // placeholder="Password"  
                                />
                                <br />
                                <Typography>
                                    Ethics Committee Available?
                                </Typography>
                                <FormControl>
                                    <RadioGroup aria-label="gender" name="gender1" value={this.state.Ecvalue} onChange={this.handleRadio}>
                                        <FormControlLabel value="YES" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="NO" control={<Radio />} label="No" />
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
                                <br />
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
                                <br />
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
                                <br />
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
                                <br />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSubmit}
                >
                    Submit
              </Button>

            </div>
        );
    }
}

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        // height:window.innerHeight
    },
    inputField: {
        // width:
    },
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5
    },
    declaration: {
        marginTop: 20
    },
    paper: {
        margin: 10,
        display: 'flex',
        flexDirection: "column",
        alignItems: 'flex-start',
        height: 400
    },
    divstyle: {
        marginLeft: 20
    },
    button: {
        marginTop: 10
    },
    typography: {
        fontSize: 35,
        fontWeight: 'bolder'
    }
}

export default Login;

