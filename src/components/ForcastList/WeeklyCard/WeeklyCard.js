const WeeklyCard = ({ forcast }) => {
  // console.log(forcast);
  const { max, min } = forcast;
  // console.log(max, min);
  return (
    <div className="forcast-container">
      <h1>
        High:{max} Low: {min}
      </h1>
    </div>
  );
};

export default WeeklyCard;
