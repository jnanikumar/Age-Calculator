import react,{useEffect, useState} from 'react';
import './App.css';

function App() {

  var [DOB,setDOB] = useState({dobDay:0,dobMonth:0,dobYear:0});
  var [age,setAge] = useState({days:-1,months:-1,years:-1});
  var [error,setError]=useState(false)
  const d = new Date();
  const curr_day = d.getDay()-1;
  const curr_month = d.getMonth()+1;
  const curr_year = d.getFullYear();
 
  const {dobDay,dobMonth,dobYear}=DOB;
  useEffect(()=>{setTimeout(()=>setError(false),5000)},[error])
  function displayAge(e) {
    e.preventDefault();
    var year,month,day;

    year = curr_year - dobYear;

    if (curr_month >= dobMonth) 
    {month = curr_month - dobMonth}
    else {
      year--;
      month = 12 + curr_month - dobMonth;
    }

    if (curr_day >= dobDay) 
    {day = curr_day - dobDay}
    else {
      month--;
      day = 31 + curr_day - dobDay;

      if (month < 0) {
        month = 11;
        year--;
      }
    }
   
  setAge({...age,days:day,months:month,years:year})
      
  }
    const handleChange = (e)=>{
    const numberOfDaysInEachMonth={1:31,2:28,3:31,4:30,5:31,6:30,7:31,8:31,9:30,10:31,11:30,12:31}
    setError(false)
    
    
    if(e.target.name == 'dobYear'){
      if(e.target.value > curr_year) {setError(`year should be less than ${curr_year}`)
      return
        };
       
    }
    else if(e.target.name == 'dobMonth'){
      if(e.target.value > 12 || e.target.value < 1) {
        setError('Month shoud not be greater than 12 or less than 1') 
        return }
     
      else if(parseInt(dobYear) == curr_year && e.target.value > curr_month) {
        setError(`Month should be less than the ${curr_month} for the year ${dobYear} you selected `)
        return 
    };
    
    
    }

    else if(e.target.name == 'dobDay'){
      if (parseInt(dobYear)%4==0 && dobMonth==2 && e.target.value>29){
        setError("Day should be less than 29")
        return
      }
      
      else if(e.target.value>numberOfDaysInEachMonth[dobMonth]){
        setError(`Day should be less than ${numberOfDaysInEachMonth[dobMonth]}`)
        return 
      }
    }
    setDOB({...DOB,[e.target.name]:e.target.value})
  }

  return (
    <div className="App container">
      <div class="alert alert-danger" role="alert" style={{display:error?"":"none"}}>
                      {error}
      </div>
      <div className="row">
        
        <div className="col-6">
            
            <form >
                <div class="form-group">
                  <label for="year"><strong>Year of Birth</strong></label>
                  <input type="number" class="form-control" id="year" aria-describedby="emailHelp" placeholder="Enter year" max="2022" name="dobYear" onChange={handleChange}/>
                </div>
                <div class="form-group">
                  <label for="month"><strong>Month of Birth</strong></label>
                  <input type="number" class="form-control" id="month" aria-describedby="emailHelp" placeholder="Enter month" min="1" max="12" name="dobMonth" onChange={handleChange}/>
                </div>
               
                <div class="form-group">
                  <label for="day"><strong>Day of Birth</strong></label>
                  <input type="number" class="form-control" id="day"  placeholder="Enter day" min="1" max="31" name="dobDay" onChange={handleChange}/>
                </div>
        
                <button  class="btn btn-primary" onClick={displayAge}>Get Age</button>
        
            </form>
          </div>
          <div className="col-6">
              
              {(age.years!=-1 && age.months!=-1 && age.days!=-1 )? <div class="alert alert-success" role="alert" style={{justifyContent:"center",marginTop:"30px"}}><strong>you are {age.years} years {age.months} months {age.days} days old</strong></div>:<div></div>}
              
        </div>
    </div>
  </div>
  );
}

export default App;
