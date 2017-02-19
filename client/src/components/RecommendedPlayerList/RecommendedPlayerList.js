import React, { Component } from 'react';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Chip from 'material-ui/Chip';
import { blueGrey300, pink50, green100, orange900, grey900, grey300, white } from 'material-ui/styles/colors';

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
      <Card style={{ width : 400, maxHeight: 230 }}>
        <CardHeader
          title="Similar Players"
          titleColor={white}
          subtitle={"Tap to assign to " + this.props.activePosition}
          subtitleColor={grey300}
          style={{ backgroundColor: orange900 }} />
        <CardText>
          {
            this.state.recommendedPlayers ?
              <List style={{ maxHeight: 100, overflowY: 'scroll' }}>
                {this.state.recommendedPlayers.map((player) => (
                  <ListItem
                    key={player.id}
                    onTouchTap={this.handlePlayerSelect.bind(null, player)}
                    innerDivStyle={listItemStyle}
                    leftAvatar={<Avatar style={avatarStyle}>{player.Position}</Avatar>}
                    >
                    <div className="d-flex justify-content-between" style={{ width: "100%" }}>
                      <span className="truncate">{player.Name}</span>
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