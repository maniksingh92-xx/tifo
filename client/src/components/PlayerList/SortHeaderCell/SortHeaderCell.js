import React from 'react';
import { Cell } from 'fixed-data-table';

export default function SortHeaderCell({columnKey, sortDir, onSortChange, children, ...props}) {
  function handleSortChange(e) {
    e.preventDefault();
    if (onSortChange) onSortChange(columnKey);
  }

  return (<Cell {...props}><a onClick={handleSortChange} href="">{children}</a></Cell>);
}