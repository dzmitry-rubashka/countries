import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import { client } from "../../utils/client";

import styles from "./styles.module.scss";

const ContinentsPage = () => {
  const [continent, setContinent] = useState(
    localStorage.getItem("continent") || "Africa"
  );
  const [countries, setCountries] = useState([]);

  const continentsList = gql`
    {
      continents {
        name
        countries {
          name
        }
      }
    }
  `;
  const { data, loading, error } = useQuery(continentsList, { client });

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  const onChangeSelect = (event) => {
    setContinent(event.target.value);
    localStorage.setItem("continent", event.target.value);
    setCountries(
      data?.continents[
        data?.continents.findIndex(
          (continent) => continent.name === event.target.value
        )
      ].countries
    );
  };

  return (
    <>
      <h2>Continents</h2>
      <select
        className={styles.select}
        value={continent}
        onChange={onChangeSelect}
      >
        {data.continents.map((continent) => (
          <option key={continent.name} value={continent.name}>
            {continent.name}
          </option>
        ))}
      </select>
      {countries.map((country) => (
        <div className={styles} key={country.name}>
          {country.name}
        </div>
      ))}
    </>
  );
};

export default ContinentsPage;
