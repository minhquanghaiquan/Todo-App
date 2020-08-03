import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm'
import Control from './components/Control'
import TaskList from './components/TaskList'
import './App.css';

var uniqid = require('uniqid');

function App() {

  const [tasks , setTasks] = useState([]);
  const [isDisplayForm, setIsDisplayForm] = useState(false);
  const [taskEditing, setTaskEditing] = useState(null);
  const [filter, setFilter] = useState({name:'' , status: -1});
  const  [listTasksFilter, setListSTasksFilter] = useState([]);
  // const  [sortBy, setSortBy] = useState('');
  // const  [sortValue, setSortValue] = useState(1);
  const [sort, setSort] = useState({by:'' , value: 1});

  useEffect(() => {
    if (localStorage && localStorage.getItem('tasks')) {
      console.log('add')
      var gettasks = JSON.parse(localStorage.getItem('tasks'));
      setTasks(gettasks)
    }
  }, []);
  
  useEffect(()=> {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },[tasks])

  const onCloseForm = () => {
    setIsDisplayForm(false);
  }

  const onShowForm = () => {
    setIsDisplayForm(true);
  }

  const onSubmit = (data) => {
    console.log(data)
    if(data.id !== '') {
      tasks.forEach((task, index)=> {
        if(task.id === data.id) {
          console.log(data)
          tasks[index] = data;
          setTasks([...tasks]);
          setTaskEditing(null);
          setFilter({name:'' , status: -1});
          
        }
      });
    }else {
      setTasks([...tasks , {
        id:uniqid(),
        name: data.name,
        status: data.status === "true" ? true : false
      }])
      setFilter({name:'' , status: -1});
    }
  }
 
  const onUpdateStatus = (id) => {
      tasks.forEach((task, index)=> {
          if(task.id === id) {
            tasks[index].status = !tasks[index].status;
            setTasks([...tasks]);
            filterBy();
          }
      });
  }

  const onDelete = (id) => {
    tasks.forEach((task, index)=> {
      if(task.id === id) {
        tasks.splice(index, 1)
        setTasks([...tasks]);
        filterBy();
      }
    });
    onCloseForm();
  }

  const onUpdate = (id) => {
    tasks.forEach(async (task, index)=> {
      if(task.id === id) {
        setTaskEditing({...tasks[index]})
        setFilter({name:'' , status: -1});
      }
      onShowForm();
    });
  }

  const onToggleForm = () => {
    if (isDisplayForm && taskEditing !==null) {
      console.log('day ne')
      setIsDisplayForm(true);
      setTaskEditing(null)
    }else {
      setIsDisplayForm(!isDisplayForm);
      setTaskEditing(null)
    }
  }

  const onFilter=(filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus);
    setFilter({name: filterName , status: filterStatus})
  } 

 


  const filterBy = () => {
    if (filter.name !== '') {
        var newtasks1 = tasks.filter((task)=> {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        })
        if (newtasks1.length !== 0) {
          var newtasks2;
          if(filter.status === -1) {
            setListSTasksFilter(newtasks1)
          } else {
              newtasks2 = newtasks1.filter((task)=> {
                  return task.status === (filter.status === 1 ? true : false)
              })
              if (newtasks2.length !==0) {
                setListSTasksFilter(newtasks2)
              } else {
                setListSTasksFilter([{err: "Khong Tim Thay Ket Qua" }])
              }
          }

        }else {
          setListSTasksFilter([{err: "Khong Tim Thay Ket Qua" }])
        }
    }else {

        if(filter.status === -1) {
          setListSTasksFilter([])
        } else {
            var newtasks = tasks.filter((task)=> {
                return task.status === (filter.status === 1 ? true : false)
            })
            setListSTasksFilter(newtasks)
        }
    }
  }

  useEffect(()=> {
    filterBy();
    
  },[filter.status])

  useEffect(()=> {
    filterBy();
  },[filter.name])

  
  // const filterByStatus = () => {
  //   var newtasks1 = tasks.filter((task)=> {
  //         if ( filter.status === -1) {
  //           return [...tasks]
  //         } else {
  //           return task.status === (filter.status === 1 ? true : false)
  //         }
  //     })
  //     var newtasks2;
  //     if(filter.name!== '') {
  //       newtasks2 = newtasks1.filter((task)=> {
  //         return task.name.toLowerCase().indexOf(filter.name) !== -1;
  //       })
  //     }

  //     if (newtasks2) {
  //       setListSTasksFilter(newtasks2);
  //     } else {
  //       setListSTasksFilter(newtasks1);
  //     }
  // }

  const onSearch = (keyword) => {
    setFilter({name: keyword , status: -1});
    filterBy();
  }

  const onSort = (data) => {
    setSort(data)
  }

  useEffect(() => {
    if(sort.by === 'name') {
      tasks.sort((a,b) => {
        if(a.name > b.name) return sort.value;
        else if ( a.name < b.name) return -sort.value;
        else return 0;
      })
      filterBy();
    }else {
      tasks.sort((a,b) => {
        if(a.status > b.status) return -sort.value;
        else if ( a.status < b.status) return sort.value;
        else return 0;
      })
      filterBy();
    }
  }, [sort]);


  return (
   <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">

            <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                {isDisplayForm? <TaskForm onCloseForm= {onCloseForm} onSubmit={onSubmit} task={taskEditing}/> : null }
               
            </div>

            <div className= {isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>

                <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={onToggleForm}
                >
                    <span className="fa fa-plus mr-2"></span>Thêm Công Việc
                </button>

                <Control 
                  onSearch = {onSearch}
                  onSort = {onSort}
                  
                />

                <div className="row mt-2">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList 
                          tasks={(listTasksFilter.length !==0 && !listTasksFilter[0].err) ? listTasksFilter : tasks} 
                          onUpdateStatus= {onUpdateStatus}
                          onDelete={onDelete}
                          onUpdate={onUpdate}
                          onFilter={onFilter}
                          filter={filter}
                        />
                    </div>
                </div>

            </div>
        </div>
   </div>
  );
}

export default App;
