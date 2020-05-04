import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick

import './main.scss'

export default function Kalenteri() {

const [calendarWeekends, setCalendarWeekends] = React.useState(true)
const [calendarEvents, setCalendarEvents] = React.useState([  { title: 'Event Now', start: new Date() }])

    let calendarComponentRef = React.createRef()

   const  toggleWeekends = () => {
        setCalendarWeekends(!calendarWeekends);
        }
    

    const gotoPast = () => {
        let calendarApi = this.calendarComponentRef.current.getApi()
        calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
    }

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
            <div className='demo-app-top'>
                <button onClick={toggleWeekends}>toggle weekends</button>&nbsp;
          <button onClick={gotoPast}>go to a date in the past</button>&nbsp;
          (also, click a date/time to add an event)
        </div>
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
                    weekends={calendarWeekends}
                    events={calendarEvents}
                    dateClick={handleDateClick}
                />
            </div>
        </div>
    )



}



