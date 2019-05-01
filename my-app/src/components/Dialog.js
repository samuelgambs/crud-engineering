import React, { Component } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class CustomDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }

  handleChange = e => {
    let { nome, cpf, sexo, vendedor } = e.target;

    const activeItem = { ...this.state.activeItem};
    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Dialog open={this.state.dialog}
      onClose={this.handleClose}
      aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" toggle={toggle}> Editar Cliente</DialogTitle>
        <DialogContent>
              <TextField
              autoFocus
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
        </DialogContent>
        <DialogContent>
              <TextField
                type="text"
                name="cpf"
                value={this.state.activeItem.cpf}
                onChange={this.handleChange}
                placeholder="cpf"
                label="Cpf:"
              />
        </DialogContent>
        <DialogContent>
              <TextField
                type="text"
                name="sexo"
                value={this.state.activeItem.sexo}
                onChange={this.handleChange}
                placeholder="sexo"
                label="Sexo:"
              />
        </DialogContent>
        <DialogContent>
              <TextField
                type="text"
                name="vendedor"
                value={this.state.activeItem.vendedor}
                onChange={this.handleChange}
                placeholder="vendedor"
                label="Vendedor"
              />
        </DialogContent>
        <DialogActions>
        <Button onClick={this.handleClose} color="primary">
              Cancel
        </Button>
          <Button color="primary" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
