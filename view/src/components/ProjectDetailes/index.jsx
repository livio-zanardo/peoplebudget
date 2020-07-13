import React, { useContext, useState } from 'react';
import { Context } from '../../store/store';
import { useHistory } from 'react-router-dom';

const ProjectDetails = () => {
    const {
        actions: { getProjects, getProject, changeProjectId }
    } = useContext(Context);
    const projects = getProjects();
    const history = useHistory();
    const selectedProject = getProject();
    const [id, setId] = useState(1);

    const onClickHandler = () => {
        history.push('/dashboard');
    };
    const projectList = projects.map((project, index) => (
        <a
            href="/dashboard-details"
            className="list-group-item list-group-item-action"
            onClick={(e) => onClickHandler(e, project)}
        >
            <div className="media">
                <div className="media-body">
                    <a>
                        <h3 className="mt-2">{project.title}</h3>
                    </a>
                    <h5 className="mt-2"> Author: {project.author}</h5>
                    <h5 className="mt-2"> Project Details:</h5>
                    <p>{project.details}</p>
                </div>
            </div>
        </a>
    ));

    return (
        <div className="container">
            <div className="row">
                <ul className="list-group">
                    {/* <li className="list-group-item">{selectedProject.title}</li> */}
                </ul>
            </div>
            <div className="row">
                <button
                    onClick={onClickHandler}
                    className="btn btn-primary backBtn btn-lg pull-left"
                    type="button"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default ProjectDetails;
