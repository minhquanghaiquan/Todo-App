import React, { useState, useEffect } from 'react';


function Sort(props) {

    const [sort , setSort] = useState({by: 'name', value: 1});
    const onClick = async(sortBy, sortValue, e) => {
        e.preventDefault();
        setSort({by: sortBy, value: sortValue});
        
    }
    useEffect(() => {
        props.onSort(sort);
    }, [sort]);

    
  return (
    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Sắp Xếp <span className="fa fa-caret-square-o-down ml-2"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li onClick = {(e) => onClick ('name' , 1, e)}>
                    <a role="button"
                        className={(sort.by === 'name' && sort.value === 1)? 'sort_selected' : ''}
                        href='/'
                    >
                    <span className="fa fa-sort-alpha-asc pr-2">
                        Tên A-Z
                    </span>
                    </a>
                </li>
                <li  onClick = {(e) => onClick ('name' , -1 , e)}>
                    <a role="button"
                         className={(sort.by === 'name' && sort.value === -1)? 'sort_selected' : ''}
                         href='/'
                    >
                    <span className="fa fa-sort-alpha-desc pr-2">
                        Tên Z-A
                    </span>
                    </a>
                </li>
                <li role="separator" className="divider"></li>
                <li  onClick = {(e) => onClick ('status' , 1, e)}><a role="button"  className={(sort.by === 'status' && sort.value === 1)? 'sort_selected' : ''}
                        href='/'>Trạng Thái Kích Hoạt</a></li>
                <li  onClick = {(e) => onClick ('status' , -1 , e)}><a role="button"  className={(sort.by === 'status' && sort.value === -1)? 'sort_selected' : ''}
                        href='/'>Trạng Thái Ẩn</a></li>
            </ul>
        </div>
    </div>
  );
}

export default Sort;