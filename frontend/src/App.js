import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Clientes from './Clientes';
import Vendedores from './Vendedores';
import styles from './styles';
import SearchVendedorId from './components/SearchVendedorId';
import SearchClienteId from './components/SearchClienteId';
import SearchClienteByVendedorId from './components/SearchClienteByVendedorId';


class Dashboard extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>

          <div className={classes.tableContainer}>
            <Typography variant="h4" gutterBottom component="h2">
              Clientes
            </Typography>
            <Clientes />
            <SearchClienteId />
            <SearchClienteByVendedorId/>
            <Typography variant="h4" gutterBottom component="h2">
              Vendedores
            </Typography>
            <Vendedores />
            <SearchVendedorId />
          </div>
        </main>
      </div>
    );
  }
}



export default withStyles(styles)(Dashboard);
