import React, { Component } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';

import TextCell from './TextCell';
import SortHeaderCell from './SortHeaderCell';

import _ from 'lodash';
import 'fixed-data-table/dist/fixed-data-table.min.css';

const SortTypes = {
  ASC: 'asc',
  DESC: 'desc',
};

const nonGkColumns = ["id", "Name", "Position", "Rating", "Pace", "Shooting", "Passing", "Dribbling", "Defence", "Physicality", "Price"];

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

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

export default class PlayerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      colSortDirs: {}
    }

    this.handleSortPlayersChange = this.handleSortPlayersChange.bind(this);
    this.generateColumnName = this.generateColumnName.bind(this);
  }

  handleSortPlayersChange(columnKey) {
    var sortDir = reverseSortDirection(this.state.colSortDirs[columnKey]);
    this.setState((prevState, props) => ({
      data: _.orderBy(prevState.data, [columnKey], [sortDir]),
      colSortDirs : { [columnKey] : sortDir }
    }));
  }

  generateColumnName(columnKey, skip=false) {
    var sortDir = this.state.colSortDirs[columnKey];
    return _.toUpper(columnKey.slice(0,3)) + (sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : '')
  }

  render() {
    var columns = nonGkColumns;
    var {data} = this.state;
    return (
      <Table
        rowsCount={data.length}
        rowHeight={30}
        headerHeight={50}
        width={768}
        height={240}
        >
        <Column
          columnKey={columns[1]}
          header={<Cell>Name</Cell>}
          cell={<TextCell data={data} col={columns[1]} />}
          width={100}
          flexGrow={1}
          fixed
          />
        <Column
          columnKey={columns[3]}
          header={
            <SortHeaderCell
              onSortChange={this.handleSortPlayersChange}
              >
            {this.generateColumnName(columns[3])}
            </SortHeaderCell>
          }
          cell={<TextCell data={data} col={columns[3]} />}
          width={60}
          />
        <Column
          columnKey={columns[2]}
          header={<Cell>POS</Cell>}
          cell={<TextCell data={data} col={columns[2]} />}
          width={60}
          />
        <Column
          columnKey={columns[4]}
          header={
            <SortHeaderCell
              onSortChange={this.handleSortPlayersChange}
              >
            {this.generateColumnName(columns[4])}
            </SortHeaderCell>
          }
          cell={<TextCell data={data} col={columns[4]} />}
          width={60}
          />
        <Column
          columnKey={columns[5]}
          header={
            <SortHeaderCell
              onSortChange={this.handleSortPlayersChange}
              >
            {this.generateColumnName(columns[5])}
            </SortHeaderCell>
          }
          cell={<TextCell data={data} col={columns[5]} />}
          width={60}
          />
        <Column
          columnKey={columns[6]}
          header={
            <SortHeaderCell
              onSortChange={this.handleSortPlayersChange}
              >
            {this.generateColumnName(columns[6])}
            </SortHeaderCell>
          }
          cell={<TextCell data={data} col={columns[6]} />}
          width={60}
          />
        <Column
          columnKey={columns[7]}
          header={
            <SortHeaderCell
              onSortChange={this.handleSortPlayersChange}
              >
            {this.generateColumnName(columns[7])}
            </SortHeaderCell>
          }
          cell={<TextCell data={data} col={columns[7]} />}
          width={60}
          />
        <Column
          columnKey={columns[8]}
          header={
            <SortHeaderCell
              onSortChange={this.handleSortPlayersChange}
              >
            {this.generateColumnName(columns[8])}
            </SortHeaderCell>
          }
          cell={<TextCell data={data} col={columns[8]} />}
          width={60}
          />
        <Column
          columnKey={columns[9]}
          header={
            <SortHeaderCell
              onSortChange={this.handleSortPlayersChange}
              >
            {this.generateColumnName(columns[9])}
            </SortHeaderCell>
          }
          cell={<TextCell data={data} col={columns[9]} />}
          width={60}
          />
        <Column
          columnKey={columns[10]}
          header={
            <SortHeaderCell
              onSortChange={this.handleSortPlayersChange}
              >
            {this.generateColumnName(columns[10])}
            </SortHeaderCell>
          }
          cell={<TextCell data={data} col={columns[10]} />}
          width={80}
          />

      </Table>
    );
  }
}
