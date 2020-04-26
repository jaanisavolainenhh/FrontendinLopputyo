import React from 'react';
// import React, { useState } from 'react'; //niin ei tarvis statessa käyttää React.usestate vaan usestate pelkästään
import 'react-table-v6/react-table.css'
import ReactTable from 'react-table-v6';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Addtraining from './Addtraining';
import Edittraining from './Edittraining';
import Moment from 'react-moment';
import moment from 'moment';

export default function TrainingList() {
    const [trainings, setTrainings] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setmsg] = React.useState('')

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings/')
            .then(response => response.json())
            .then(
                data => {
                    let datat = data.content;
                    datat.map((aika, index) => {
                        console.log(aika.date)
                    }
                    );

                    console.log(data.content)
                    setTrainings(data.content)


                })
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
        console.log("sulkeudu paska");
        setOpen(false);
    }
    //TODO

    const columns = [

        {
            Header: 'Date',
            accessor: 'date',
            Cell: row => (
                <Moment format="DD/MM/YYYY HH:mm" date={row.original.date} />)
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
            accessor: 'customer'
        },

        {
            //Header: 'testi',
            Cell: row => (
                <Edittraining car={row.original} updateTraining={updateTraining} />
            )
        },
        {
            Cell: row => (
                <Button color="secondary" size="small" onClick={() => deleteTraining(row.original._links.self.href)}>Delete</Button>)
        }


    ]


    return (
        <div>
            <Addtraining addTraining={addTraining} />
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