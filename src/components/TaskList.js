import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem'
import { connect } from 'react-redux';
import * as actions from './../actions/index'


function TaskList(props) {
    const [filterName , setFilterName]= useState('');
    const [filterStatus, setFilterStatus] = useState(-1);

    var {tasks , onFilterTable , filterTable , keyword ,sort}= props
   
    useEffect(() => {
        onFilterTable({name: filterName.toLowerCase(),status: filterStatus})
    }, [filterName]);

    useEffect(() => {
        onFilterTable({name: filterName, status: filterStatus})
    }, [filterStatus]);


    if(filterTable.name) {
        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
        });
    }

    tasks = tasks.filter((task) => {
        if(filterTable.status === -1) {
            return task;
        }else {
            return task.status===(filterTable.status ===1? true: false);
        }
    });

    if(keyword !== '') {
        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        });
    }

    // sort
    if(sort.by ==='name') {
        tasks.sort((a,b) => {
            if(a.name > b.name) return sort.value;
            else if ( a.name < b.name) return -sort.value;
            else return 0;
        });
    }else {
        tasks.sort((a,b) => {
            if(a.status > b.status) return -sort.value;
            else if ( a.status < b.status) return sort.value;
            else return 0;
        });
    }

    return (
        <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input 
                            type="text" 
                            className="form-control"
                            name="filterName" 
                            value={filterName}
                            onChange= {(e)=> setFilterName(e.target.value)}
                        />
                    </td>
                    <td>
                        <select 
                            className="form-control" 
                            name="filterStatus" 
                            value={filterStatus}
                            onChange= {(e)=> setFilterStatus(e.target.value)}
                        >
                                <option value="-1">Tất Cả</option>
                                <option value="0">Ẩn</option>
                                <option value="1">Kích Hoạt</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                {tasks ? tasks.map((task, index) => 
                    <TaskItem 
                        key={index} 
                        index={index} 
                        task = {task}
                    />
                ): 'Loading...'}
            </tbody>
        </table>
    );
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filterTable : state.filterTable,
        keyword: state.search,
        sort: state.sort
    }
}
const mapDispatchToProps =(dispatch , props) => {
    return {
        onFilterTable : (filter) => {
            dispatch(actions.filterTask(filter))
        }
  
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
