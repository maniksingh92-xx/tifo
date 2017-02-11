import React from 'react';

import _map from 'lodash/map';
import _pick from 'lodash/pick';
import _cloneDeep from 'lodash/cloneDeep';

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

  if (props.data.position !== "GK") var stats = _pick(props.data, ["Pace", "Shooting", "Passing", "Dribbling", "Defence", "Physicality"])

  return (
    <div className="p-2 d-flex" style={{ width: 480}}>
      <div className="card card-outline-secondary mb-3">
        <h4 className="card-header">{props.data.Name} <span className="badge badge-success">{props.data.Position}</span> <span className="badge badge-info">{props.data.Rating}</span></h4>
        <div className="card-block bg-inverse text-white">
          <h6 className="card-subtitle mb-2">Positions: {props.posAssoc.join(", ")}</h6>
          <GaugeCharts stats={stats} />
          <footer>Price: ${props.data.Price}</footer>
        </div>
      </div>
    </div>
  );
}