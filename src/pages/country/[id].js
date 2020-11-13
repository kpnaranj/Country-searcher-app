import { StylesProvider } from "@material-ui/core";
import Layout from "../../components/Layout/Layout";
import styles from "./Country.module.css";

const Country = ({ country }) => {
  return (
    <Layout title={country.name}>
      <div>
        <div className={styles.overview__panel}>
          <img src={country.flag} alt={country.name} />

          <h1 className={styles.overview__name}>{country.name}</h1>
          <div className={styles.overview__region}>{country.region}</div>

          <div className={styles.overview__numbers}>

            <div className={styles.overview__population}>
              <div className={styles.overview__value}>{country.population}</div>
              <div className={styles.overview__label}>Population</div>
            </div>

            <div className={styles.overview__area}>
              <div className={styles.overview__value}>{country.area}</div>
              <div className={styles.overview__label}>Area</div>
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(
    `https://restcountries.eu/rest/v2/alpha/${params.id}`
  );

  const country = await res.json();
  return {
    props: { country },
  };
};
