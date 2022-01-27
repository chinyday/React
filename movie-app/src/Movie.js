import PropTypes from "prop-types";

function Movie({img, title, genres}) {
  return (
    <div>
      <img src={img} alt={title} />
      <div>{title}</div>
      <div>{genres.map((g) => (<span key={g}>{g} </span>))}</div>
    </div>
  )
}

Movie.prototype = {
  img : PropTypes.string.isRequired,
  title : PropTypes.string.isRequired,
  genres : PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Movie;