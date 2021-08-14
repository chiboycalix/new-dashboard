import React from "react";
import "./gistcard.scss";

const GistCard = ({gist}) => {
  return (
    <div className="gist-card">
      <div className="gister-photo">
        <img src={gist.user.userIcon} alt="gister" />
      </div>
      <div className="gister-details">
        <p className="username">@{gist.user.username}</p>
        <small className="date-posted">Posted on {gist.datePosted}</small>
        <p className="gist-body">
          {gist.gistBody}
        </p>
        <div className="gist-card-footer">
          <div className="likes-wrapper">
            <img src={gist.likes.icon} alt="" />
            <p className="count">{gist.likes.count}</p>
            <p className="text">likes</p>
            </div>
          <div className="comments-wrapper">
            <img src={gist.comments.icon} alt="" />
            <p className="count">{gist.comments.count}</p>
            <p className="text">comments</p>
          </div>
          <div className="regist-wrapper">
            <img src={gist.regist.icon} alt="" />
            <p className="count">{gist.regist.count}</p>
            <p className="text">regist</p>
          </div>
        </div>
      </div>
      <div className="gist-thumbnail">
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default GistCard;
