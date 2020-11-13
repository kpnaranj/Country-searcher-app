import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Country.module.css";

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);

  const country = await res.json();
  return country;
};

const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);

  const getBorders = async () => {
    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );
    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, []);

  return (
    <Layout title={country.name}>
      <div className={styles.container}>
        <div className={styles.container__left}>
          <div className={styles.overview__panel}>
            <img src={country.flag} alt={country.name} />

            <h1 className={styles.overview__name}>{country.name}</h1>
            <div className={styles.overview__region}>{country.region}</div>

            <div className={styles.overview__numbers}>
              <div className={styles.overview__population}>
                <div className={styles.overview__value}>
                  {country.population}
                </div>
                <div className={styles.overview__label}>Population</div>
              </div>

              <div className={styles.overview__area}>
                <div className={styles.overview__value}>{country.area}</div>
                <div className={styles.overview__label}>Area</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container__right}>
          <div className={styles.details__panel}>
            <h4 className={styles.details__panel__heading}>Details</h4>
            <div className={styles.details__panel__row}>
              <div className={styles.details__panel__label}>Capital</div>
              <div className={styles.details__panel__value}>
                {country.capital}
              </div>
            </div>

            <div className={styles.details__panel__row}>
              <div className={styles.details__panel__label}>Languages</div>
              <div className={styles.details__panel__value}>
                {country.languages.map(({ name }) => name).join(", ")}
              </div>
            </div>
            <div className={styles.details__panel__row}>
              <div className={styles.details__panel__label}>Subregion</div>
              <div className={styles.details__panel__value}>
                {country.subregion}
              </div>
            </div>

            <div className={styles.details__panel__row}>
              <div className={styles.details__panel__label}>Currency</div>
              <div className={styles.details__panel__value}>
                {country.currencies.map(({ name }) => name).join(", ")}
              </div>
            </div>
            <div className={styles.details__panel__row}>
              <div className={styles.details__panel__label}>Native name</div>
              <div className={styles.details__panel__value}>
                {country.nativeName}
              </div>
            </div>
            <div className={styles.details__panel__row}>
              <div className={styles.details__panel__label}>Gini</div>
              <div className={styles.details__panel__value}>
                {country.gini} %
              </div>
            </div>

            <div className={styles.details__panel__borders}>
              <div className={styles.details__panel__label}>
                Neighbouring Countries
              </div>
              <div className={styles.details__panel__container}>
                {borders.map(({ flag, name }) => (
                  <div className={styles.details__panel__borders__country}>
                    <img src={flag} alt={name} />
                    <div className={styles.details__panel__borders__name}>
                      {name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id);
  return {
    props: { country },
  };
};
