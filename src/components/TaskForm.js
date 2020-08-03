import React, { useState, useEffect } from 'react';


function TaskForm(props) {
    const [name , setName] = useState('');
    const [status , setStatus] = useState(false);
    const [id , setId] = useState('');

    const {onCloseForm, task } = props;

    const onSubmit = (e) => {
        e.preventDefault();
        if(name) {
            props.onSubmit({name , status, id})
            onClear();
            onCloseForm();
        }
    }

    const onClear = () => {
        setName('');
        setStatus(false);
    }

    useEffect(() => {
        console.log(task)
        if(task) {
            setId(task.id);
            setName(task.name);
            setStatus(task.status);
        } else {
            setId('');
            setName('');
            setStatus(false);
        }
        
    }, [props.task]);

    return (
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title"> {id !==''? "Cap Nhat Cong Viec ":'Thêm Công Việc'}
                    <span className="fa fa-times-circle text-right ml-2" onClick={onCloseForm}></span>
                </h3>
            </div>
            <div className="panel-body">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng Thái :</label>
                        <select 
                            className="form-control" 
                            required="required"
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                                <option value={true}>Kích Hoạt</option>
                                <option value={false}>Ẩn</option>
                        </select>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning"> {id !==''? "Luu Lai ":'Them'}</button>&nbsp;
                        <button type="submit" className="btn btn-danger" onClick={onClear}>Hủy Bỏ</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;
