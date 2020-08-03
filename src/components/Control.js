import React from 'react';
import Search from './Search'
import Sort from './Sort'

function Control(props) {
  return (
    <div className="row mt-2">
        <Search onSearch= {props.onSearch} />
        <Sort onSort={props.onSort}/>
    </div>
  );
}

export default Control;
