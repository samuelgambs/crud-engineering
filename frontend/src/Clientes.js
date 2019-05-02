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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import PersonAdd from '@material-ui/icons/PersonAdd';


export default class ClientesTable extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      clientes: [],
      open: false,
      activeItem: {
        nome: "",
        cpf: "",
        sexo: "",
        vendedor: ""
      },
    }
  }

  renderTemplates(templates, currentValue) {
    if (!templates || !Array.isArray(templates)) {
      return null;
    }

    return (

      <TextField
      select
      required
      SelectProps={{ native: true }}
      title="Vendedor"
      label="Vendedor"
      name="vendedor"
      id="vendedor"
      onChange={this.handleChange}
      value={currentValue}

      >
      <option value="" ></option>
      {templates.map(msgTemplate => (
        <option key={msgTemplate.id} value={msgTemplate.nome}>
            {msgTemplate.nome}
        </option>
      ))}
      </TextField>
    )
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.refreshList();
  };

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/clientes/")
      .then(res => this.setState({ clientes: res.data }))
      .catch(err => console.log(err));
    axios
      .get("http://localhost:8000/api/vendedores/")
      .then(res => this.setState({ vendedores: res.data }))
      .catch(err => console.log(err));
    };

  createItem = item => {
    this.setState({  open: true, activeItem: ''});
  }

  editItem = item => {
    this.setState({  open: true,  activeItem: item});
    this.refreshList();
  };

  saveItem = item  => {
    this.setState({ open: false });

    if (item.id) {
      axios
        .put(`http://localhost:8000/api/clientes/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
      axios
        .post("http://localhost:8000/api/clientes/", item)
        .then(res => this.refreshList());
    };

  deleteItem = item => {
    try {
        axios
        .delete(`http://localhost:8000/api/clientes/${item.id}/`)
        .then(res => this.refreshList());
      } catch (e) {
        window.Raven.captureException(e);
      }
    };

  handleChange = e => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  render() {
    return (
      <div>
      <Paper >
        <div align="right"   style={{paddingTop: 11, paddingRight: 20 }}>
          <Fab
            variant="extended"
            size="small"
            color="primary"
            aria-label="Add"
            onClick={()=> this.createItem()}
          >
          <PersonAdd />
            Adicionar Cliente
          </Fab>
        </div>
        <Table >
          <TableHead>
            <TableRow>
            <TableCell>Id</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Cpf</TableCell>
              <TableCell align="right">Sexo</TableCell>
              <TableCell align="right">Vendedor</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.clientes.map((item) => (
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
      <DialogTitle id="form-dialog-title">Cliente</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          maxLength="40"
          minLength="4"
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
          <TextField
            select
            SelectProps={{ native: true }}
            title="Gênero"
            label="Gênero"
            name="sexo"
            onChange={this.handleChange}
            value={this.state.activeItem.sexo}
          >
            <option value="" />
            <option value="f">Feminino</option>
            <option value="m">Masculino</option>
          </TextField>
          {this.renderTemplates(this.state.vendedores, this.state.activeItem.vendedor)}
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={() => this.saveItem(this.state.activeItem)} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  );
  }
}

