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
  IconButton,
  Button
} from '@material-ui/core'

import PropTypes from 'prop-types'
import {
  getData,
  updateData
} from '../../../../actions/FormActions/FormActions'

import {
  RTSuccess
} from './../../../../utilities/NotificationUtilities/NotificationUtilities';

import DoneAllIcon from '@material-ui/icons/DoneAll';
import ClearIcon from '@material-ui/icons/Clear';

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

class AdminView extends Component {

  constructor(props) {
    super(props)

    this.state = {
      value: 0,
      data: []
    }

    this.initialLoad = this.initialLoad.bind(this)

  }

  componentDidMount() {
    this.initialLoad();
  }

  initialLoad = () => {
    getData().then(res => {
      console.log("Res :", res[0])
      if (res.status === "success") {
        this.setState({ data: res[0] })
      }
    })

  }

  handleAccept(id) {
    const data = {
      id: id,
      accept: "YES"
    }
    console.log(data)
    updateData(data)
      .then(res => {
        console.log("Response : ", res)
        RTSuccess(res.message)
        this.initialLoad()
      })
      .catch((err) => console.log("Error", err))
  }

  handleReject(id) {
    const data = {
      id: id,
      accept: "NO"
    }
    console.log(data)
    updateData(data)
      .then(res => {
        console.log("Response : ", res)
        RTSuccess(res.message)
        this.initialLoad()

      })
      .catch((err) => console.log("Error", err))
  }


  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
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
          textAlign: 'right',
          margin: 10
        }}
        >
          <Button
            variant={`contained`}
            color={`primary`}
            onClick={() => { this.props.history.push("/site-info") }}
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
                <TableCell align="right">Reject</TableCell>
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
                  <TableCell align="right">
                    <IconButton onClick={() => this.handleReject(row.id)} >
                      <ClearIcon style={{ color: 'red' }} />
                    </IconButton>
                  </TableCell>
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
                <TableCell align="right">Accept</TableCell>
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
                  <TableCell align="right">
                    <IconButton onClick={() => this.handleAccept(row.id)} >
                      <DoneAllIcon style={{ color: 'green' }} />
                    </IconButton>
                  </TableCell>
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
  root: {

  },
  table: {
    minWidth: 650
  }
}

AdminView.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
export default AdminView;