import React from 'react';
import './App.css';

interface IEvent {
  attendees:IAttendee
}
interface IAttendee {
  costs:string
  resource_uri: string
  barcodes: string
  answers: string
}

const App = () => {

  const reponseAttendees = async ():Promise<IEvent> => {
    return await fetch(`${process.env.REACT_APP_URL}/${process.env.REACT_APP_EVENT_ID}/${process.env.REACT_APP_CATEGORY}/?status=attending`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${process.env.REACT_APP_TOKEN}`,
        "Host": process.env.REACT_APP_REQUEST_URL
      },
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error('실패:', error);
    })
  }
  
  const value = reponseAttendees()
  const { attendees } = value
  const [attendee, setAttendee] = useState(attendees)

  return (
    <div>
      {attendee}
    </div>
  );
}

export default App;
