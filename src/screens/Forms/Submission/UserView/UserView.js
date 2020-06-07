import React, { Component } from 'react';

import {
    Typography,
    Tab,
    Tabs,
    AppBar,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button
} from '@material-ui/core'

import PropTypes from 'prop-types'
import {
  getData

} from '../../../../actions/FormActions/FormActions'

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={2}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
 
class UserView extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             value:0,
             data:[]
        }

        this.initialLoad=this.initialLoad.bind(this)
    }

    componentDidMount(){
      this.initialLoad();
    }

    initialLoad = () =>{
        getData().then(res=>{
          if(res.status === "success"){
            this.setState({data:res[0]})
          }
        })

    }
    
    createData(name, website, EC_committe ) {
      return { name, website, EC_committe };
    }
    
    rows = [
      this.createData('Frozen yoghurt', 159, 6.0),
      this.createData('Ice cream sandwich', 237, 9.0 ),
      this.createData('Eclair', 262, 16.0  ),
      this.createData('Cupcake', 305, 3.7 ),
      this.createData('Gingerbread', 356, 16.0),
    ];
    
    handleChange = (event, newValue) => {
        this.setState({value:newValue});
      };


    tabNav(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
    
    render() { 
        return (
            <div style={styles.root}>
            <div style={{
                  display: 'flex', 
                  flexDirection: "row", 
                  justifyContent: 'space-between',
                  margin: 10
                }
            }>
              <Button 
                variant={`contained`}
                color={`primary`}
                onClick={this.initialLoad} 
              >Refresh</Button>
              <Button
                variant={`contained`}
                color={`primary`}
                onClick={() => this.props.history.push("/site-info")} 
              >Home</Button>
            </div>
                <AppBar position="static">
                    <Tabs value={this.state.value} 
                          onChange={this.handleChange} 
                          aria-label="simple tabs example"
                          variant="fullWidth" >
                    <Tab label="Accepted" {...this.tabNav(0)} />
                    <Tab label="Not Accepted" {...this.tabNav(1)} /> 
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}> 
                  <Table style={styles.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Website</TableCell> 
                        <TableCell align="right">EC_committe</TableCell> 
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.data.map((row) => (
                        row.accept === "YES" &&
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.clinic_name}
                          </TableCell>
                          <TableCell align="right">{row.website}</TableCell>
                          <TableCell align="right">{row.ec_available}</TableCell>  
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                  <Table style={styles.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Website</TableCell> 
                          <TableCell align="right">EC_committe</TableCell> 
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {this.state.data.map((row) => (
                        row.accept === "NO" &&
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.clinic_name}
                          </TableCell>
                          <TableCell align="right">{row.website}</TableCell>
                          <TableCell align="right">{row.ec_available}</TableCell>  
                        </TableRow>
                      ))}
                      </TableBody>
                    </Table>
                </TabPanel>
            </div>
        );
    }
}
 

const styles = {
    root:{

    },
    table:{
      minWidth:650
    }
}

UserView.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
export default UserView;