import React, { useState } from 'react';
import {
    container,
    tray,
    handle,
    handleSVG,
    handlePolygon,
    filter,
    filterMenuOpen,
    filterMenuClose,
    list
} from './index.module.css';
const ProjectDrawer = () => {
    const [filterText, setFilterText] = useState('Location');
    const [isFilterOpen, setFilterMenu] = useState(false);
    const openFilter = () => setFilterMenu(!isFilterOpen);
    return (
        <div className={`${tray}`} style={{ position: 'absolute' }}>
            <div className={`${handle}`}>
                <svg className={`${handleSVG}`}>
                    <polygon points="50,1 1,50 50,100" className={`${handlePolygon}`} />
                    Sorry, your browser does not support inline SVG.
                </svg>
            </div>
            <div className={`${container}`}>
                <div className="row">
                    <div className="col-6 border">
                        <h1>Projects</h1>
                    </div>
                    <div className="col-6 border">
                        <form action="">
                            <input type="text" className="form-control" />
                        </form>
                    </div>
                    <div className={`col-6 ml-auto ${filter}`} onClick={openFilter}>
                        <div>
                            <div className="row m-0 p-0">
                                <div className="col m-0 p-0">Sort By: {filterText}</div>
                                <div className="col m-0 p-0">
                                    <span className="material-icons">filter_alt</span>
                                </div>
                            </div>
                        </div>
                        <div className={`${isFilterOpen ? filterMenuOpen : filterMenuClose}`}>
                            <div>option a</div>
                            <div>option b</div>
                            <div>optionc</div>
                        </div>
                    </div>
                    <div className={`col-12 border ${list}`}>
                        <div className="row">
                            <div className="col-10">Project</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDrawer;
