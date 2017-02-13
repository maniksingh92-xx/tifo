import React from 'react';

export default function TeamPlayer(props) {
  var position = props.position;
  var name, rating;
  if (props.data == null) {
    name = "Unassigned";
    rating = null;
  } else {
    name = props.data.Name;
    rating = props.data.Rating;
  }

  function handlePositionSelect(e) { props.onPositionSelect(position); };

  return (
    <div
      role="button"
      className="card card-outline-secondary mb-3"
      style={Object.assign({},
        props.active ? {border: "1px solid #5cb85c", boxShadow : "0 0 5px 2px #5cb85c"} : {},
        {width : 120})}
      onClick={handlePositionSelect}>
      <h5 className="card-header text-center">
        {position} <span className="badge badge-info">{rating}</span>
      </h5>
      <div className="card-block">
        <h6 className="card-title text-center">{name}</h6>
      </div>  
    </div>
  )
}