import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

export default function Vetovalikko(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
    //event.target.name = "customer";
   // console.log(event.target.value)
    props.inputChanged(event);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function Menuitemeja() {
    return (
        props.customers.map((customer, index) => {
        console.log(index)
        return (
          <MenuItem value={index}> {customer.firstname} {customer.lastname} </MenuItem>)
      })
    )
  }


  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Customer</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          name="customer"
          onChange={handleChange}
        >
          {/* <Menuitemeja customers={props.customers} /> */}
          {
            props.customers.map((customer, index) => {
              let id = customer.links[0].href;
              //console.log(id)
              //id = id.replace("https://customerrest.herokuapp.com/api/customers/","");
              //console.log(id);
              return (
                <MenuItem key={index} value={id} name="customer"> {customer.firstname} {customer.lastname} </MenuItem>)
            })
          }

        </Select>
      </FormControl>

    </div>
  );
}

//Miks tätä kutsuessa ei anna valita palikoita
