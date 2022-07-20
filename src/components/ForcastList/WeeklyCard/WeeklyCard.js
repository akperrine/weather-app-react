import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudSun,
  faCloud,
  faCloudShowerslight,
  faSun,
  faCloudShowersHeavy,
} from "@fortawesome/free-solid-svg-icons";

const WeeklyCard = ({ forcast }) => {
  const { avgTemp } = forcast;
  // console.log(max, min);
  return (
    <div className="forcast-container">
      <h1>Avg Temp: {avgTemp}</h1>
      <FontAwesomeIcon className="sun" icon={faSun} />
    </div>
  );
};

export default WeeklyCard;
