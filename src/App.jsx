import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

const App = () => {
const today = new Date();
console.log(today)
const [country, setCountry] = useState('US')
const [year, setYear] = useState(today.getFullYear())
const [month, setMonth] = useState(today.getMonth()+1)
const [day, setDay] = useState(today.getDate())
const [holidays, setHolidays] = useState(null)
const [datavar, setDatavar] = useState(false)
const [sprit, setSprit] = useState("Click to Proceed!")
const [spice, setSpice] = useState("Enter your Data!")


const handleClickSearch = () =>{
  setDatavar(true);
  setSprit()
  setCountry('US');
  setYear(today.getFullYear());
  setMonth(today.getMonth()+1);
  setDay(today.getDate());
}
const handleClickHome = () =>{
  setDatavar(false)
  setHolidays()
  setSprit("Click to Proceed!")
  setSpice("Enter Your Data !")
}
const handleClickSubmit = () =>{
  setDatavar(true);
  setSprit()
  setHolidays(null);
  setSpice("Enter Again !");

     // Validation for empty fields
     if (!country || !year || !month || !day) {
      alert('Please fill in all the required fields.');
      return;
    }
  if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
    alert('Month should be between 1 and 12');
    return;
  }

  // Validation for day (should be between 1 and 31)
  if (parseInt(day, 10) < 1 || parseInt(day, 10) > 31) {
    alert('Day should be between 1 and 31');
    return;
  }
  if (parseInt(year, 10) < 1000 || parseInt(year, 10) > 9999) {
    alert('Year should be suitable');
    return;
  }
 
  
  axios.get(`https://holidays.abstractapi.com/v1/?api_key=5bab1b6c62b4461e8fa99dd2e53acdfd&country=${country}&year=${year}&month=${month}&day=${day}`)
    .then(response => {
          console.log(response.data);
          setHolidays(response.data);

          setCountry('');
          setYear('');
          setMonth('');
          setDay('');
      })
      .catch(error => {
          console.log(error);
      });
}

  return (
    <div className='bg'>
      <h1 className='click'>{sprit}</h1>
    {!datavar ? (
      <button className='but' onClick={handleClickSearch}>Proceed</button>
       ) : (
        
        <> 
        <div className="bell">
        <div className='a'><h1>{spice}</h1></div>
        <div>
       <h2 className='b'>Country</h2> <input type="text" value={country} placeholder="Enter Here" required="required" maxLength={2} onChange={e =>setCountry(e.target.value)}/> <br />
       <h2 className='c'>Year</h2><input type="number" value={year} placeholder="Enter Here" maxLength={4} onChange={e =>setYear(e.target.value)}/> <br />
       <h2 className='d'>Month</h2> <input type="number" value={month} placeholder="Enter Here" maxLength={2} onChange={e =>setMonth(e.target.value)}/> <br />
       <h2 className='e'>Day</h2><input type="number" value={day} placeholder="Enter Here" maxLength={2} onChange={e =>setDay(e.target.value)}/> <br />
       </div>
       </div>
       <button className='butn' onClick={handleClickSubmit}>Submit</button>
        </>)}
        {holidays && Array.isArray(holidays) ? (
  <div>
    {holidays.map((holidayItem, index) => (
      <div className='back' key={index}>
        <p>Name: {holidayItem.name}</p>
        <p>Type: {holidayItem.type}</p>
        <p>Location: {holidayItem.location}</p>
        <p>Week Day: {holidayItem.week_day}</p>
        <hr />
      </div>
    ))}
    <button className='nut' onClick={handleClickHome}>
      Home page
    </button>
  </div>
) : null}


    </div> 
  )};  
export default App;
