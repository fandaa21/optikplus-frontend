function CheckoutForm() {
  return (
    <div className="checkout-form">

      <input placeholder="First Name*" />
      <input placeholder="Company Name" />
      <input placeholder="Street Address*" />
      <input placeholder="Apartment, floor, etc. (optional)" />
      <input placeholder="Town/City*" />
      <input placeholder="Phone Number*" />
      <input placeholder="Email Address*" />

      <label className="save-info">
        <input type="checkbox" />
        Save this information for faster check-out next time
      </label>

    </div>
  );
}

export default CheckoutForm;