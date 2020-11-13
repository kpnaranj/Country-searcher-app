import { useState } from "react";
import styles from "./CountriesTable.module.css";
import KeyboardArrowDownRounded from "@material-ui/icons/KeyboardArrowDownRounded";
import KeyboardArrowUpRounded from "@material-ui/icons/KeyboardArrowUpRounded";
import Link from "next/link"
//outside we place the functions, inside the results
//functions are constant
//first letter is capital
const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }
  if (direction === "desc") {
    return (
      <div className={styles.heading__arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading__arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();
  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <button
          className={styles.heading__name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>
          <SortArrow direction={direction} />
        </button>
        <button
          className={styles.heading__population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>
          <SortArrow direction={direction} />
        </button>
      </div>
      {/*
        How to map though an API 
        how does it work?
        1. take the array countries and map it
        2. then every array will be called country 
        3. Iterate data using the contained info
        4. Display info in the array, in this case 
        it is country.name 
        
        
        */}

      {orderedCountries.map((country) => (
        <Link href={`/country/${country.alpha3Code}`}>
          <div className={styles.row}>
            <div className={styles.name}> {country.name} </div>
            <div className={styles.population}> {country.population} </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTable;