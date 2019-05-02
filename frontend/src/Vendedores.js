import React from 'react';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import FormErrors from './components/FormErrors'

export default class VendedoresTable extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        open: false,
        vendedores: [],
        activeItem: {
            nome: "",
            cpf: "",
          },
        formErrors: {nome: '',cpf:''},
        formValid:false
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount = () =>  {
    this.refreshList();
  };

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/vendedores/")
      .then(res => this.setState({ vendedores: res.data }))
      .catch(err => console.log(err));
  };

  createItem = item => {
      this.setState({  open: true, activeItem: ''});
  };

  editItem = item => {
    this.setState({  open: true,  activeItem: item});
  };

  saveItem = item  => {
    this.setState({ open: false });
    if (item.id) {
      axios
      .put(`http://localhost:8000/api/vendedores/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
      }
      axios
        .post("http://localhost:8000/api/vendedores/", item)
        .then(res => this.refreshList());
  };
  deleteItem = item => {
    try {
        axios
        .delete(`http://localhost:8000/api/vendedores/${item.id}/`)
        .then(res => this.refreshList());
      } catch (e) {
        window.Raven.captureException(e);
      }
  };

  handleChange = e => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value};
    this.setState({ activeItem, [name]: value},
      () => { this.validateField(name, value) });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nomeValid = this.state.activeItem.nome;
    let cpfValid = this.state.activeItem.cpf;

    switch(fieldName) {
      case 'nome':
        nomeValid = value.length >= 10;
        fieldValidationErrors.nome = nomeValid ? '': ' é muito curto';
        break;
      case 'cpf':
        cpfValid = value.length >= 10;
        fieldValidationErrors.cpf = cpfValid ? '': ' inválido';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    nomeValid: nomeValid,
                    cpfValid: cpfValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.nomeValid && this.state.cpfValid});
  }

  render() {

    return (
      <div>
      <Paper>
          <div align="right"   style={{paddingTop: 11, paddingRight: 20 }}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="Add"
              onClick={()=> this.createItem()}
            >
              <PersonAdd />
              Adicionar Vendedor
            </Fab>
          </div>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell align="right" >Cpf</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.vendedores.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                {item.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.nome}
                </TableCell>
                <TableCell align="right">{item.cpf}</TableCell>
                <TableCell align="right">
                <Fab size="small" color="primary" aria-label="Edit" onClick={() => this.editItem(item)} >
                  <Edit  />
                </Fab>
                <Fab size="small" color="primary" aria-label="Delete" onClick={() => this.deleteItem(item) } >
                  <Delete  />
                </Fab>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
      <DialogTitle id="form-dialog-title">Vendedor</DialogTitle>
      <DialogContent>
      <div className="panel panel-default">
        <FormErrors formErrors={this.state.formErrors} />
      </div>
        <TextField
            autoFocus
            required
            type="text"
            margin="dense"
            id="nome"
            name="nome"
            value={this.state.activeItem.nome}
            onChange={this.handleChange}
            placeholder="Nome"
            label="Nome:"
            fullWidth
          />
          <TextField
            required
            type="number"
            name="cpf"
            value={this.state.activeItem.cpf}
            onChange={this.handleChange}
            placeholder="cpf"
            label="Cpf:"
          />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button disabled={!this.state.formValid} onClick={() => this.saveItem(this.state.activeItem)} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    );
  }
}
