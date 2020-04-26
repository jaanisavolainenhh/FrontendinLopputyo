import React from 'react';
// import React, { useState } from 'react'; //niin ei tarvis statessa käyttää React.usestate vaan usestate pelkästään
import 'react-table-v6/react-table.css'
import ReactTable from 'react-table-v6';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Addtraining from './Addtraining';
import Edittraining from './Edittraining';
import Moment from 'react-moment';
//import moment from 'moment';
import moment from 'moment-with-locales-es6';
export default function TrainingList() {
    const [trainings, setTrainings] = React.useState([]);
    const [customers, setCustomers] = React.useState([{customer: {firstname: "", lastname: ''}}]);

    const [open, setOpen] = React.useState(false);
    const [msg, setmsg] = React.useState('')


    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(
                data => {
                    
                    let datat = data;
                    datat.map((daa,index) =>
                    {
                        if(daa.customer!=null)
                        daa.customer.kokonimi = daa.customer.firstname+ ' ' + daa.customer.lastname
                    })
                   // console.log(datat)
                    //datat.map((daa))
                    setTrainings(datat)
                })
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
        getCustomers();

    }, [])

    const deleteTraining = (link) => {
        console.log(link)
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

    const addTraining = (car) => {
        fetch('https://customerrest.herokuapp.com/api/trainings/',
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
                console.log(car)
                setmsg('CAR ADDED');
                setOpen(true);
            }) //jos käytettäs parametria niin ois response _ sijaan
            .catch(err => console.error(err))
    }

    const updateTraining = (link, car) => {
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
        setOpen(false);
    }
    //TODO

    const columns = [

        {
            Header: 'Date',
            id: 'date',
            accessor: d => {
              return moment(d.date).locale('fi').format('L LT');
            }
            // Cell: row => (
            //     <Moment format="DD/MM/YYYY HH:mm" date={row.original.date} />)
        },
        {
            Header: 'Duration',
            accessor: 'duration',

        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Customer',
            accessor: 'customer.kokonimi',
        },
        // {
        //     //Header: 'testi',
        //     Cell: row => (
        //         <Edittraining customers={customers} training={row.original} updateTraining={updateTraining} />
        //     )
        // },
        {
            Cell: row => (
                <Button color="secondary" size="small" onClick={() => deleteTraining("https://customerrest.herokuapp.com/api/trainings/"+row.original.id)}>Delete</Button>)
        }
    ]


    return (
        <div>
            <Addtraining addTraining={addTraining} customers={customers} />
            <ReactTable data={trainings} columns={columns} defaultPageSize={10} filterable={true} />
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={msg}

            />

        </div>
    )
}