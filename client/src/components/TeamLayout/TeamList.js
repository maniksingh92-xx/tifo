import React from 'react';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Subheader from 'material-ui/Subheader';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';

export default function TeamList({team, activePosition, onPositionSelect, onClearTeam, ...props}) {

  function handleClearTeam(e) { 
    e.preventDefault();
    onClearTeam();
  };

  function handlePositionSelect(pos) { onPositionSelect(pos); }

  return (
    <div>
      <BuildTeamList
        team={team}
        formation={props.formation}
        onPositionSelect={handlePositionSelect}
        activePosition={activePosition} />
      <FlatButton
        onTouchTap={handleClearTeam}
        label="Delete Team"
        labelPosition="before"
        secondary={true}
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

  const subheaderStyle = { lineHeight: "24px"};

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

  return (
    <ListItem
      onTouchTap={handlePositionSelect}
      innerDivStyle={listItemStyle}
      leftAvatar={<Avatar style={avatarStyle}>{position}</Avatar>}
    >
      <span>{name}</span>
      <Chip labelStyle={chipStyle}>{rating}</Chip>
    </ListItem>
  );
}