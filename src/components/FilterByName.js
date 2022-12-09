function FilterByName(props) {
    const handleInput = (ev) => {
        props.handleNameInput(ev.target.value);
    }
  return (
    <fieldset>
        <legend htmlFor="">Name</legend>
        <input type="text" id="name" name="name" value={props.nameInput} onChange={handleInput}/>
    </fieldset>
    );
}



export default FilterByName;