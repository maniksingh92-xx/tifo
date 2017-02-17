import React from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Chip from 'material-ui/Chip';


export default function RecommendedPlayerList({recommendedPlayers, onPlayerSelect, ...props}) {
  
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

  function handlePlayerSelect(playerId) { onPlayerSelect(playerId) }

  return (
    <Card>
      <CardHeader
        title="Similar Players" />
      <CardText>
        {
          recommendedPlayers ?
            <List style={{ height : 100, overflowY: 'scroll'}}>
              {recommendedPlayers.map((player) => (
                <ListItem
                  key={player.id}
                  onTouchTap={handlePlayerSelect.bind(null, player.id)}
                  innerDivStyle={listItemStyle}
                  leftAvatar={<Avatar style={avatarStyle}>{player.Position}</Avatar>}
                > 
                  <div className="d-flex justify-content-between" style={{width:"100%"}}>
                    <span>{player.Name}</span>
                    <Chip labelStyle={chipStyle}>{player.Rating}</Chip>
                  </div>
                </ListItem>
              ))}
            </List>
            : null
        }
      </CardText>
    </Card>
  )
}