import React from 'react';
import * as actions from './../actions/index'
import { connect } from 'react-redux';


function TaskItem(props) {
    
    const {task, index, onUpdateStatus, onDeleteTask, onCloseForm, onOpenForm, onEditTask } = props;

    const onUpdate = () => {
        onOpenForm();
        onEditTask(task);
    }

    const onDeleteItem = () => {
        onDeleteTask(task.id);
        onCloseForm();
    }

    return ( 
        <tr>
            <td>{index +1}</td>
            <td>{task.name}</td>
            <td className="text-center">
                <span 
                    className={task.status === true? "badge badge-danger" : "badge badge-success" }
                    onClick= {()=> onUpdateStatus(task.id)}
                    >
                        {task.status === true? 'Kich Hoat' : "An"}
                </span>
            </td>
            <td className="text-center">
                <button type="button" className="btn btn-warning" onClick={onUpdate}>
                    <span className="fa fa-pencil mr-2"></span>Sửa
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={onDeleteItem}>
                    <span className="fa fa-trash mr-2"></span>Xóa
                </button>
            </td>
        </tr>
    );
}

const mapStateToProps = (state) => {
    return {
    }
    
  }
  
  const mapDispatchToProps =(dispatch , props) => {
    return {    
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task));
        }
  
    }
  }

export default connect (mapStateToProps , mapDispatchToProps)(TaskItem);