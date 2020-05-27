import React from 'react';

const CommentPanel = (props) => {
    return (
        <div className="row">
            <div className="col p-0">
                <div
                    className=""
                    style={{
                        overflowY: 'scroll',
                        height: '75vh',
                        boxShadow: 'inset 0 0 10px #000000'
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
                <div className="" style={{ height: '20vh' }}>
                    <ProjectVote upVotes={80} downVotes={20} />
                    <CommentSubmission />
                </div>
            </div>
        </div>
    );
};

export const CommentBubble = (props) => {
    return (
        <div className="row border rounded m-2 mb-4">
            <div className="col-12">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolorem ut
                accusantium consequatur corrupti saepe aliquam exercitationem repellat eos possimus
                tempore, qui numquam deserunt sapiente quos sed cum. Iure, accusantium.
            </div>
            <div className="col-6 text-capitalize">name</div>
            <div className="col-6 text-capitalize">date</div>
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
        <div className="row ml-2 mr-2">
            <textarea
                className="form-control"
                cols="30"
                rows="3"
                placeholder="Enter comment here..."
            ></textarea>
            <input
                type="button"
                className="mt-2 form-control btn-secondary"
                defaultValue="Add Comment"
            />
        </div>
    );
};

export default CommentPanel;