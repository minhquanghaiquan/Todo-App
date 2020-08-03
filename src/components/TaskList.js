import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem'


function TaskList(props) {
    const [filterName , setFilterName]= useState('');
    const [filterStatus, setFilterStatus] = useState(-1);
    const {tasks, onUpdateStatus, onDelete, onUpdate, onFilter}= props
   
    useEffect(() => {
        onFilter(filterName.toLowerCase(), filterStatus)
    }, [filterName]);

    useEffect(() => {
        onFilter(filterName, filterStatus)
    }, [filterStatus]);

    // useEffect(() => {
    //    filter.name=''
    // //    filter.status=-1;
    // });

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
                        onUpdateStatus={onUpdateStatus}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                ): 'Loading...'}
            </tbody>
        </table>
    );
}

export default TaskList;
