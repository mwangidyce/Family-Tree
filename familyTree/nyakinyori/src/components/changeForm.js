import React, { useState, useEffect } from "react";
import Select from "react-select";
import Swal from "../swal/swal";

const ChangeForm = ({
  person,
  handleSearch,
  setOption,
  handleUpdate,
  handleDel,
  setPerson
}) => {
  const [name, setName] = useState("");
  const [partner, setPartner] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (person) {
      setName(person.name);
      setPartner(person.partner ? person.partner : "");
      setGender({ label: person.gender, value: person.gender });
    }
  }, [person]);

  const handleNameChange = name_input => {
    setName(name_input.target.value);
  };
  const handlePartnerChange = partner_input => {
    setPartner(partner_input.target.value);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      html:
        "Will delete <b>" +
        name +
        "</b>  and <b> all descendants </b> . You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        handleDel({
          purpose: "delete_user",
          person_id: person.id
        });
        setPerson("");
      }
    });
  };
  const handleLink = link_input => {
    handleSearch(link_input.target.id);
    setOption("");
  };
  const handleGender = gender => {
    setGender(gender);
  };
  const handleSave = () => {
    handleUpdate({
      purpose: "update_user",
      person_id: person.id,
      name: name,
      gender: gender.value,
      partner: partner
    });
  };

  if (person) {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <span>Name:</span>
            <input
              type="text"
              className="form-control"
              onChange={handleNameChange}
              value={name}
            />
            <span>Partner:</span>
            <input
              className="form-control"
              onChange={handlePartnerChange}
              value={partner}
            />
          </div>
          <div className="col-md-6">
            <span>Gender:</span>
            <Select
              value={gender}
              onChange={handleGender}
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" }
              ]}
              className="gender"
            />
            <button
              className="btn btn-success mt-3 text-center"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="btn btn-danger mt-3 mx-2 text-center"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="mt-3">
          <span>Children: </span>
          {person.children.map((el, ind, arr) => {
            return (
              <span
                onClick={handleLink}
                key={el.id}
                id={el.id}
                className="text-info m-1"
              >
                {el.name}
                {"," ? ind != arr.length - 1 : ""}
              </span>
            );
          })}
        </div>
        <div className="mt-3">
          <span>Parent: </span>{" "}
          <span
            className="ml-1 text-info"
            id={person.parent.id}
            onClick={handleLink}
          >
            {person.parent.name}
          </span>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ChangeForm;
