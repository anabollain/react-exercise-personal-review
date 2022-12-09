import FilterByName from './FilterByName';
import FilterByGender from './FilterByGender';
import FilterByCity from './FilterByCity';
import ResetBtn from './ResetBtn';

function Filters(props) {
    const handleSubmit = (ev) => {
        ev.preventDefault();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <FilterByName handleNameInput={props.handleNameInput} nameInput={props.nameInput} />
                <FilterByGender handleGenderInput={props.handleGenderInput} genderInput={props.genderInput} />
                <FilterByCity cityList={props.cityList} handleCityInput={props.handleCityInput} clickedCityList={props.clickedCityList} />
                <ResetBtn handleResetBtn={props.handleResetBtn}/>
            </form>
        </>
    );
}


export default Filters;