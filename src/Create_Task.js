import React, { Component } from 'react';
import {connect} from 'react-redux';

 class CreateTask extends Component {

  handleCreateTaskSubmit =() => {

    let submissionBody = {

    }
    const config={
      Accept: "application/json",
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(submissionBody)
    }
    fetch("http://localhost:3000/api/v1/todolists")
  }

 render() {

return (<div><form onSubmit={this.handleCreateTaskSubmit}>
<label>Task To:<input type="text" value={this.props.task_to} onChange={(event)=>this.props.handleTaskToInput(event)}/></label>
<label>Message<input type="text" value={this.props.message} onChange={(event)=>this.props.handleCreateTaskMessageInput(event)}/></label>
<input type="submit" value="Create Task"/>
</form>
</div>)
 }

 }

 function mapStateToProps(state) {
   return {
    task_to:state.task_to,
    message: state.message,

   }
 }


 function mapDispatchToProps(dispatch) {
   return {
     //setState use callback function
     // addHeads: (data) => {
     //   dispatch({type: "ADD_HEADS", payload: data})
     // } it will be this.props.addHeads() instead of setState({})
     handleTaskToInput: (event) => {
       dispatch({type: "SEND_TASK_TO", payload: event.target.value})
     },
     handleCreateTaskMessageInput:(event) =>{
       dispatch({type:"CREATE_MESSAGE",payload:event.target.value})
     },

 }
}
export default connect(mapStateToProps,mapDispatchToProps)(CreateTask)
