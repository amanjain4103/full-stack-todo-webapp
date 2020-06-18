import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Workspace from './components/Workspace/Workspace';
import Loginpage from './components/Loginpage/Loginpage.js';
import Registerpage from './components/Registerpage/Registerpage.js';
import { WaveLoading } from 'react-loadingg';
import './App.css';
import PageLoading from './components/PageLoading/PageLoading';


// var stateToUpload={};
var temp=Date.now();



class App extends React.Component{
  constructor(){
    super();
    this.state = {
      route:"main",
      projects:[{ "projectKey":temp,
                "name":"welcome"}
      ],
      tasks:[{"taskKey":temp,
              "text":"this is sample text",
              "isCompleted":false,
              "projectKey":temp}
      ],
      currentProjectId:temp,
      currentText:"",
      isLoggedIn:false,
      fullname:"Hii There !!!",
      gmail:"",
      isSaveLoading:false,
      isPageLoading:true
    };
  }

  componentDidMount(){
    this.setState({
      isPageLoading:false
    })
  }
  //this will save all changes you made to your to do list
  //this is triggered when you are logged in and click on save button
  
  handleSave = ()=>{
    if(this.state.gmail.trim()!==""){
      this.setState({
        isSaveLoading:true
      })
      fetch("https://sleepy-bayou-07933.herokuapp.com/update",{
          headers:{
              'Content-Type':'application/json'
          },
          method:"POST",
          body: JSON.stringify({
            gmail:this.state.gmail,
            projects:this.state.projects,
            tasks:this.state.tasks
          }) 
      }).then(res=>res.json())
       .then(res=>{
         if(res==="updated"){
          this.setState({
            isSaveLoading:false
          })
         }else{
          this.setState({
            isSaveLoading:false
          })
          alert("cant't raech server");
         }
       })
       .catch(err => {
        this.setState({
            isSaveLoading:false
        })
        alert("can't reach to server")
        console.log(err)
        })
      
  
    }else{
      console.log("not logged in")
    }
    
  }


  handleLogin = ()=>{

        this.setState({
          route:"loginpage"
        })
  }
    
  handleLogout = ()=>{
    this.handleSave();
    this.setState({
      route:"main",
      projects:[{ "projectKey":temp,
                 "name":"welcome"}
      ],
      tasks:[{"taskKey":temp,
              "text":"this is sample text",
              "isCompleted":false,
              "projectKey":temp}
      ],
      currentProjectId:temp,
      currentText:"",
      isLoggedIn:false,
      fullname:"Hii There !!!",
      gmail:"",
      isSaveLoading:false
    })
  }

  handleRegister = ()=>{
    this.setState({
      route:"registerpage"
    })
  }

  handleHome = ()=>{
    this.setState({
      route:"main"
    })
  }

  //adding project functionality button in maintained
  //triggered when add project button is clicked 
  handleProjectName = () => {
    var newProjectName = prompt("Enter project name");
    if(newProjectName!==null){
      if(newProjectName.trim()!==""){

        var newProject = { "projectKey":Date.now(),"name":newProjectName } 
        var updatedProjects = [...this.state.projects,newProject];
        
        this.setState({
          projects:updatedProjects
        })
        
      }
    }
    
  }

  //this is deleting project and also tasks associated with that project
  //triggered when trash icon of project is clicked 
  handleDeleteProject = (projectKey) => {
    
    //asking for confirmation 
    var areYouSure = window.confirm("Are you sure, this will delete your project");
    
    if(areYouSure){

      //deleting projects
      var updatedProject = this.state.projects.filter((project)=>{
        return project.projectKey!==projectKey
      })
      this.setState({
        projects:updatedProject
      })

      //deleting tasks
      var updatedtasks = this.state.tasks.filter((task)=>{
        return task.projectKey!==projectKey
      })

      this.setState({
        tasks:updatedtasks
      })

    }

  }

  //this will update the state of currentProjectId
  //triggered when you click on project name
  handleCurrentProjectId = (currentprojectid) =>{
    this.setState({currentProjectId:currentprojectid})
  }


  //this will update the input field by updating currentText state
  //called when change is detected in task adding input box
  updateCurrentText = (event) => {
    this.setState({currentText:event.target.value})
  }

  //this will create new task having current projectKey
  //triggered when + button is clicked 
  handleAdd = (event) => {
    event.preventDefault(); 
    let textTyped = this.state.currentText
    
    if(textTyped!==null){
      if(textTyped.trim()!==""){
        var newTask = {"taskKey":Date.now(),
          "text":this.state.currentText,
          "isCompleted":false,
          "projectKey":this.state.currentProjectId 
        }
        
        var updatedTasks = [...this.state.tasks,newTask];
        this.setState({tasks:updatedTasks,currentText:""})

      }
    }
  }

  //this will delete task simply using filter on taskKey
  //triggered when you click trash icon of any task
  handleDeleteTask = (taskkey) => {
    
    var updatedTasks = this.state.tasks.filter((task)=>{
      return task.taskKey!==taskkey
    })

    this.setState({tasks:updatedTasks})
  }


  //this will get task having just checked check square set isCompleted property of that task to true
  //triggered when you click on check square icon
  handleCheckSquare = (taskkey) => {
    var updatedTasks = this.state.tasks.filter((task)=>{
      return task.taskKey!==taskkey
    })

    var completedTask = this.state.tasks.filter((task)=>{
      return task.taskKey===taskkey
    })
    completedTask[0].isCompleted=true;
    updatedTasks.push(completedTask[0]);

    this.setState({tasks:updatedTasks})
  } 

  //this will change route according to user register status
  //triggered when response for register form is recieved
  onRouteChangeInRegisterForm = () => {
    this.setState({
      route:"loginpage"
    })
  }

  //this will change all view of the homepage and update state for db data
  //triggered when we recieve userData
  whenLoginFormRecieveData = (user) => {
    this.setState({
      route:"main",
      isLoggedIn:true,
      projects:user.projects,
      tasks:user.tasks,
      fullname:user.fullname,
      gmail:user.gmail
    })
  }

  //adding event listener so that when user closes this webapp his data will be saved
  
  // componentWillUnmount(){
  //   window.addEventListener('beforeunload',(ev)=>{
  //     ev.preventDefault();
  //     console.log("hjj")
  //   })
  // }

  render(){

    return (
      <div> 
        {(this.state.isPageLoading===true)?
          (<PageLoading />):
          (
            <div>
              <Navbar 
              currentRoute={this.state.route} 
              handleLogin={this.handleLogin} 
              handleLogout={this.handleLogout}
              handleRegister={this.handleRegister}
              handleHome={this.handleHome}
              isLoggedIn={this.state.isLoggedIn}
              handleSave={this.handleSave}
              isSaveLoading={this.state.isSaveLoading}
              fullname={this.state.fullname}
              />

              {this.state.route==="loginpage"?
              <Loginpage 
              whenLoginFormRecieveData={this.whenLoginFormRecieveData}
              />  :
                (
                  this.state.route==="registerpage"?
                  <Registerpage 
                  onRouteChangeInRegisterForm={this.onRouteChangeInRegisterForm}
                  /> :
                  <div>
                    <Sidebar 
                    handleProjectName={this.handleProjectName} 
                    projects={this.state.projects}
                    handleDeleteProject={this.handleDeleteProject}
                    handleCurrentProjectId={this.handleCurrentProjectId}
                    />

                    <Workspace 
                    handleAdd={this.handleAdd}
                    currentText={this.state.currentText}
                    currentProjectId={this.state.currentProjectId}
                    tasks={this.state.tasks}
                    updateCurrentText={this.updateCurrentText}
                    handleDeleteTask ={this.handleDeleteTask}
                    handleCheckSquare={this.handleCheckSquare}
                    />

                  </div>
                )
            
              }
            </div>
          )
        }
        
 
      </div>
    )
  }
}

// window.addEventListener('beforeunload', (event) => {
//   // Cancel the event as stated by the standard.
//   event.preventDefault();
  
//   if(stateToUpload.gmail.trim()!==""){
    
//     fetch("http://localhost:4000/update",{
//         headers:{
//             'Content-Type':'application/json'
//         },
//         method:"POST",
//         body: JSON.stringify({
//           gmail:stateToUpload.gmail,
//           projects:stateToUpload.projects,
//           tasks:stateToUpload.tasks
//         }) 
//     }).then(res=>res.json())
//      .then(res=>console.log(res))
    

//   }else{
//     console.log("not logged in")
//   }
  
  
//  console.log(stateToUpload)
//  Chrome requires returnValue to be set.
//  event.returnValue = 'your tasks will be saved';
// });


export default App;







