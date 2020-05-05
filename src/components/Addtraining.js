import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Vetovalikko from './Vetovalikko'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function Addtraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({ date: '', duration: '', activity: '', customer: '' });

    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        let utckuntoon = training;
        utckuntoon.date = new Date(training.date); //0000 -> 0300gm tallentaa koneen gmt 0000 sijaan.
        props.addTraining(utckuntoon);
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
                Add Training
      </Button>
            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Training</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Lisätään Training :)
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
                    <form className={classes.container} noValidate>

                        <TextField
                            label="Date"
                            id="date"
                            name="date"
                            type="datetime-local"
                            //defaultValue=
                            value={training.date}
                            onChange={inputChanged}
                        // className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                    </form>


                    {/* <TextField
                        // autoFocus
                        margin="dense"
                        id="date"
                        label="Date"
                        name="date"
                        value={training.date}
                        onChange={inputChanged}
                        fullWidth
                    /> */}



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