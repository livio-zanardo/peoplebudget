import React, {useContext} from 'react';
import { Context } from '../../store/store';

const ProjectsList = () => {
    const {
        actions: { getProjects }
    } = useContext(Context);
    var projects = getProjects();

    const projectList = projects.map((project) =>
        <li className="list-group-item">
            <div className="media">
                <img className="align-self-start mr-3" src={project.avatar} alt="avatar"></img>
                <div className="media-body">
                    <h3 className="mt-2">{project.title}</h3>
                    <h5 className="mt-2"> Author: {project.author}</h5>
                    <p>{project.description}</p>
                    <span className="badge badge-pill badge-primary">Votes: {project.votes}</span>
                </div>
            </div>
        </li>
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