import React from 'react';


function TaskItem(props) {
    
    const {task, index} = props;

    const onUpdateStatus = () => {
        props.onUpdateStatus(task.id)
    }
    const onDelete = () => {
        props.onDelete(task.id)
    }

    const onUpdate = () => {
        props.onUpdate(task.id)
    }

    return ( 
        <tr>
            <td>{index +1}</td>
            <td>{task.name}</td>
            <td className="text-center">
                <span 
                    className={task.status === true? "badge badge-danger" : "badge badge-success" }
                    onClick= {onUpdateStatus}
                    >
                        {task.status === true? 'Kich Hoat' : "An"}
                </span>
            </td>
            <td className="text-center">
                <button type="button" className="btn btn-warning" onClick={onUpdate}>
                    <span className="fa fa-pencil mr-2"></span>Sửa
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={onDelete}>
                    <span className="fa fa-trash mr-2"></span>Xóa
                </button>
            </td>
        </tr>
    );
}

export default TaskItem;