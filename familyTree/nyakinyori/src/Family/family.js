import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import axios from "axios";

const ViewFamily = () => {
  const [selectedOption, setSelectOption] = useState("");
  const [options, setOptions] = useState([]);
  const [optionDefault, setoptionDefault] = useState(true);

  useEffect(() => {
    axios
      .post("/ajaxdeal/", {
        purpose: "load_couples"
      })
      .then(function(response) {
        const people = response.data.couples;
        setOptions(
          people.map(person => ({
            label: person.partner
              ? `${person.name} and ${person.partner}`
              : person.name,
            value: person.id
          }))
        );
      })
      .catch(function(error) {});
  }, []);

  const handleChange = option => {
    setSelectOption(option);
  };

  const handleReset = () => {
    if (!optionDefault) {
      axios({
        method: "post",
        url: "/ajaxdeal/",
        data: {
          purpose: "reset"
        },
        responseType: "text"
      }).then(response => {
        document.getElementById("treeStart").innerHTML = response.data;
      });
    }
  };

  const handleView = () => {
    if (selectedOption) {
      axios({
        method: "post",
        url: "/ajaxdeal/",
        data: {
          purpose: "get_person",
          person_id: selectedOption.value
        },
        responseType: "text"
      }).then(response => {
        setoptionDefault(false);
        setSelectOption("");
        document.getElementById("treeStart").innerHTML = response.data;
      });
    }
  };

  return (
    <div>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isSearchable={true}
        placeholder={"Select family"}
        isClearable={true}
        className="newSelect"
      />
      <button className="btn btn-success  mx-1" onClick={handleView}>
        View Family
      </button>
      <button className="btn btn-danger mx-1" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

ReactDOM.render(<ViewFamily />, document.getElementById("family"));
