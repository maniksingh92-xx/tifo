import React from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import _map from 'lodash/map';
import _pick from 'lodash/pick';
import _cloneDeep from 'lodash/cloneDeep';

import { formatCurrency } from '../../services/common';

import C3Chart from 'react-c3js';

function GaugeCharts(props) {

  var defaultOptions = {
    bindto: null,
    data: {
      type: "gauge",
      columns: null,
    },
    gauge: {
      label: {
        show: false,
        format: function (value, ratio, id) {
          return value+"%";
        },
      }
    },
    color: {
      pattern: ['#FF0000', '#F97600', '#FAAA00', '#F6C600', '#99CC00', '#00AA00'],
      threshold: { values: [50, 60, 70, 80, 90, 100] },
    },
    size: {
      height: 60,
    },
    axis: {
      x: {
        show: false
      },
      y: {
        show: false
      }
    },
    tooltip: {
      show: false
    }
  };

  var gkKeys = {
    "Pace": "Diving",
    "Shooting": "Handling",
    "Passing": "Kicking",
    "Dribbling": "Reflexes",
    "Defence": "Speed",
    "Physicality": "Positioning"
  }

  var charts = _map(props.stats, (value, key) => {
    if (props.pos == "GK") key = gkKeys[key];
    var options = _cloneDeep(defaultOptions);
    options.data.columns = [[key, value]];
    return (
      <div className="d-flex flex-column align-items-center w-33" key={key}>
        <C3Chart
          data={options.data}
          color={options.color}
          gauge={options.gauge}
          size={options.size}
          axis={options.axis}
          legend={options.legend}
          tooltip={options.tooltip} />
        <span className="gauge-legend">{key}</span>
      </div>
    )
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-around">
      {charts}
    </div>);
}


function PlayerActionButton({assignedPosition, activePosition, onAssignPlayerToPostion, ...props}) {
  function handleAssignPlayerToPosition() { onAssignPlayerToPostion() };

  if (!assignedPosition) {
    return <FlatButton
              onTouchTap={handleAssignPlayerToPosition}
              label={"Assign to " + activePosition} />
  } else if (assignedPosition === activePosition) {
    return <FlatButton
              label={"Assigned to " + assignedPosition}
              primary={true}
              hoverColor={"transparent"}
              rippleColor={"transparent"}
              style={{cursor: "default"}} />
  } else {
    return <FlatButton
              label={"Assigned to " + assignedPosition}
              secondary={true}
              disabled={true} />
  }
}

export default function PlayerInfo({player,
                                    assignedPosition,
                                    posAssoc,
                                    activePosition,
                                    onAssignPlayerToPostion,
                                    ...props}) {

  var formattedPrice = formatCurrency(player.Price);
  var stats = _pick(player, ["Pace", "Shooting", "Passing", "Dribbling", "Defence", "Physicality"])
  function handleAssignPlayerToPosition() { onAssignPlayerToPostion(player, activePosition); }


  return (
    <Paper zDepth={4} style={{ marginRight: 16, width: 320 }}>
      <Card>
        <CardHeader
          title={player.Name}
          subtitle={formattedPrice}
          actAsExpander={true}
          showExpandableButton={true} />
        <CardText expandable={true}>
          <h6>Positions: {posAssoc.join(", ")}</h6>
          <GaugeCharts stats={stats} pos={player.Position} />
        </CardText>
        <CardActions style={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <PlayerActionButton
            onAssignPlayerToPostion={handleAssignPlayerToPosition}
            assignedPosition={assignedPosition}
            activePosition={activePosition} />
          <Chip>{player.Rating}</Chip>
        </CardActions>
      </Card>
    </Paper>
  )
}