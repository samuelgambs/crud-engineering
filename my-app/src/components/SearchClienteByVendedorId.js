import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import styles from './styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


class SearchAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', lista: [],
    activeItem: {
      nome: "",
      cpf: "",
      sexo: "",
      vendedor: ""
    },};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    let id = event.target.value;
    axios
      .get(`http://localhost:8000/api/clientes/?vendedor=${id}`)
      .then(res => this.setState({ lista: res.data }))
      .catch(err => console.log(err));
  }
  renderTable(lista) {

    return (
      <Table >
        <TableHead>
          <TableRow>
          <TableCell>Id</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Cpf</TableCell>
            <TableCell align="right">Sexo</TableCell>
            <TableCell align="right">Vendedor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lista.map((item) => (
            <TableRow key={item.id}>
            <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {item.nome}
              </TableCell>
              <TableCell align="right">{item.cpf}</TableCell>
              <TableCell align="right">{item.sexo === 'm' ? 'Masculino' : 'Feminino'  }</TableCell>
              <TableCell align="right">{item.vendedor}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }


  render () {
  const { classes } = this.props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            Busca Cliente pelo Id do Vendedor
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={this.state.value} onChange={this.handleChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Paper >
     {this.renderTable(this.state.lista)}
    </Paper>
    </div>
  );
    }
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchAppBar);
