import SearchIcon from "../Icons/Search";
import CancelIcon from "../Icons/Cancel";
import "./styles.css";
import { InputSearchProps } from "../../interfaces";

const InputSearch = ({
  value,
  onChange,
  placeholder,
  onClear,
  onFocus,
  onEnter,
}: InputSearchProps) => {
  return (
    <div className="inputWrapper" role="search">
      <span className="leadingIconWrapper" aria-hidden="true">
        <SearchIcon className="leadingIcon" data-testid="search-icon" />
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onEnter}
        placeholder={placeholder || "Search..."}
        className="input"
        aria-autocomplete="list"
        aria-label="Search"
        aria-describedby="Search input box"
        aria-expanded={!!value} // true if suggestions are visible
        aria-controls="suggestions-list"
        role="combobox"
      />
      {value ? (
        <button
          className="trailingIconWrapper"
          onClick={onClear}
          aria-label="clear input button"
          data-testid="clear-button"
          role="button"
        >
          <CancelIcon className="trailingIcon" data-testid="cancel-icon" />
        </button>
      ) : null}
    </div>
  );
};

export default InputSearch;
