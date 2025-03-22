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
    <div className="inputWrapper">
      <span className="leadingIconWrapper">
        <SearchIcon className="leadingIcon" />
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onEnter}
        placeholder={placeholder || "Search..."}
        className="input"
      />
      {value ? (
        <span className="trailingIconWrapper" onClick={onClear}>
          <CancelIcon className="trailingIcon" />
        </span>
      ) : null}
    </div>
  );
};

export default InputSearch;
