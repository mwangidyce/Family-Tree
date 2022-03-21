import React, { useState, useEffect } from "react";
import Select from "react-select";

function UpdateFamily({
  family,
  handleSearch,
  selectedOption,
  setSelectOption
}) {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    setOptions(
      family.map(person => ({
        label: person.partner
          ? `${person.name} and ${person.partner}`
          : person.name,
        value: person.id
      }))
    );
    console.log("re-render");
  }, [family]);

  const handleChange = value => {
    setSelectOption(value);
  };

  const handleButton = value => {
    if (selectedOption) {
      handleSearch(selectedOption.value);
    }
  };

  return (
    <div className=" p-4">
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isSearchable={true}
        placeholder={"Select family"}
        isClearable={true}
        className="newSelect"
      />
      <button className="btn btn-info ml-2" onClick={handleButton}>
        Search
      </button>
    </div>
  );
}

export default UpdateFamily;
