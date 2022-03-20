import Autosuggest from "react-autosuggest";

import React, { useState, useEffect } from "react";
import axios from "axios";
import suggestMatch from "autosuggest-highlight/match";
import suggestParse from "autosuggest-highlight/parse";

function MyAutosuggest({ parentValue, setParentValue, setCouples, couples }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios
      .post("/ajaxdeal/", {
        purpose: "load_couples"
      })
      .then(function(response) {
        setCouples(response.data.couples);
        console.log(response.data.couples);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const getSuggestionValue = suggestion => {
    return suggestion.partner
      ? suggestion.name + " && " + suggestion.partner
      : suggestion.name;
  };

  const handleChange = (event, { newValue, method }) => {
    setParentValue(newValue);
  };

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  const fetchSuggestions = ({ value }) => {
    const escapedValue = value.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (escapedValue === "") {
      return [];
    }
    const regex = new RegExp("^" + escapedValue, "i");
    setSuggestions(couples.filter(couple => regex.test(couple.name)));
  };

  const renderSuggestion = (suggestion, { query }) => {
    const matches = suggestMatch(
      suggestion.name + " " + suggestion.partner,
      query
    );
    const parts = suggestParse(
      suggestion.partner
        ? suggestion.name + " && " + suggestion.partner
        : suggestion.name,
      matches
    );
    return (
      <span className="text-dark">
        {parts.map((part, index) => {
          const className = part.highlight
            ? "react-autosuggest__suggestion-match"
            : null;
          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          );
        })}
      </span>
    );
  };

  const inputProps = {
    value: parentValue,
    onChange: handleChange,
    placeholder: "Enter parents names"
  };
  return (
    <Autosuggest
      inputProps={inputProps}
      suggestions={suggestions}
      onSuggestionsFetchRequested={fetchSuggestions}
      onSuggestionsClearRequested={clearSuggestions}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
    />
  );
}

export default MyAutosuggest;
