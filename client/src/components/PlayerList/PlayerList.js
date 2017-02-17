import React, { Component } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';

import TextCell from './components/TextCell';
import SortHeaderCell from './components/SortHeaderCell';

import {Card, CardText} from 'material-ui/Card';

import _ from 'lodash';

const SortTypes = {
  ASC: 'asc',
  DESC: 'desc',
};

const nonGkColumns = ["id", "Name", "Position", "Rating", "Pace", "Shooting", "Passing", "Dribbling", "Defence", "Physicality", "Price"];
const gkColumns = ["id", "Name", "Position", "Rating", "Diving", "Handling", "Kicking", "Reflexes", "Speed", "Positioning", "Price"];

// const columns = {
//   id: "id",
//   Name: "Name",
//   Position: "Position",
//   Rating: "Rating",
//   Pace: "Pace",
//   Shooting: "Shooting",
//   Passing: "Passing",
//   Dribbling: "Dribbling",
//   Defence: "Defence",
//   Physicality: "Physicality",
//   Price: "Price",
// }

// ({players, activePosition, colSortDirs, onSortPlayersChange, onPlayerSelect, ...props})

export default class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.columns = nonGkColumns;

    this.generateColumnName = this.generateColumnName.bind(this);
    this.handlePlayerSelect = this.handlePlayerSelect.bind(this);
    this.handleSortPlayersChange = this.handleSortPlayersChange.bind(this);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.activePosition !== this.props.activePosition ||
        nextProps.colSortDirs !== this.props.colSortDirs) return true;
    else return false;
  }

  generateColumnName(columnKey, format = true) {
    if (this.props.activePosition === "GK") columnKey = gkColumns[nonGkColumns.indexOf(columnKey)];
    
    var sortDir = this.props.colSortDirs[columnKey];
    return _.toUpper(format ? columnKey.slice(0, 3) : columnKey) + (sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : '')
  }

  handlePlayerSelect(e, idx) { this.props.onPlayerSelect(this.props.players[idx].id); }

  handleSortPlayersChange(columnKey) { this.props.onSortPlayersChange(columnKey); }

  render() {
    return (
      <Card containerStyle={{ padding: 0 }}>
        <CardText style={{ padding: 0 }}>
          <Table
            rowsCount={this.props.players.length}
            rowHeight={30}
            scrollToRow={0}
            headerHeight={50}
            width={800}
            height={240}
            onRowClick={this.handlePlayerSelect}
            >
            <Column
              columnKey={this.columns[1]}
              header={<Cell className="bg-faded">Name</Cell>}
              cell={<TextCell data={this.props.players} col={this.columns[1]} />}
              width={100}
              flexGrow={1}
              fixed
              />
            <Column
              columnKey={this.columns[3]}
              header={
                <SortHeaderCell
                  onSortChange={this.handleSortPlayersChange}
                  >
                  {this.generateColumnName(this.columns[3])}
                </SortHeaderCell>
              }
              cell={<TextCell data={this.props.players} col={this.columns[3]} />}
              width={60}
              />
            <Column
              columnKey={this.columns[2]}
              header={<Cell className="bg-faded">POS</Cell>}
              cell={<TextCell data={this.props.players} col={this.columns[2]} />}
              width={60}
              />
            <Column
              columnKey={this.columns[4]}
              header={
                <SortHeaderCell
                  onSortChange={this.handleSortPlayersChange}
                  >
                  {this.generateColumnName(this.columns[4])}
                </SortHeaderCell>
              }
              cell={<TextCell data={this.props.players} col={this.columns[4]} />}
              width={60}
              />
            <Column
              columnKey={this.columns[5]}
              header={
                <SortHeaderCell
                  onSortChange={this.handleSortPlayersChange}
                  >
                  {this.generateColumnName(this.columns[5])}
                </SortHeaderCell>
              }
              cell={<TextCell data={this.props.players} col={this.columns[5]} />}
              width={60}
              />
            <Column
              columnKey={this.columns[6]}
              header={
                <SortHeaderCell
                  onSortChange={this.handleSortPlayersChange}
                  >
                  {this.generateColumnName(this.columns[6])}
                </SortHeaderCell>
              }
              cell={<TextCell data={this.props.players} col={this.columns[6]} />}
              width={60}
              />
            <Column
              columnKey={this.columns[7]}
              header={
                <SortHeaderCell
                  onSortChange={this.handleSortPlayersChange}
                  >
                  {this.generateColumnName(this.columns[7])}
                </SortHeaderCell>
              }
              cell={<TextCell data={this.props.players} col={this.columns[7]} />}
              width={60}
              />
            <Column
              columnKey={this.columns[8]}
              header={
                <SortHeaderCell
                  onSortChange={this.handleSortPlayersChange}
                  >
                  {this.generateColumnName(this.columns[8])}
                </SortHeaderCell>
              }
              cell={<TextCell data={this.props.players} col={this.columns[8]} />}
              width={60}
              />
            <Column
              columnKey={this.columns[9]}
              header={
                <SortHeaderCell
                  onSortChange={this.handleSortPlayersChange}
                  >
                  {this.generateColumnName(this.columns[9])}
                </SortHeaderCell>
              }
              cell={<TextCell data={this.props.players} col={this.columns[9]} />}
              width={60}
              />
            <Column
              columnKey={this.columns[10]}
              header={
                <SortHeaderCell
                  onSortChange={this.handleSortPlayersChange}
                  >
                  {this.generateColumnName(this.columns[10], false)}
                </SortHeaderCell>
              }
              cell={<TextCell data={this.props.players} col={this.columns[10]} />}
              width={100}
              />

          </Table>
        </CardText>
      </Card>
    )
  };
}
