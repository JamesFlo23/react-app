import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {nanoid} from 'nanoid';
import React, {useState, useEffect} from 'react';
import AddStudent from './Components/AddStudent';
import _ from 'lodash';
import Student from './Components/Student';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [allStudents, setAllStudents] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [gradYear, setGradYear] = useState("");

  useEffect(() =>{

    if(localStorage){
      const studentsLocalStorage = JSON.parse(localStorage.getItem('students'));
          if(studentsLocalStorage){
            saveStudents(studentsLocalStorage);
          }
          else{
            saveStudents(students);
          }
    }
  }, []);

  const saveStudents = (students) => {
    setAllStudents(students);
    setSearchResults(students);
    if(localStorage){
      localStorage.setItem('students', JSON.stringify(students));
      console.log('saved to local storage')
    }
  }

  const addStudent = (newStudent) => {
    const updatedStudents = [...allStudents, newStudent];
    saveStudents(updatedStudents);
  }

  const searchStudents = () => {
    let keywordArray = [];

    if(keywords){
      keywordArray = keywords.toLowerCase().split(' ');
    }
    if(gradYear){
      keywordArray.push(gradYear.toString());
    }
    if(keywordArray.length > 0){
      const searchResults = allStudents.filter(student => {
        for(const word of keywordArray){
          if(student.firstName.toLowerCase().includes(word) || student.lastName.toLowerCase().includes(word) || student.gradYear === parseInt(word)){
            return true;
          }
        }
        return false;
      });
      setSearchResults(searchResults);
    }else{
      setSearchResults(allStudents);
    }
  }

  const removeStudent = (studentToDelete) => {
    console.table(studentToDelete);
    const updatedStudentsArray = allStudents.filter(student => student.id !== studentToDelete.id);
    saveStudents(updatedStudentsArray);
  }

  const updateStudent = (updatedStudent) =>{
    const updatedStudentsArray = allStudents.map(student => student.id === updatedStudent.id ? {...student,...updatedStudent }: student);
    saveStudents(updatedStudentsArray);
  }

  const students = [{
    id:nanoid(),
    firstName: "Ray",
    lastName: "Lewis",
    team: " Baltimore Ravens",
    image: './images/player1.jpeg',
    gradYear: 2018
  }, {
    id:nanoid(),
    firstName: "Dan",
    lastName: "Marino",
    team: "Miami Dolphins",
    image: './images/player2.jpeg',
    gradYear: 2005
  }, {
    id:nanoid(),
    firstName: "Bo",
    lastName: "Jackson",
    team: "Oakland Raiders",
    image: 'images/player3.jpeg',
    gradYear: 1998
  }, {
    id:nanoid(),
    firstName: "Joe",
    lastName: "Montana",
    team: "San Francisco 49ers",
    image: 'images/player4.jpeg',
    gradYear: 2000
  }, {
    id:nanoid(),
    firstName: "Lawrence",
    lastName: "Taylor",
    team: "New York Giants",
    image: 'images/player5.jpeg',
    gradYear: 1999
  }, {
    id:nanoid(),
    firstName: "Bobby",
    lastName: "Boucher",
    team: "SCLSU Mud Dogs",
    image: 'images/player8.jpeg',
    gradYear: 2018
  }, {
    id:nanoid(),
    firstName: "Jack",
    lastName: "Lambert",
    team: "Pittsburgh Steelers",
    image: 'images/player6.jpeg',
    gradYear: 1990
  }, {
    id:nanoid(),
    firstName: "Orlando",
    lastName: "Pace",
    team: "St Louis Rams",
    image: 'images/player7.jpeg',
    gradYear: 2015
  }, {
    id:nanoid(),
    firstName: "Ed",
    lastName: "Reed",
    team: "Baltimore Ravens",
    image: 'images/player9.jpeg',
    gradYear: 2018
  }, {
    id:nanoid(),
    firstName: "Jim",
    lastName: "Brown",
    team: "Cleveland Browns",
    image: './images/player10.jpeg',
    gradYear: 1971
  }];


  return (
  <div className='container-fluid p-5'>
    <div className='row mt-4 p-4' id='searchStudents'>
      <h3>Search Players</h3>
        <div className='col md-4'>
          <label htmlFor='txtKeywords'>Search By First Name or Last Name</label>
          <input type='text' className='form-control' placeholder='Hall-of-Famer' onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords} />
          </div>
        <div className='col md-4'>
          <label htmlFor='txtGradYear'>Search By Hall of Fame Induction Year</label>
          <select value={gradYear} onChange={evt => setGradYear(evt.currentTarget.value)} className='form-select'>
            <option value="2000">Select Year</option>
              {_(allStudents).map(student => student.gradYear).sort().uniq().map(year => <option key={year} value={year}>{year}
            </option>).value()}
          </select>
          </div>
        <div className='col md-4'>
          <br />
          <button type='button' className='btn btn-warning' onClick={searchStudents}>Search Player<FontAwesomeIcon icon={faSearch} /></button>
          </div>
      </div>
      {/* */}
    <div className='row' id='allStudents'>
      <h3>Hall of Fame</h3>
        {searchResults && searchResults.map((student) => (
      <div key={student.id} className="col-md-2">
        <Student student={student} removeStudent={removeStudent} updateStudent={updateStudent}/>
      </div>
))}
    </div>
    {/*!allStudents && <button type="button" className='btn btn-lg btn-success' onClick={() => saveStudents(students)}>Save Students</button>*/}
    <div>

    <AddStudent addStudent={addStudent} />
    </div>

    

  </div>
  );
}

export default App;
