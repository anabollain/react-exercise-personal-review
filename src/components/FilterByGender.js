function FilterByGender(props) {
    const handleInput = (ev) => {
        props.handleGenderInput(ev.target.value);
    }

    return (
        <fieldset>
            <legend>Gender</legend>
            <div>
                <input type="radio" id="all" name="gender" value="all" checked={props.genderInput === 'all'} onChange={handleInput}/>
                <label htmlFor="all">All</label>
            </div>
            <div>
                <input type="radio" id="male" name="gender" value="male" checked={props.genderInput === 'male'} onChange={handleInput}/>
                <label htmlFor="male">Male</label>
            </div>
            <div>
                <input type="radio" id="female" name="gender" value="female" checked={props.genderInput === 'female'} onChange={handleInput}/>
                <label htmlFor="female">Female</label>
            </div>
        </fieldset>
    );
}


export default FilterByGender;