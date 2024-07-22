import React from 'react';

class Taskcreate extends React.Component {
    state = { 
        Description: "",
        Status:"False",
        Updated_Date:"",
     }
     create = (e) => {
         e.preventDefault();
         if (this.state.Description === "") {
            alert("Please enter a Todo description");
             return;
         }
        this.props.addtodohandler(this.state);
        this.setState({Description:"",Status:"False",Updated_Date:""});
     }

    render() {
        return (
            <div className="ui segment" style={{border:"0"}}>
                        <div className="ui input" style={{marginLeft:"11px"}}>
                        <input placeholder="Project title" type="text" 
                        value={this.state.title} onChange={(e)=>this.setState({title:e.target.value})} />
                         </div>
                        <div className="ui icon buttons">
                        <button className="ui primary button" style={{marginLeft:"10px"}} onClick={this.create}><i class="plus icon"/></button>
                        </div>
            </div>
        );
    }
}

export default Taskcreate;