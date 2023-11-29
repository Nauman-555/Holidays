import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

const App = () => {

const [country, setCountry] = useState('')
const [year, setYear] = useState('')
const [month, setMonth] = useState('')
const [day, setDay] = useState('')
const [holiday, setHoliday] = useState(null)
const [datavar, setDatavar] = useState(false)
const [sprit, setSprit] = useState("Hey! Let Us See The Holidays")


const handleClickSearch = () =>{
  setDatavar(true);
  setSprit()
}
const handleClickHome = () =>{
  setDatavar(false)
  setHoliday()
  setSprit("Hey! Let Us See The Holidays")
}
const handleClickSubmit = () =>{
  setDatavar(true);
  setSprit()
  

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
          setHoliday(response.data);

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
    <div>
      <h1>{sprit}</h1>
    {!datavar ? (
      <button className='but' onClick={handleClickSearch}>Proceed</button>
       ) : (
        
        <> <h2>Enter Your Choice</h2>
        <input type="text" value={country} placeholder="Enter Country" required="required" maxLength={2} onChange={e =>setCountry(e.target.value)}/> <br />
        <input type="number" value={year} placeholder="Enter Year" maxLength={4} onChange={e =>setYear(e.target.value)}/> <br />
        <input type="number" value={month} placeholder="Enter Month" maxLength={2} onChange={e =>setMonth(e.target.value)}/> <br />
        <input type="number" value={day} placeholder="Enter Day" maxLength={2} onChange={e =>setDay(e.target.value)}/> <br />
        <button className='butn' onClick={handleClickSubmit}>Submit</button>
        </>)}
        {holiday && (
    <div className='fetch' >
    <h2>Holiday Data:</h2>
    <pre>{JSON.stringify(holiday, null, 2)}</pre>
    <button className='but' onClick={handleClickHome}>Home page</button>
    </div>
    )}
        
    </div> 
  )};  
export default App;