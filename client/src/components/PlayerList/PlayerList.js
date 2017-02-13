import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table';

import TextCell from './components/TextCell';
import SortHeaderCell from './components/SortHeaderCell';

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

export default function PlayerList(props) {
  var columns = nonGkColumns;
  var data = props.data;

  function generateColumnName(columnKey, format = true) {
    if (props.activePosition === "GK") columnKey = gkColumns[nonGkColumns.indexOf(columnKey)];
    
    var sortDir = props.colSortDirs[columnKey];
    return _.toUpper(format ? columnKey.slice(0, 3) : columnKey) + (sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : '')
  }

  function handlePlayerSelect(e, idx) { props.onPlayerSelect(props.data[idx].id); }

  function handleSortPlayersChange(columnKey) { props.onSortPlayersChange(columnKey); }

  return (
    <div className="p-2">
      <h2 className="mb-2">Current Position: <span className="cursor-default badge badge-success">{props.activePosition}</span></h2>
      <Table
        rowsCount={data.length}
        rowHeight={30}
        scrollToRow={0}
        headerHeight={50}
        width={768}
        height={240}
        onRowClick={handlePlayerSelect}
        >
        <Column
          columnKey={columns[1]}
          header={<Cell className="bg-faded">Name</Cell>}
          cell={<TextCell data={data} col={columns[1]} />}
          width={100}
          flexGrow={1}
          fixed
          />
        <Column
          columnKey={columns[3]}
          header={
            <SortHeaderCell
              onSortChange={handleSortPlayersChange}
              >
              {generateColumnName(columns[3])}
            </SortHeaderCell>
          }
          cell={<TextCell data={data} col={columns[3]} />}
          width={60}
          />
        <Column
          columnKey={columns[2]}
          header={<Cell className="bg-faded">POS</Cell>}
          cell={<TextCell data={data} col={columns[2]} />}
          width={60}
          />
        <Column
          columnKey={columns[4]}
          header={
            <SortHeaderCell
              onSortChange={handleSortPlayersChange}
              >
              {generateColumnName(columns[4])}
            </SortHeaderCell>
          }
          cell={<TextCell data={data} col={columns[4]} />}
          width={60}
          />
        <Column
          columnKey={columns[5]}
          header={
            <SortHeaderCell
              onSortChange={handleSortPlayersChange}
              >
              {generateColumnName(columns[5])}
            </SortHeaderCell>
          }
          cell={<TextCell data={data} col={columns[5]} />}
          width={60}
          />
        <Column
          columnKey={columns[6]}
          header={
            <SortHeaderCell
              onSortChange={handleSortPlayersChange}
              >
              {generateColumnName(columns[6])}
            </SortHeaderCell>
          }
          cell={<TextCell data={data} col={columns[6]} />}
          width={60}
          />
        <Column
          columnKey={columns[7]}
          header={
            <SortHeaderCell
              onSortChange={handleSortPlayersChange}
              >
              {generateColumnName(columns[7])}
            </SortHeaderCell>
          }
          cell={<TextCell data={data} col={columns[7]} />}
          width={60}
          />
        <Column
          columnKey={columns[8]}
          header={
            <SortHeaderCell
              onSortChange={handleSortPlayersChange}
              >
              {generateColumnName(columns[8])}
            </SortHeaderCell>
          }
          cell={<TextCell data={data} col={columns[8]} />}
          width={60}
          />
        <Column
          columnKey={columns[9]}
          header={
            <SortHeaderCell
              onSortChange={handleSortPlayersChange}
              >
              {generateColumnName(columns[9])}
            </SortHeaderCell>
          }
          cell={<TextCell data={data} col={columns[9]} />}
          width={60}
          />
        <Column
          columnKey={columns[10]}
          header={
            <SortHeaderCell
              onSortChange={handleSortPlayersChange}
              >
              {generateColumnName(columns[10], false)}
            </SortHeaderCell>
          }
          cell={<TextCell data={data} col={columns[10]} />}
          width={80}
          />

      </Table>
    </div>
  );
}
