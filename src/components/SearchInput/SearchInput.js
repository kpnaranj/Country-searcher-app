import SearchRounded from "@material-ui/icons/SearchRounded";
import styles from "./SearchInput.module.css";

//whatever is passed in the search input we want to have it here
//rest is like using a className specification 
const SearchInput = ({ ...rest }) => {
  return (
    <div className={styles.wrapper}>
      <SearchRounded color="inherit" />
      <input className={styles.input} {...rest} />
    </div>
  );
};

export default SearchInput;
