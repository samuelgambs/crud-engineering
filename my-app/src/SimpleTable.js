import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './styles';
let id = 0;

export default class SimpleTable extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      clientes: []
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
  }

  render() {


  return (
    <Paper >
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Cpf</TableCell>
            <TableCell align="right">Sexo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.clientes.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.nome}
              </TableCell>
              <TableCell align="right">{item.cpf}</TableCell>
              <TableCell align="right">{item.sexo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
