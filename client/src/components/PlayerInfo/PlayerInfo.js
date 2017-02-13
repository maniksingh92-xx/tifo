import React from 'react';

import _map from 'lodash/map';
import _pick from 'lodash/pick';
import _cloneDeep from 'lodash/cloneDeep';
import _forOwn from 'lodash/forOwn';

import C3Chart from 'react-c3js';

function GaugeCharts(props) {

  var defaultOptions = {
    bindto: null,
    data: {
      type: "gauge",
      columns: null,
    },
    gauge: {
      units: ' %'
    },
    color: {
      pattern: ['#FF0000', '#F97600', '#FAAA00', '#F6C600', '#99CC00', '#00AA00'],
      threshold: { values: [50, 60, 70, 80, 90, 100] },
    },
    size: {
      height: 60,
    },
  };

  var charts = _map(props.stats, (value, key) => {
    var options = _cloneDeep(defaultOptions);
    options.data.columns = [[key, value]];
    return <C3Chart
      className="w-50"
      style={{ flex: 0 }}
      key={key}
      data={options.data}
      color={options.color}
      gauge={options.gauge}
      size={options.size} />
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-around">
      {charts}
    </div>);
}


export default function PlayerInfo(props) {

  var assignedToPosition = null;
  _forOwn(props.team, function(player, pos) {
    if (player && player.id === props.data.id) assignedToPosition = pos;
  });

  if (props.data.Position !== "GK") var stats = _pick(props.data, ["Pace", "Shooting", "Passing", "Dribbling", "Defence", "Physicality"])

  function handleAssignPlayerToPosition() {
    props.onAssignPlayerToPostion(props.data, props.activePosition);
  }

  return (
    <div className="p-2 d-flex cursor-default" style={{ width: 480}}>
      <div className="card card-outline-secondary mb-3">
        <div className="h4 card-header d-flex justify-content-between align-items-center">
          <span>{props.data.Name}</span>
          <div>
            <span className="m-1 badge badge-success">{props.data.Position}</span>
            <span className="m-1 badge badge-info">{props.data.Rating}</span>
          </div>
          {
            (assignedToPosition) ? (
              <span className="badge badge-success" style={{ fontSize : "0.5em"}}>Assigned to {assignedToPosition}</span>
            ) : (
              <span role="button" className="badge badge-warning" style={{ fontSize : "0.5em"}} onClick={handleAssignPlayerToPosition}>Assign to {props.activePosition}</span>
            ) 
            
          }
        </div>
        <div className="card-block bg-inverse text-white">
          <h6 className="card-subtitle mb-2">Positions: {props.posAssoc.join(", ")}</h6>
          <GaugeCharts stats={stats} />
          <footer>Price: ${props.data.Price}</footer>
        </div>
      </div>
    </div>
  );
}