import React from 'react';
class TodoCreate extends React.Component {
    state = { 
        Description: "",
        Status : false
     }

    isCompleted = (e) => {
        if(this.state.Status === true){
            this.setState({Status:false})  
        }
        else{
        this.setState({Status:true})  

        }
    }

     create = (e) => {
         e.preventDefault();
         if (this.state.Description === "") {
            alert("Please enter a Todo description");
             return;
         }
        this.props.addtodohandler(this.state);
        this.setState({Description:"",Status : false});
     }

    render() {
        return (
            <form className="ui segment" style={{border:"0"}} onSubmit={this.create}>
                        <div className="ui input" style={{marginLeft:"11px", paddingBottom:"20px" ,marginTop:"0px"}}>
                        <input placeholder="Todo description" type="text" value={this.state.Description} 
                        onChange={(e)=>this.setState({Description:e.target.value})} />
                         </div>
                         <div className='ui checkbox' style={{paddingLeft:"3rem" , paddingRight:"1rem"}}>
                        <div className='ui input'><input type="checkbox" name="example" value={this.state.Status} checked={this.state.Status===true}
                        onChange={e=>this.isCompleted(e.target.value)} style={{width:"2rem"}} />
                        <label>Completed?</label></div>
                        </div>
                        <div className="ui icon buttons">
                        <button className="ui primary button" style={{marginLeft:"10px"}}><i className="plus icon"/></button>
                        </div>
            </form>
        );
    }
}

export default TodoCreate;