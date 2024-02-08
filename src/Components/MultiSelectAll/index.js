import React, { forwardRef } from "react";
// import { components } from "react-select";
import { Colors } from "styles/GlobalStyles";
import { ErrorMessage, Wrapper, StyleSelect, StyleSelectAsync } from "./styles";

const MultiSelectAll = (
  {
    asyncSelect,
    closeMenuOnSelect,
    defaultValue,
    filterOption,
    getOptionLabel,
    getOptionValue,
    name,
    onChange,
    options,
    placeholder,
    value,
    widthSelect,
    isMulti,
    error,
    isFocused,
    ...props
  },
  ref
) => {
  const customStyles = {
    control: (provided, state) => ({
      width: widthSelect ? widthSelect : 242,
      ...provided,
      border: error
        ? `1px solid ${Colors.error}`
        : state.isFocused
        ? `1px solid ${Colors.focus}`
        : state.hasValue
        ? `1px solid ${Colors.focus}`
        : `1px solid ${Colors.default}`,
      boxShadow: Colors.focus,
      borderRadius: 8,
      padding: "0.275rem",
      fontFamily: "Raleway",
      cursor: "pointer",
      outline: "none",
      fontSize: 14,
      "&:hover": {
        border: `1px solid ${Colors.default}`,
      },

      "&:focus +.label": {
        border: "1px solid blue",
      },
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: error
        ? Colors.error
        : state.isFocused
        ? Colors.focus
        : state.hasValue
        ? Colors.focus
        : `${Colors.default}`,
    }),
    menu: (provided, state) => ({
      ...provided,
      zIndex: 100,
    }),
    menuList: (provided, state) => ({
      ...provided,
      minHeight: 20,
      maxHeight: 120,
      overflow: "auto",
      "::-webkit-scrollbar": {
        width: "10px",
        height: "auto",
        backgroundColor: "#f1f3f4",
      },

      "::-webkit-scrollbar-thumb": {
        height: "28px",
        width: "10px",
        borderRadius: "8px",
        backgroundColor: "#c4c4c4",

        ":hover": {
          backgroundColor: Colors.black,
        },
      },

      "::-webkit-scrollbar-track:active": {
        backgroundColor: Colors.default,
      },
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      "&:hover": {
        background: Colors.focus,
        color: Colors.white,
      },
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      textOverflow: "ellipsis",
      maxHeight: 50,
      overflowY: "auto",
      "::-webkit-scrollbar": {
        width: "10px",
        height: "auto",
        backgroundColor: "#f1f3f4",
      },

      "::-webkit-scrollbar-thumb": {
        height: "28px",
        width: "10px",
        borderRadius: "8px",
        backgroundColor: "#c4c4c4",

        ":hover": {
          backgroundColor: Colors.black,
        },
      },

      "::-webkit-scrollbar-track:active": {
        backgroundColor: Colors.default,
      },
    }),
    placeholder: () => ({
      color: error ? Colors.error : Colors.default,
    }),

    option: (provided, state) => ({
      ...provided,
      overflow: "auto",
      background: "transparent",
      color: "#000",
      cursor: "pointer",
      "&:hover": {
        background: Colors.default,
      },
    }),
  };

  return (
    <Wrapper>
      {!asyncSelect && (
        <StyleSelect
          className="select"
          components={{
            IndicatorSeparator: () => null,
          }}
          closeMenuOnSelect={closeMenuOnSelect}
          filterOption={filterOption}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          defaultValue={defaultValue}
          isMulti={isMulti}
          name={name}
          noOptionsMessage={() => "Sin resultados"}
          onChange={onChange}
          options={options}
          placeholder={" "}
          styles={customStyles}
          value={value}
          classNamePrefix="multiselect"
          ref={ref}
          isFocused={true}
          error={error}
          isSearchable={false}
          {...props}
        />
      )}
      {asyncSelect && (
        <StyleSelectAsync
          className="select"
          components={{
            IndicatorSeparator: () => null,
          }}
          closeMenuOnSelect={closeMenuOnSelect}
          filterOption={filterOption}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          defaultValue={defaultValue}
          isMulti={isMulti}
          name={name}
          noOptionsMessage={() => "Sin resultados"}
          onChange={onChange}
          options={options}
          placeholder={" "}
          styles={customStyles}
          value={value}
          classNamePrefix="multiselect"
          ref={ref}
          isFocused={true}
          error={error}
          isSearchable={false}
          {...props}
        />
      )}

      <label className="label">{placeholder}</label>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Wrapper>
  );
};

const refMultiSelect = forwardRef(MultiSelectAll);

export default refMultiSelect;
