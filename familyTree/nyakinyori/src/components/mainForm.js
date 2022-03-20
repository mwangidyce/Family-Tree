import React, { useState, useEffect } from "react";
import MyAutosuggest from "./myAutosuggest";
import axios from "axios";
import Swal from "../swal/swal";

const MainForm = ({ couples, setCouples }) => {
  const [name, setName] = useState("");
  const [partner, setPartner] = useState("");
  const [gender, setGender] = useState("");
  const [value, setValue] = useState("");
  const [parent, setParent] = useState(true);

  useEffect(() => {
    if (!parent) {
      axios_process();
    }
  }, [parent]);

  const axios_process = () => {
    axios
      .post("/ajaxdeal/", {
        purpose: "more",
        name: name,
        partner: partner,
        gender: gender,
        parents: value
      })
      .then(function(response) {
        setPartner("");
        setName("");
        setValue("");
        setGender("");
        Swal.fire({
          icon: "success",
          title: "Nice!",
          footer: "The Greater Nyakinyori Family",
          html:
            "<b>" +
            response.data.person_added +
            "</b> has been added. The fam is getting bigger!",
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> User Successfully Added'
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const handleRadioChange = input => {
    setGender(input.target.value);
  };

  const handleArrange = e => {
    e.preventDefault();
    Swal.fire({
      icon: "info",
      title: "This may take a few seconds to re-arrange whole tree",
      showConfirmButton: true
    });
    axios({
      method: "post",
      url: "/ajaxdeal/",
      data: {
        purpose: "arrange_fam"
      },
      responseType: "text"
    }).then(response => {
      Swal.fire({
        icon: "success",
        title: "Nice!",
        html: "Family order arranged. Eldest from left to right",
        showConfirmButton: false,
        position: "top-right",
        timer: 3500
      });
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const new_couple = couples.filter(couple => {
      const new_value = value.split(" && ");
      return couple.partner == new_value[1] || couple.name == new_value[0];
    });
    if (new_couple.length == 0) {
      Swal.fire({
        icon: "warning",
        title: "Ooops...",
        footer: "The Greater Nyakinyori Family",
        html:
          "Not selecting a known parent creates a new ancestor and top most ancestor in tree. Parent name is <b>ignored </b>. Are you sure?",
        showCancelButton: true,
        confirmButtonText: "Yes, create new ancestor",
        cancelButtonText: "Select from parent list",
        reverseButtons: true,
        backdrop: `rgba(0,0,123,0.4)
                left top
                no-repeat
              `
      }).then(result => {
        if (result.value) {
          setValue("");
          setParent(false);
          Swal.fire("New ancestor added", "New node added", "success");

          return;
        } else {
          return;
        }
      });
    } else {
      axios_process();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row  align-items-center">
        <div className="col-md-8">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={input => {
                setName(input.target.value);
              }}
              placeholder="Enter names"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Partner</label>
            <input
              type="text"
              className="form-control"
              placeholder="Partner"
              value={partner}
              onChange={input => {
                setPartner(input.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <input
              type="radio"
              name="gender"
              value="Male"
              className="mr-2"
              checked={gender == "Male"}
              onChange={handleRadioChange}
              required
            />
            Male
            <br />
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={gender == "Female"}
              onChange={handleRadioChange}
              className="mr-2"
            />
            Female
            <br />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Parents</label>
            <MyAutosuggest
              parentValue={value}
              setParentValue={setValue}
              couples={couples}
              setCouples={setCouples}
            />
          </div>
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-large btn-success align-middle"
            type="submit"
          >
            Add Family Member
          </button>
          <button
            className="btn btn-large btn-secondary align-middle mt-2"
            onClick={handleArrange}
          >
            Arrange Family
          </button>
        </div>
      </div>
    </form>
  );
};

export default MainForm;
