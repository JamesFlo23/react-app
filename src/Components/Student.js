import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWarning, faPencil } from '@fortawesome/free-solid-svg-icons';

function Student(props){

    const [firstName,setFirstName] = useState("");
   const [lastName,setLastName] = useState("");
   const [team,setTeam] = useState("");
   const [gradYear,setGradYear] = useState("");

    const[editMode, setEditMode] = useState(false);

    useEffect(() =>{
        setFirstName(props.student.firstName);
        setLastName(props.student.lastName);
        setTeam(props.student.team);
        setGradYear(props.student.gradYear);
      }, []);

      const saveStudent = () => {
        setEditMode(false);
        const updatedStudent = {firstName:firstName,lastName:lastName,team:team,gradYear:gradYear,id:props.student.id,image:props.student.image};
        props.updateStudent(updatedStudent);
      }

    return(
        <div className='card'>
          <img src={props.student.image} alt="Happy Student" />
            {!editMode && <ul className='list-group list-group-flush'>
              <li className='list-group-item'>{props.student.firstName}</li>
              <li className='list-group-item'>{props.student.lastName}</li>
              <li className='list-group-item'>{props.student.team}</li>
              <li className='list-group-item'>{props.student.gradYear}</li>
                <button type='button' className='btn btn-danger' onClick={() => props.removeStudent(props.student)}>Delete Player<FontAwesomeIcon icon={faWarning}/></button>
                <button type='button' className='btn btn-light'  onClick={() =>setEditMode(true)}>Edit<FontAwesomeIcon icon={faPencil}/></button>
            </ul>
            }
            {editMode &&
            <ul className='list-group list-group-flush'>
            <li className='list-group-item'><input type='text' className='form-control' value={firstName} onChange={(evt) => setFirstName(evt.currentTarget.value)} /></li>
            <li className='list-group-item'><input type='text' className='form-control' value={lastName} onChange={(evt) => setLastName(evt.currentTarget.value)} /></li>
            <li className='list-group-item'><input type='text' className='form-control' value={team} onChange={(evt) => setTeam(evt.currentTarget.value)} /></li>
            <li className='list-group-item'><input type='text' className='form-control' value={gradYear} onChange={(evt) => setGradYear(evt.currentTarget.value)} /></li>
            <li className='list-group-item'><button id='btnSave' className='btn btn-secondary' onClick={saveStudent}>Save</button></li>
          </ul>
            }
        </div>
)};

export default Student;