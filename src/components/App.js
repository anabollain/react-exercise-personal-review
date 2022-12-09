import React from 'react';
//react libraries
import { useState, useEffect } from 'react';
//props
//import PropTypes from 'prop-types';
//services
import callToApi from '../services/api';
import ls from '../services/localStorage';
//components
//import data from '../data';
import UserList from './UserList';
import Filters from './Filters';
import UserDetail from './UserDetail';
//routes
import {Routes, Route} from 'react-router-dom';
//styles
import '../styles/App.scss';

function App() {

  //STATE VARIABLES
  const [userList, setUserList] = useState([]);
  const [nameInput, setNameInput] = useState(ls.get('nameInput',''));
  const [genderInput, setGenderInput] = useState(ls.get('genderInput','all'));
  const [cityList, setCityList] = useState([]);
  const [clickedCityList, setClickedCityList] = useState([]);

  //USE EFFECT
  const compare = (a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    callToApi().then((data) => {
      setUserList(data);
      let cities = [];
      for (let eachData of data) {
        const newCity = eachData.city;
        if (!cities.includes(newCity)) {
          cities = [...cities, newCity];
        }
      }
      cities.sort(compare);
      setCityList(cities);
    });
  }, []);

  //EVENT FUNCTIONS
  const handleNameInput = (value) => {
    if(value !== ''){
      ls.set('nameInput', value);
    }
    setNameInput(value);
  };

  const handleGenderInput = (value) => {
    ls.set('genderInput', value);
    setGenderInput(value);
  }

  const handleCityInput = (value) => {
    const clickedValue = value.toLowerCase();
    if (clickedCityList.includes(clickedValue)) {
      const newCityList = clickedCityList.filter((eachCity) =>
        eachCity !== clickedValue);
      setClickedCityList(newCityList);
    } else {
      const newCityList = [...clickedCityList, clickedValue];
      setClickedCityList(newCityList);
    }
  };

  const handleResetBtn = () => {
    setNameInput('');
    setGenderInput('all');
    setClickedCityList([]);
    ls.set('nameInput', '');
    ls.set('genderInput', 'all');
  }

  //RENDER FUNCTIONS

  const filterUserList = userList
    .filter((eachUser) => {
      return (eachUser.name.toLowerCase().includes(nameInput.toLowerCase()) || eachUser.lastname.toLowerCase().includes(nameInput.toLowerCase()) )
    })
    .filter((eachUser) => {
      return genderInput !== 'all' ? eachUser.gender.toLowerCase() === genderInput : true;
    })
    .filter((eachUser) => {
      return clickedCityList.length !== 0 ? clickedCityList.includes(eachUser.city.toLowerCase()) : true ;
    })
    ;

    const findUser = (id) => {
      return userList.find ((oneUser) =>
      oneUser.id === id);
      };

  //RETURN
  return (
    <Routes>
      <Route path='/' element={
        <>
        <Filters handleNameInput={handleNameInput} nameInput={nameInput} handleGenderInput={handleGenderInput} genderInput={genderInput} userList={userList} cityList={cityList} handleCityInput={handleCityInput} clickedCityList={clickedCityList} handleResetBtn={handleResetBtn} />
        <UserList userList={filterUserList} />
        </>
      }>
      </Route>
      <Route path='/user/:id' element={<UserDetail findUser={findUser}/>}></Route>
    </Routes>
  );
}

export default App;
