import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Vetovalikko from './Vetovalikko'

export default function Edittraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({ date: '', duration: '', activity: '', customer: '' });
    const handleClickOpen = () => {
        console.log(props.training);
        setTraining(
            {
                date: props.training.date,
                duration: props.training.duration,
                activity: props.training.activity,
                customer: props.training.customer

            });
        setOpen(true);
    };

    const handleClose = () => {
        props.updateTraining(props.training._links.self.href, training);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Edit
      </Button>
            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit training</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Lisätään auto :)
          </DialogContentText>
                    <Vetovalikko customers={props.customers} inputChanged={inputChanged} />

                    <TextField
                        // autoFocus
                        margin="dense"
                        id="activity"
                        label="Activity"
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        // autoFocus
                        margin="dense"
                        id="duration"
                        label="Duration"
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        fullWidth
                    />

                    <TextField
                        // autoFocus
                        margin="dense"
                        id="date"
                        label="Date"
                        name="date"
                        value={training.date}
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