import React from 'react';
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";

export const userColumn  = (versionTitle) => {
  return [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (username, value) => {
        return (
          <>
            <Avatar src={value?.image} size={30} />
            <span className="px-3">{username}</span>
          </>
        );
      },
      // width: 100
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      // width: 100
    },
    {
      title: "School",
      dataIndex: "institution",
      key: "school",
      // width: 100
    },
    {
      title: "Date",
      dataIndex: "dateJoined",
      key: "dateJoined",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.dateJoined - b.dateJoined,
      // width: 100,
      render: (dateJoined) => moment(dateJoined).format("DD-MM-YYYY"),
    },
    {
      title: versionTitle(),
      dataIndex: "version",
      key: "version",
      // width: 200
    },
  ];
}