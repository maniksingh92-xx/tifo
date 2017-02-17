import React, { Component } from 'react';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Chip from 'material-ui/Chip';

import { get as getRecommendedPlayers } from '../../data/recommendedPlayers';


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

export default class RecommendedPlayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendedPlayers: null
    }

    this.handlePlayerSelect = this.handlePlayerSelect.bind(this);
    this.getRecommendedPlayers = getRecommendedPlayers.bind(this);
  }

  componentWillMount() {
    this.getRecommendedPlayers({ playerId: this.props.displayPlayerId })
      .then((data) => { this.setState({ recommendedPlayers : data }) });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.displayPlayerId !== this.props.displayPlayerId) {
      this.getRecommendedPlayers({ playerId: nextProps.displayPlayerId })
        .then((data) => { this.setState({ recommendedPlayers : data }) });
    }
  }

  handlePlayerSelect(player) { this.props.onAssignPlayerToPostion(player, this.props.activePosition) }

  render() {
    return (
      <Card>
        <CardHeader
          title="Similar Players"
          subtitle={"Tap to assign to " + this.props.activePosition} />
        <CardText>
          {
            this.state.recommendedPlayers ?
              <List style={{ height: 100, overflowY: 'scroll' }}>
                {this.state.recommendedPlayers.map((player) => (
                  <ListItem
                    key={player.id}
                    onTouchTap={this.handlePlayerSelect.bind(null, player)}
                    innerDivStyle={listItemStyle}
                    leftAvatar={<Avatar style={avatarStyle}>{player.Position}</Avatar>}
                    >
                    <div className="d-flex justify-content-between" style={{ width: "100%" }}>
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
}