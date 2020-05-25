import React, {useContext, useState} from 'react';
import { Context } from '../../store/store';


const ProjectsList = () => {
    const {
        actions: { getProjects, changeProjectId }
    } = useContext(Context);
    const projects = getProjects();

    const onClickHandler = (event, project) => {
        const id = project.id;
        changeProjectId(id);
    }
    const projectList = projects.map((project, index) =>
            <a href={"/dashboard-details"} className="list-group-item list-group-item-action" onClick={(e) => onClickHandler(e, project)}>
                <div className="media">
                    <img className="align-self-start mr-3" src={project.avatar} alt="avatar"></img>
                        <div className="media-body">
                            <a><h3 className="mt-2">{project.title}</h3></a>
                            <h5 className="mt-2"> Author: {project.author}</h5>
                            <p>{project.description}</p>
                            <span className="badge badge-pill badge-primary">Votes: {project.votes}</span>
                        </div>
                </div>
            </a>
    );

    return (
        <div className="container">
            <ul className="list-group">
                <li className="list-group-item">
                    {projectList}
                </li>
            </ul>
        </div>

    )
};

export default ProjectsList;