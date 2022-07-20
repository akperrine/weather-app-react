import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import "./Navigation.css";

const Navigation = ({ searchChange }) => {
  return (
    <div>
      <nav>
        <button className="search-btn">
          <FontAwesomeIcon className="spy" icon={faMagnifyingGlass} />
        </button>
        <input placeholder="Search for a city" onChange={searchChange} />
      </nav>
    </div>
  );
};

export default Navigation;
