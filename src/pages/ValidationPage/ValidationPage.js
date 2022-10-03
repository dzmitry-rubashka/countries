import { useState } from "react";
import { useForm } from "react-hook-form";
import { gql, useQuery } from "@apollo/client";

import { client } from "../../utils/client";

import styles from "../ValidationPage/styles.module.scss";

const ValidationPage = () => {
  const countriesList = gql`
    {
      countries {
        name
        currency
      }
    }
  `;

  const [country, setCountry] = useState(
    localStorage.getItem("country") || "Andorra"
  );
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || ""
  );
  const [message, setMessage] = useState("");

  const { data, loading, error } = useQuery(countriesList, { client });
  const { register, handleSubmit } = useForm();

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  const onSubmitForm = (inputValue) => {
    setCurrency(inputValue.currency);
    localStorage.setItem("currency", inputValue.currency);
    if (
      inputValue.currency.toLowerCase() ===
      data?.countries
        ?.find((item) => item.name === country)
        .currency.toLowerCase()
    ) {
      setMessage("Currency match the country selected");
    } else {
      setMessage(
        "ERROR: Currency does not match the country selected. Please correct"
      );
    }
  };

  const onChangeSelect = (event) => {
    setCountry(event.target.value);
    localStorage.setItem("country", event.target.value);
  };

  const onChangeInput = (event) => {
    setCurrency(event.target.value);
    localStorage.setItem("currency", event.target.value);
  };

  return (
    <div>
      <h2>Validation</h2>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <select
          className={styles.input}
          value={country}
          onChange={onChangeSelect}
        >
          {data.countries.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <div>
          <input
            className={styles.input}
            defaultValue={currency}
            name="currency"
            type="text"
            placeholder="Currency"
            {...register("currency", { required: true })}
            onChange={onChangeInput}
          />
          <button type="submit" className={styles.input}>
            Check
          </button>
        </div>
      </form>
      {message}
    </div>
  );
};

export default ValidationPage;
