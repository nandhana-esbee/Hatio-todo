import React from 'react';
import Projectcard from './Projectcard';

const ProjectList = (props) => {
    const projectlistrender = props.project.map((project) => {
        return <Projectcard projects={project}/>
    })
return <div className="ui cards" style={{marginLeft:"1rem", marginRight:"1rem"}}>{projectlistrender}</div>;
}

export default ProjectList;