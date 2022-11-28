import { useState } from "react";
// import gider from "./data/gider.json";
// import invoices from "./data/invoice";

const Select = () => {
  // 👇️ initial value of empty string (first option)
  const [selected, setSelected] = useState("");

  const handleChange = (event, i) => {
    console.log("Label 👉️", event.target.selectedOptions[0].label);
    console.log(event.target.value);
    setSelected(event.target.value);
  };

  return (
    <div>
      <select
        value={selected}
        onChange={(e) => handleChange(e.target.value, 0)}
      >
        <option value="">--Choose and option--</option>
        <option value="apple">Apple 🍏</option>
        <option value="banana">Banana 🍌</option>
        <option value="kiwi">Kiwi 🥝</option>
      </select>
    </div>
  );
};

export default Select;
