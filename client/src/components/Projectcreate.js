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
            <form onSubmit={this.create} className="ui segment" style={{border:"0"}}>
                        <div className="ui input" style={{marginLeft:"11px"}}>
                        <input placeholder="Project title" type="text" 
                        value={this.state.title} onChange={(e)=>this.setState({title:e.target.value})} />
                         </div>
                        <div className="ui icon buttons">
                        <button className="ui primary button" style={{marginLeft:"10px"}}><i className="plus icon"/></button>
                        </div>
            </form>
        );
    }
}

export default Projectcreate;