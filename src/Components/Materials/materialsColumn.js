import React from 'react';
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";

export const materialsColumn  = () => {
  return [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Material",
      dataIndex: "name",
      key: "pagename",
      // width: 100
    },
    {
      title: "Material Type",
      dataIndex: "category",
      key: "Category",
      // width: 100
    },
    {
      title: "Status",
      dataIndex: "phone",
      key: "Phone no",
      // width: 100
    },
    {
      title: "Charge (Naira)",
      dataIndex: "user",
      key: "Owner",
      render: (user) => {
        return ( <p>{user.username}</p>)
      }
    },
    {
      title: "Star",
      dataIndex: "Subscribers",
      key: "Subscribers",
      // width: 200
    },
    {
      title: "Action",
      dataIndex: "Campaign",
      key: "Campaign",
      // width: 200
    }
  ];
}