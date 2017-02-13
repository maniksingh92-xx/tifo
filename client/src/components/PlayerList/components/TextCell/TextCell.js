import React from 'react';
import { Cell } from 'fixed-data-table';

export default function TextCell({rowIndex, data, col, ...props}) {
  return (<Cell role="button" {...props}>{data[rowIndex][col]}</Cell>);
}