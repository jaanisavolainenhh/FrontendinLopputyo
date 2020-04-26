import React from 'react';
// import React, { useState } from 'react'; //niin ei tarvis statessa käyttää React.usestate vaan usestate pelkästään
import 'react-table-v6/react-table.css'
import ReactTable from 'react-table-v6';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Addcar from './Addcar';
import Editcar from './Editcar';

export default function TrainingList() {
    const [customers, setCustomers] = React.useState([]);
    const [trainings, setTrainings] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setmsg] = React.useState('')

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings/')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    React.useEffect(() => {
        getTrainings();
    }, [])

    const deleteTraining = (link) => {
        if (window.confirm("Are youu sure?")) {
            fetch(link, { method: 'DELETE' })
                .then(_ => getTrainings())
                .then(_ => {
                    setmsg('TRAINING DELETED');
                    setOpen(true);
                })
                .catch(err => console.error(err))
        }
        console.log(link);
    }

    const deleteCustomer = (link) => {
        if (window.confirm("Are youu sure?")) {
            fetch(link, { method: 'DELETE' })
                .then(_ => getTrainings())
                .then(_ => {
                    setmsg('CUSOMTER DELETED');
                    setOpen(true);
                })
                .catch(err => console.error(err))
        }
        console.log(link);
    }


    const addCustomer = (car) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(car)
            }
        )
            .then(_ => getTrainings())
            .then(_ => {
                setmsg('CAR ADDED');
                setOpen(true);
            }) //jos käytettäs parametria niin ois response _ sijaan
            .catch(err => console.error(err))
    }

    const updateCustomer = (link, car) => {

        fetch(link,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(car)
            }
        )
            .then(_ => getTrainings())
            .then(_ => {
                setmsg('EDITED CAR');
                setOpen(true);
            }) //jos käytettäs parametria niin ois response _ sijaan
            .catch(err => console.error(err))

    }


    const handleClose = () => {
        console.log("sulkeudu paska");
        setOpen(false);
    }

    const columns = [

        {
            Header: 'First Name',
            accessor: 'firstname'
        },
        {
            Header: 'Last name',
            accessor: 'lastname'
        },
        {
            Header: 'Street Address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'City'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            Cell: row => (
                <Editcar car={row.original} updateCustomer={updateCustomer} />
            )
        },
        {
            Cell: row => (
                <Button color="secondary" size="small" onClick={() => deleteCustomer(row.original._links.self.href)}>Delete</Button>)
        }


    ]


    return (
        <div>
            <Addcar addCar={addCustomer} />
            <ReactTable data={customers} columns={columns} defaultPageSize={10} filterable={true} />
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={msg}

            />

        </div>
    )
}