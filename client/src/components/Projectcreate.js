import React from 'react';

class Projectcreate extends React.Component {
    state = { 
        title: "",
     }
     create = (e) => {
         e.preventDefault();
         if (this.state.title === "") {
            alert("Please enter a project title");
             return;
         }
        this.props.addprojecthandler(this.state);
        this.setState({title:""});
     }
    render() {
        return (
            <div className="ui segment" style={{border:"0"}}>
                <div className="ui form">
                    <div className="field" style={{width:"50rem"}}>
                        <label>Create Project</label>
                        <input placeholder="Project title" type="text" 
                        value={this.state.title} onChange={(e)=>this.setState({title:e.target.value})} />
                        <button className="ui primary button" style={{marginTop:"10px"}} onClick={this.create}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Projectcreate;