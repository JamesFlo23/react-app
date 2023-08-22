import React, {useState} from 'react';
import {nanoid} from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './AddStudent.css';

function AddStudent(props){
   //id, first name, last name, photo
   const [firstName,setFirstName] = useState("");
   const [lastName,setLastName] = useState("");
   const [team,setTeam] = useState("");
   const [selectedFile,setSelectedFile] = useState("");
   const [gradYear,setGradYear] = useState("");

   const doWork = () => {
    const newStudent = {"id":nanoid(), "firstName":firstName, "lastName":lastName, "team":team, "image":URL.createObjectURL(selectedFile),"gradYear":parseInt(gradYear)};
    props.addStudent(newStudent);
   }
   const imageUpdate = (event)=>{
    setSelectedFile(event.target.files[0]);
   }
   return (
    <div className='row mt-5' id='addStudent'>
      <h3>Induct Player</h3>
      <div className='col-md-2'>
        <label htmlFor='txtFistName' className='form-label'>First Name</label>
        <input type='text' id='txtFirstName' placeholder='First Name' className='form-control' onChange={(evt) => setFirstName(evt.currentTarget.value)} value={firstName} />
      </div>
      <div className='col-md-2'>
        <label htmlFor='txtLastName' className='form-label'>Last Name</label>
        <input type='text' id='txtLastName' placeholder='First Name' className='form-control' onChange={(evt) => setLastName(evt.currentTarget.value)} value={lastName} />
      </div>
      <div className='col-md-2'>
        <label htmlFor='txtTeam' className='form-label'>Team</label>
        <input type='team' id='txtTeam' placeholder='Team' className='form-control' onChange={(evt) => setTeam(evt.currentTarget.value)} value={team} />
      </div>
      <div className='col-md-2'>
        <label htmlFor='fileUpload' className='form-label'>Player Image</label>
        <input type='file' name='file' id='fileUpload' onChange={imageUpdate}/>
      </div>
      <div className='col-md-2'>
        <label htmlFor='txtGradYear' className='form-label'>Induction Year</label>
        <input type='number' id='txtGradYear' placeholder='Induction Year' className='form-control' onChange={(evt) => setGradYear(evt.currentTarget.value)} value={gradYear} />
      </div>
      <div className='col-md-2'>
        <br />
        <button type='button' id='btnAdd' className='btn btn-success btn-lg' onClick={doWork}>Add Student <FontAwesomeIcon icon={faPlus} /></button>
      </div>
    </div>
   )
}

export default AddStudent;