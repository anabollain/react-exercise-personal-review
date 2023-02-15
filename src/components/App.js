import React from 'react';
//react libraries
import { useState, useEffect } from 'react';
//services
import callToApi from '../services/api';
import ls from '../services/localStorage';
//components
import Header from './Header';
import UserList from './UserList';
import Filters from './Filters';
import UserDetail from './UserDetail';
import About from './About';
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
  const [isLoading, setIsLoading] = useState(true);
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
      //Loaded
      setIsLoading(false);
      //Array for cities for checkbox filter
      let cities = [];
      for (let eachData of data) {
        const newCity = eachData.city;
        if (!cities.includes(newCity)) {
          cities = [...cities, newCity];
        }
      }
      //Order city arrays
      cities.sort(compare);
      //Set value of state variable sent by props
      setCityList(cities);
    });
  }, []);

  // Class: function to get cities, no variable state

  /*const getCities = () => {
    const userCities = userList.map((user) => user.city);
    const uniqueCities = userCities.filter ((city, index) =>{
      return userCities.indexOf(city) === index;
    });
    return uniqueCities;
  }*/

  //EVENT FUNCTIONS
  const handleNameInput = (value) => {
    setNameInput(value);
  };

  const handleGenderInput = (value) => {
    setGenderInput(value);
    ls.set('genderInput', value);
  }

  const handleCityInput = (value) => {
    const clickedValue = value.toLowerCase();
    //Other way of doing the if-else condition with indexOf method
    /* if (clickedCityList.includes(clickedValue)){
      const position = clickedCityList.indexOf(value);
      clickedCityList.splice(position, 1);
      setClickedCityList([...clickedCityList]);
    }else{
      setClickedCityList([...clickedCityList]);
    }*/
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
      oneUser.name === id);
      };

  //RETURN
  if(isLoading === false){
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={
          <main className='main'>
            <Filters handleNameInput={handleNameInput} nameInput={nameInput} handleGenderInput={handleGenderInput} genderInput={genderInput} userList={userList} cityList={cityList} handleCityInput={handleCityInput} clickedCityList={clickedCityList} handleResetBtn={handleResetBtn} />
            <UserList userList={filterUserList} />
          </main>
        }>
        </Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/user/:id' element={<UserDetail findUser={findUser}/>}></Route>

      </Routes>
    </>
  );
}else{
  return (
  <h1>Loading</h1>);
}
}

export default App;
