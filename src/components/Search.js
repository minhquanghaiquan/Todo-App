import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index'



function Search(props) {
  const {onSearch} = props;
  const [keyword , setKeyword] = useState('');


  const onChange = (e) => {
    setKeyword(e.target.value);
  }

 

  return (
    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="input-group">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Nhập từ khóa..." 
              value={keyword}
              onChange={onChange}
            />
            <span className="input-group-btn">
                <button 
                  className="btn btn-primary" 
                  type="button"
                  onClick=  {() => onSearch(keyword)}
                >
                    <span className="fa fa-search mr-2"></span>Tìm
                </button>
            </span>
        </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { 

  }
}

const mapDispatchToProps =(dispatch , props) => {
  return {
    onSearch: (keyword) => {
        dispatch(actions.searchTask(keyword))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);