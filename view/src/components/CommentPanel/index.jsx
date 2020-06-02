import React from 'react';
import { hideScrollBar } from './index.module.css';

const CommentPanel = (props) => {
    return (
        <div className="row">
            <div className="col p-0">
                <div
                    className={`${hideScrollBar}`}
                    style={{
                        overflowY: 'auto',
                        height: '80vh',
                        boxShadow: 'inset 0 5px 5px -5px #000000'
                    }}
                >
                    <CommentBubble />
                    <CommentBubble />
                    <CommentBubble />
                    <CommentBubble />
                    <CommentBubble />
                    <CommentBubble />
                    <CommentBubble />
                    <CommentBubble />
                    <CommentBubble />
                </div>
                <div className="" style={{ height: '15vh' }}>
                    {/* <ProjectVote upVotes={80} downVotes={20} /> */}
                    <CommentSubmission />
                </div>
            </div>
        </div>
    );
};

export const CommentBubble = (props) => {
    return (
        <div
            className="row rounded shadow m-2 mb-3"
            style={{ backgroundColor: 'rgba(255,255,255,1)' }}
        >
            <div className="col-auto text-capitalize" style={{ fontSize: '1.5rem' }}>
                name
            </div>
            <div className="col-auto text-capitalize" style={{ fontSize: '1.5rem' }}>
                Feb-28-2020
            </div>
            <div className="col-12" style={{ fontSize: '1.25rem' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolorem ut
                accusantium consequatur corrupti saepe aliquam exercitationem repellat eos possimus
                tempore, qui numquam deserunt sapiente quos sed cum. Iure, accusantium.
            </div>
        </div>
    );
};

export const ProjectVote = ({ upVotes, downVotes }) => {
    const totalVotes = upVotes + downVotes;
    return (
        <div className="row ml-2 mr-2 mt-3">
            <div className="col-12">
                <div className="row">
                    <div className="col-1 p-0">
                        <button className="btn">
                            <i className="material-icons">thumb_up</i>
                        </button>
                        <div
                            className="text-center"
                            style={{
                                borderRadius: '25px',
                                border: '1px solid',
                                height: '20px',
                                width: '20px',
                                backgroundColor: 'rgba(0,0,0,1)',
                                color: 'white',
                                position: 'relative',
                                top: '-55px',
                                right: '-26px',
                                fontSize: '8pt'
                            }}
                        >
                            {upVotes}
                        </div>
                    </div>
                    <div className="col-1 p-0">
                        <button className="btn">
                            <i className="material-icons">thumb_down</i>
                        </button>
                        <div
                            className="text-center"
                            style={{
                                borderRadius: '25px',
                                border: '1px solid',
                                height: '20px',
                                width: '20px',
                                backgroundColor: 'rgba(0,0,0,1)',
                                color: 'white',
                                position: 'relative',
                                top: '-55px',
                                right: '-26px',
                                fontSize: '8pt'
                            }}
                        >
                            {downVotes}
                        </div>
                    </div>
                    <div className="col-10 p-0">
                        <div
                            className=""
                            style={{ position: 'relative', height: '5px', top: '35%' }}
                        >
                            <div
                                className=""
                                style={{
                                    width: `${(upVotes / totalVotes) * 100}%`,
                                    backgroundColor: 'rgba(100,100,100,1)',
                                    height: '5px',
                                    float: 'left'
                                }}
                            ></div>
                            <div
                                className=""
                                style={{
                                    width: `${(downVotes / totalVotes) * 100}%`,
                                    backgroundColor: 'rgba(200,200,200,1)',
                                    height: '5px',
                                    float: 'right'
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const CommentSubmission = (props) => {
    return (
        <div className="row ml-2 mr-2" style={{ backgroundColor: 'rgba(255,255,255,1)' }}>
            <div className="col border shadow p-2">
                <textarea
                    className="form-control"
                    cols="30"
                    rows="2"
                    placeholder="Enter comment here..."
                ></textarea>
                <input
                    type="button"
                    className="mt-2 form-control btn-secondary"
                    defaultValue="Add Comment"
                />
            </div>
        </div>
    );
};

export default CommentPanel;
