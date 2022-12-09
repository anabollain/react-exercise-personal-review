function ResetBtn(props) {
    const handleReset = (ev) => {
        props.handleResetBtn();
    }
  return (
    <button type="reset" onClick={handleReset}>Reset</button>
    );
}


export default ResetBtn;