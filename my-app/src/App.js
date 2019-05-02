import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './listItems';
import Clientes from './Clientes';
import Vendedores from './Vendedores';
import styles from './styles';
import SearchBar from './components/SearchBar';
import SearchClienteId from './components/SearchClienteId';
import SearchClienteByVendedorId from './components/SearchClienteByVendedorId';



class Dashboard extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      clientes: [],
      vendedores: [],
      open: true
    }
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>

          <Typography variant="h4" gutterBottom component="h2">
            Clientes
          </Typography>
          <div className={classes.tableContainer}>
            <Clientes />
            <SearchClienteId />
            <SearchClienteByVendedorId/>

          <Typography variant="h4" gutterBottom component="h2">
            Vendedores
          </Typography>
            <Vendedores />
            <SearchBar />
          </div>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: ""
};

export default withStyles(styles)(Dashboard);
