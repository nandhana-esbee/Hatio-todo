import React from 'react';
import Projectcard from './Projectcard';

const ProjectList = (props) => {
    const projectlistrender = props.project.map((project) => {
        return <Projectcard projects={project}/>
    })
return <div className="ui cards">{projectlistrender}</div>;
}

export default ProjectList;