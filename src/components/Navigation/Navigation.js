import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import "./Navigation.css";

const Navigation = () => {
  return (
    <div>
      <nav>
        <FontAwesomeIcon className="spy" icon={faMagnifyingGlass} />
        <input placeholder="Search for a city" />
      </nav>
    </div>
  );
};

export default Navigation;
