import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';



export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      clientes: [],
      vendedores: []
    }
  }

  componentDidMount() {
    let currentComponent = this;
    axios.get(`http://127.0.0.1:8000/v1/clientes/`)
      .then(function (response) {
        const res = response.data

        currentComponent.setState({
          clientes: res,
        })
      })

      .catch(function (error) {
        console.log(error);
      })
       axios.get(`http://127.0.0.1:8000/v1/vendedores/`)
      .then(function (response) {
        const res = response.data

        currentComponent.setState({
          vendedores: res,
        })
      })

      .catch(function (error) {
        console.log(error);
      })
  }

  render() {

    return (
      <div className="App">Teste</div>
      )
  }
}
