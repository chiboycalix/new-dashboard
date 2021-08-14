import React from 'react';
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";

export const pagesColumn  = () => {
  return [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Page Name",
      dataIndex: "name",
      key: "pagename",
      // width: 100
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "Category",
      render: (category) => {
        return ( <p>{category[0]}</p>)
      }
      // width: 100
    },
    {
      title: "Phone no",
      dataIndex: "phone",
      key: "Phone no",
      // width: 100
    },
    {
      title: "Owner",
      dataIndex: "user",
      key: "Owner",
      render: (user) => {
        return ( <p>{user.username}</p>)
      }
    },
    {
      title: "Subscribers",
      dataIndex: "Subscribers",
      key: "Subscribers",
      // width: 200
    },
    {
      title: "Campaign",
      dataIndex: "Campaign",
      key: "Campaign",
      // width: 200
    },
  ];
}