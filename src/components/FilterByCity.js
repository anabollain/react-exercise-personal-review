function FilterByCity(props) {

    //EVENT
    const handleInput = (ev) => {
        props.handleCityInput (ev.target.value);
    };
    
    //RENDER
    const renderCheckbox = () => {
        return props.cityList.map ((eachCity) => {
            return (
            <div key={crypto.randomUUID()}>
                <input type="checkbox" id={eachCity.toLowerCase()} name={eachCity.toLowerCase()} value={eachCity} 
                checked = {props.clickedCityList.includes(eachCity.toLowerCase())} onChange={handleInput}/>
                <label htmlFor={eachCity.toLowerCase()}>{eachCity}</label>
            </div>
        );
        })
    }
    
  return (
    <fieldset>
        <legend>Location</legend>
        {renderCheckbox ()}
    </fieldset>
    );
}

export default FilterByCity;