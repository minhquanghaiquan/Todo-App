import * as types from './../constants/ActionTypes';
var uniqid = require('uniqid');

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data? data : [];


var findIndex = (tasks , id) => {
    var result = -1 ;

    tasks.forEach((task , index)=> {
        if(task.id === id) {
            result = index;
        }
    });
    return result;
}


var Tasks = (state = initialState , action) => {
    var index = -1;
    switch(action.type) {
        case types.LIST_ALL:
            return state
        case types.SAVE_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: (action.task.status === 'true'||action.task.status === true)? true: false
            }
            if (!task.id) {
                task.id = uniqid();
                state.push(task);
            }else {
                index = findIndex(state, task.id);
                state[index] = task;
            }
            
            localStorage.setItem('tasks', JSON.stringify(state) );
            return [...state];
        case types.UPDATE_STATUS_TASK:
           index = findIndex(state , action.id);
            //cách 1
            // var cloneTask = {...state[index]};
            // cloneTask.status = !cloneTask.status;
            // state[index]= cloneTask;

            //cách 2:
            state[index]= {
                ...state[index],
                status: !state[index].status
            }
            
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK: 
            index = findIndex(state , action.id);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state]
        default: 
            return state
    }
    
}

export default Tasks