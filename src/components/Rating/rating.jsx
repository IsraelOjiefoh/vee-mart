
// eslint-disable-next-line react/prop-types
const Rating = ({ rating }) => {
  const roundedRating = Math.round(rating);

  return (
    <>
      <div className="rating inline-block">
        Rating:
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={`star inline-block text-1xl mx-1 ${
              index < roundedRating ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            <i className="fas fa-star"/>
          </span>
        ))}
      </div>
    </>
  );
};

export default Rating;
