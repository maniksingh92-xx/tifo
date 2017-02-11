import React from 'react';

export default function TeamPlayer(props) {
  var position = props.position;
  var name, rating;
  if (props.data == null) {
    name = "Unassigned";
    rating = null;
  } else {
    name = props.data.name;
    rating = props.data.Rating;
  }

  function handlePositionSelect(e) { props.onPositionSelect(position); };

  return (
    <div className="card card-outline-secondary mb-3" onClick={handlePositionSelect}>
      <h5 className="card-header text-center">
        {position} <span className="badge badge-info">{rating}</span>
      </h5>
      <div className="card-block">
        <h6 className="card-title">{name}</h6>
      </div>  
    </div>
  )
}