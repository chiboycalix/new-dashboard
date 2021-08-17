import React from 'react';
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";

export const campaignAmbassadorColumn  = () => {
  return [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "pagename",
      // width: 100
    },
    {
      title: "Email",
      dataIndex: "category",
      key: "Category",
      // width: 100
    },
    {
      title: "Likes",
      dataIndex: "phone",
      key: "Phone no",
      // width: 100
    },
    {
      title: "Comment",
      dataIndex: "user",
      key: "Owner",
    },
    {
      title: "Regist",
      dataIndex: "Subscribers",
      key: "Subscribers",
      // width: 200
    },
    {
      title: "Status",
      dataIndex: "Campaign",
      key: "Campaign",
      // width: 200
    }
  ];
}