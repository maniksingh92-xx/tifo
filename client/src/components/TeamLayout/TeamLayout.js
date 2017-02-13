import React from 'react';
import TeamPlayer from './components/TeamPlayer';


export default function TeamLayout(props) {

  function handlePositionSelect(pos) { props.onPositionSelect(pos); }

  return (
    <div className="p-2" style={{ width : 560}}>
      <div className="d-flex justify-content-around">
        <TeamPlayer onPositionSelect={handlePositionSelect} data={props.data.LW} position="LW" />
        <TeamPlayer onPositionSelect={handlePositionSelect} data={props.data.ST} position="ST" />
        <TeamPlayer onPositionSelect={handlePositionSelect} data={props.data.RW} position="RW" />
      </div>
      <div className="d-flex justify-content-around">
        <TeamPlayer onPositionSelect={handlePositionSelect} data={props.data.LM} position="LM" />
        <TeamPlayer onPositionSelect={handlePositionSelect} data={props.data.CM} position="CM" />
        <TeamPlayer onPositionSelect={handlePositionSelect} data={props.data.RM} position="RM" />
      </div>
      <div className="d-flex justify-content-around">
        <TeamPlayer onPositionSelect={handlePositionSelect} data={props.data.LB} position="LB" />
        <TeamPlayer onPositionSelect={handlePositionSelect} data={props.data.LCB} position="LCB" />
        <TeamPlayer onPositionSelect={handlePositionSelect} data={props.data.RCB} position="RCB" />
        <TeamPlayer onPositionSelect={handlePositionSelect} data={props.data.RB} position="RB" />
      </div>
      <div className="d-flex justify-content-around">
        <TeamPlayer onPositionSelect={handlePositionSelect} data={props.data.GK} position="GK" />
      </div>
    </div>
  )
}