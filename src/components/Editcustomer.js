import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Editcustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });
    const handleClickOpen = () => {
        console.log(props.customer);
        setCustomer(
            {
                firstname: props.customer.firstname,
                lastname: props.customer.lastname,
                streetaddress: props.customer.streetaddress,
                postcode: props.customer.postcode,
                city: props.customer.city,
                email: props.customer.email,
                phone: props.customer.phone
            });
        setOpen(true);
    };

    const handleClose = () => {
        props.updateCustomer(props.customer.links[0].href, customer);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Edit
      </Button>
            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Lisätään auto :)
          </DialogContentText>
          <TextField
                        autoFocus
                        margin="dense"
                        id="brand"
                        label="First name"
                        name="firstname"
                        value={customer.firstname}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        // autoFocus
                        margin="dense"
                        id="model"
                        label="Last name"
                        name="lastname"
                        value={customer.lastname}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        // autoFocus
                        margin="dense"
                        id="color"
                        label="Street address"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={inputChanged}
                        fullWidth
                    />

                    <TextField
                        // autoFocus
                        margin="dense"
                        id="name"
                        label="Postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={inputChanged}
                        fullWidth
                    />

                    <TextField
                        // autoFocus
                        margin="dense"
                        id="name"
                        name="city"
                        label="City"
                        value={customer.city}
                        onChange={inputChanged}
                        fullWidth
                    />

                    <TextField
                        // autoFocus
                        margin="dense"
                        id="name"
                        label="Email"
                        name="email"
                        value={customer.email}
                        onChange={inputChanged}
                        fullWidth
                    />

                    <TextField
                        // autoFocus
                        margin="dense"
                        id="name"
                        label="Phone"
                        name="phone"
                        value={customer.phone}
                        onChange={inputChanged}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleClose} color="primary">
                        Add
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}