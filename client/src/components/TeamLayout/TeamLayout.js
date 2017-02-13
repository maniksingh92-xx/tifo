import React from 'react';
import TeamPlayer from './components/TeamPlayer';


function BuildTeamLayout(props) {
  var formation = props.formation.slice().reverse();
  formation.push(1);
  var positions = ["LW","ST","RW","LM","CM","RM","LB","LCB","RCB","RB","GK"];

  formation = formation.reduce(function (result, row, index) {
    var currentRow = [];
    while(row--) { currentRow.push(positions.shift());  };
    result.push(currentRow);
    return result;
  }, []);

  function handlePositionSelect(pos) { props.onPositionSelect(pos); }

  var layout = formation.map(function (row) {
    return (
      <div key={"row" + row} className="d-flex justify-content-around">
        {row.map( function (pos) {
          return <TeamPlayer
                    active={pos === props.activePosition}
                    key={pos}
                    onPositionSelect={handlePositionSelect}
                    data={props.data[pos]}
                    position={pos} />
        })}
      </div>
    );
  });

  return <div>{layout}</div>;
}

export default function TeamLayout(props) {

  function handlePositionSelect(pos) { props.onPositionSelect(pos); }

  return (
    <div className="p-2" style={{ width: 560 }}>
      <BuildTeamLayout
        data={props.data}
        formation={props.formation}
        onPositionSelect={handlePositionSelect}
        activePosition={props.activePosition} />
    </div>
  )
}