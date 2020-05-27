import React, {useContext, useState} from 'react';
import { Context } from '../../store/store';


const ProjectsList = () => {
    const {
        actions: { getProjects, getProject, changeProjectId }
    } = useContext(Context);
    const projects = getProjects();
    const [selectedProject] = getProject();
    const [id, setId] = useState(1);

    const onClickHandler = (event, project) => {
        setId(project.id);
        changeProjectId(id)
        console.log(getProject())
    }
    const projectList = projects.map((project, index) =>
            <a  className="list-group-item list-group-item-action" onClick={(e) => onClickHandler(e, project)}>
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
            <div className="row" >
                <div className="col-md-6">
                    <ul className="list-group">
                        <li className="list-group-item">
                            {projectList}
                        </li>
                    </ul>
                </div>

                <div className="col-md-6">
                    <div className="media">
                        <div className="media-body">
                            <h3 className="mt-2">{selectedProject.title}</h3>
                            <p>{selectedProject.details}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default ProjectsList;