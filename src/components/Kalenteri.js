import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick

import './main.scss'

export default function Kalenteri() {

    const [trainings, setTrainings] = React.useState([]);

    const [calendarWeekends, setCalendarWeekends] = React.useState(true)
    const [calendarEvents, setCalendarEvents] = React.useState([
        { title: 'jee jee', start: '2020-05-04T16:20:15', end: '2020-05-04T21:20:15' },
        { title: 'Testi', start: '2020-05-04T20:20:15', end: '2020-05-04T22:22:15' },
        //{ title: 'Bla bla', start: '2020-05-04',end: '2020-05-05' }

    ])

    
    React.useEffect(() => {
        getTrainings();

    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(
                data => {

                    let datat = data;
                    luoEventit(datat)
                })
            .catch(err => console.error(err))
    }

    function luoEventit(data)
    {
        let eventit = Array();
        data.map((daa, index) => {
            let uusiDate = new Date(daa.date); //voi olla nulli ,ei väliä lopun kannalta eli ei checkiä.
            uusiDate.setMinutes(uusiDate.getMinutes()+daa.duration)
            if(daa.customer) //katsotaa että ei oo nulli kun tietokannassa voi olla nulliasiakkaita
                eventit.push({title: daa.activity+ " / "+daa.customer.firstname + " "+ daa.customer.lastname, start: daa.date, end: uusiDate})
        })
        setCalendarEvents(eventit);

    }

    let calendarComponentRef = React.createRef()

    //    const  toggleWeekends = () => {
    //         setCalendarWeekends(!calendarWeekends);
    //         }


    //     const gotoPast = () => {
    //         let calendarApi = this.calendarComponentRef.current.getApi()
    //         calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
    //     }

    const handleDateClick = (arg) => {
        // if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
        //     this.setState({  // add new event data
        //         calendarEvents: this.state.calendarEvents.concat({ // creates a new array
        //             title: 'New Event',
        //             start: arg.date,
        //             allDay: arg.allDay
        //         })
        //     })
        // }
    }



    return (
        <div className='demo-app'>

            <div className='demo-app-calendar'>
                <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    ref={calendarComponentRef}
                    // weekends={calendarWeekends}
                    events={calendarEvents}
                // dateClick={handleDateClick}
                />
            </div>
        </div>
    )



}



