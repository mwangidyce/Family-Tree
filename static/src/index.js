import React, { useState } from "react";
import ReactDOM from "react-dom";
import MainForm from "./components/mainForm";
import UpdateFamily from "./components/update";
import ChangeForm from "./components/changeForm";
import axios from "axios";
import Swal from "./swal/swal";

const App = () => {
  const [couples, setCouples] = useState([]);
  const [personChange, setPersonChange] = useState("");
  const [selectedOption, setSelectOption] = useState("");

  const handleSearch = el => {
    axios({
      method: "post",
      url: "/ajaxdeal/",
      data: {
        purpose: "change_form",
        person_id: el
      },
      responseType: "text"
    }).then(response => {
      console.log(response.data);
      setPersonChange(response.data);
    });
  };

  const handleUpdate = dict => {
    axios({
      method: "post",
      url: "/ajaxdeal/",
      data: dict
    }).then(response => {
      handleInitial();
      Swal.fire({
        icon: "success",
        title: "Nice!",
        footer: "The Nyakinyori Family",
        html: "Record updated successfully",
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great'
      });
      setSelectOption("");
    });
  };

  const handleDelete = dict => {
    axios({
      method: "post",
      url: "/ajaxdeal/",
      data: dict
    }).then(response => {
      handleInitial();
      Swal.fire({
        icon: "success",
        title: "Nice!",
        html: "Record updated successfully",
        showConfirmButton: false,
        position: "top-right",
        timer: 3500
      });
      setSelectOption("");
    });
  };

  const handleInitial = () => {
    axios
      .post("/ajaxdeal/", {
        purpose: "load_couples"
      })
      .then(function(response) {
        setCouples(response.data.couples);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid mt-4 p-4 bg-dark myCont">
      <div className="row">
        <div className="col-md-6  shadow-sm p-4 bg-light ">
          <h3 className="h3 text-center text-info">Add Member</h3>
          <MainForm couples={couples} setCouples={setCouples} />
        </div>
        <div className="col-md-6 bg-light shadow-sm border border-dark">
          <h3 className="h3  text-center text-info">Update Members</h3>
          <UpdateFamily
            family={couples}
            setFamily={setCouples}
            handleSearch={handleSearch}
            selectedOption={selectedOption}
            setSelectOption={setSelectOption}
          />
          <ChangeForm
            person={personChange}
            handleSearch={handleSearch}
            setOption={setSelectOption}
            handleUpdate={handleUpdate}
            handleDel={handleDelete}
            setPerson={setPersonChange}
          />
        </div>
      </div>
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("react_entry"));
