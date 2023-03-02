import classes from "./Checkout.module.css";
import UseInput from "../hooks/UseInput";
import Swal from "sweetalert2";

const isNotEmpty = (value) => value.trim() !== "";

const CheckOut = (props) => {
  const {
    value: enteredName,
    onChange: handleNameChange,
    hasError,
    onBlur: handleBlur,
    resetValue: resetInputName,
  } = UseInput(isNotEmpty);

  const {
    value: enteredStreet,
    onChange: handleStreetChange,
    hasError: streetHasError,
    onBlur: handleStreetBlur,
    resetValue: resetInputStreet,
  } = UseInput(isNotEmpty);

  const {
    value: enteredPostal,
    onChange: handlePostalChange,
    hasError: PostalHasError,
    onBlur: handlePostalBlur,
    resetValue: resetInputPostal,
  } = UseInput(isNotEmpty);

  const {
    value: enteredCity,
    onChange: handleCityChange,
    hasError: CityHasError,
    onBlur: handleCityBlur,
    resetValue: resetInputCity,
  } = UseInput(isNotEmpty);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!enteredName && !enteredStreet && !enteredPostal && !enteredCity) {
      Swal.fire("Warning!", "Fields cannot be empty!", "warning");
      return;
    }
    props.onSubmitOrder({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostal,
      city: enteredCity,
    });
    Swal.fire("Good job!", "You clicked the button!", "success");

    props.onClearCart();
    resetInputName();
    resetInputStreet();
    resetInputPostal();
    resetInputCity();
  };

  const inputClasses = hasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  const inputStreetClasses = streetHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  const inputPostalClasses = PostalHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  const inputCityClasses = CityHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={inputClasses}>
        <label htmlFor>Your Name</label>
        <input
          placeholder="Enter your name"
          type="text"
          onChange={handleNameChange}
          value={enteredName}
          onBlur={handleBlur}
        ></input>
        {hasError && (
          <p style={{ color: "#aa0b20" }}>Name field cannot be empty</p>
        )}
      </div>
      <div className={inputStreetClasses}>
        <label htmlFor="Street">Street</label>
        <input
          placeholder="Enter your Street"
          type="text"
          onChange={handleStreetChange}
          value={enteredStreet}
          onBlur={handleStreetBlur}
        ></input>
        {streetHasError && (
          <p style={{ color: "#aa0b20" }}>Street field cannot be empty</p>
        )}
      </div>
      <div className={inputPostalClasses}>
        <label htmlFor="Postal">Postal Code</label>
        <input
          placeholder="Enter your Postal"
          type="number"
          onChange={handlePostalChange}
          value={enteredPostal}
          onBlur={handlePostalBlur}
        ></input>
        {PostalHasError && (
          <p style={{ color: "#aa0b20" }}>Postal Code field cannot be empty</p>
        )}
      </div>
      <div className={inputCityClasses}>
        <label htmlFor="City">City</label>
        <input
          placeholder="Enter your City"
          onChange={handleCityChange}
          value={enteredCity}
          onBlur={handleCityBlur}
        ></input>
        {CityHasError && (
          <p style={{ color: "#aa0b20" }}>City field cannot be empty</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onHideCart}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;
