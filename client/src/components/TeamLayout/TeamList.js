import React from 'react';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Subheader from 'material-ui/Subheader';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import { blueGrey300, pink50, green100, orange900, grey900, white } from 'material-ui/styles/colors';

export default function TeamList({team, activePosition, onPositionSelect, onClearTeam, ...props}) {

  function handleClearTeam(e) { 
    e.preventDefault();
    onClearTeam();
  };

  function handlePositionSelect(pos) { onPositionSelect(pos); }

  return (
    <div style={{backgroundColor: orange900}}>
      <BuildTeamList
        team={team}
        formation={props.formation}
        onPositionSelect={handlePositionSelect}
        activePosition={activePosition} />
      <RaisedButton
        backgroundColor={grey900}
        labelColor={white}
        style={{marginLeft: 16}}
        onTouchTap={handleClearTeam}
        label="Delete Team"
        labelPosition="before"
        icon={<ActionDelete />} />
    </div>
  );
}

function BuildTeamList({team, activePosition, onPositionSelect, ...props}) {
  var positions = ["LW","ST","RW","LM","CM","RM","LB","LCB","RCB","RB","GK"];
  var formation = [3,3,4,1];
  var formationLabel = ["Attack", "Mid", "Defence", "Goalkeeper"];
  function handlePositionSelect(pos) { onPositionSelect(pos); }

  var formationRows = formation.map(function (row) {
    var currentRowPlayers = [];
    while (row--) { currentRowPlayers.push(positions.shift()) }
    return currentRowPlayers;
  });

  const subheaderStyle = { lineHeight: "24px", color: grey900};

  var layout = formationRows.map(function (rowPlayers, index) {
    return (
      <List key={formationLabel[index]}>
        <Subheader style={subheaderStyle}>{formationLabel[index]}</Subheader>
        {rowPlayers.map((pos) => (
          <TeamListItem
            active={pos === activePosition}
            onPositionSelect={handlePositionSelect}
            key={pos}
            player={team[pos]}
            position={pos} />
        ))}
      </List>
    )
  });

  return <div style={{paddingTop: 8}}>{layout}</div>
}


function TeamListItem({active, onPositionSelect, player, position, ...props}) {
  var name, rating;
  if (player == null) {
    name = "Unassigned";
    rating = null;
  } else {
    name = player.Name;
    rating = player.Rating;
  }

  function handlePositionSelect(e) { e.preventDefault(); onPositionSelect(position); };

  const avatarStyle = {
    marginTop: 4,
    marginBottom: 4,
    height: 32,
    width: 32,
    display: "flex",
    justifyContent: "center",
    fontSize: 12,
    top: 0,
    left: 16
  };

  const listItemStyle = {
    paddingTop: 12,
    paddingBottom: 12,
    display: "flex",
    alignItems: "center"
  };

  const chipStyle = {
    lineHeight: "16px"
  }

  const style = Object.assign({},
                              player ? { backgroundColor: orange900 } : { backgroundColor: orange900 },
                              active && { backgroundColor: grey900 });

  return (
    <ListItem
      style={style}
      onTouchTap={handlePositionSelect}
      innerDivStyle={listItemStyle}
      leftAvatar={<Avatar style={avatarStyle}>{position}</Avatar>}
    > 
      <div className="d-flex justify-content-between" style={{width:"100%", color: white}}>
        <span className="truncate">{name}</span>
        {rating ? <Chip labelStyle={chipStyle}>{rating}</Chip> : null }
      </div>
    </ListItem>
  );
}