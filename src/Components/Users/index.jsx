import { Button, Dropdown, Menu, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  OnlineUsersIcon,
  PendingUsersIcon,
  SortIconBlack,
  UsersIcon,
} from "../../assest/icons";
import fire from "../../Firebase/firebase";
import BaseMarkUp from "../Base/BaseMarkUp";
import Card from "../Card";
import CardLoading from "../Card/CardLoading";
import SearchComponent, { OnSearch } from "../SearchComponent";
import MenuOverlay from '../MenuOverlay'
import "./users.scss";
import { GeneralHelpers } from "../../Utils/Helpers";
import { userColumn } from './TableColumns'


function Users() {
  const [users, setUsers] = useState({ all: [], online: [], search: [] });
  const [appVersions, setAppVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const { push } = useHistory();
  const [recordPage, setRecordPage] = React.useState(1);
  const [recordPageSize, setRecordPageSize] = React.useState(20);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      var userRef = await fire.database().ref().child("Users");
      userRef.on("value", (snap) => {
        const user = snap.val();
        const all = [];
        const online = [];
        for (let m in user) {
          all.push({ ...user[m]?.Profile, version: user[m]?.AppVersion });
          if (user[m]["Online status"]?.online) {
            online.push(user[m]);
          }
        }
        all.sort((a, b) => new Date(a?.dateJoined) - new Date(b?.dateJoined));
        setUsers({ all, online, search: all });
      });

      const pendingRef = await fire
        .database()
        .ref()
        .child("Pending Validation");
      pendingRef.on("value", (snap) => {
        setPendingCount(snap.numChildren());
        setLoading(false);
      });
    };
    fetchUsers();
  }, []);

  const handleChangeVersion = (version) => {
    const filterByVersion = users.all.filter((v) => {
      return v.version === version;
    });
    setAppVersions(filterByVersion);
  };

  const menu = (
    <Menu>
      {GeneralHelpers.uniqueAppVersions(users.all).map((v) => {
        return (
          <Menu.Item>
            <a onClick={() => handleChangeVersion(v)}>{v}</a>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const versionTitle = () => (
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        Version <DownOutlined />
      </a>
    </Dropdown>
  );



  const onSelectHeader = (value) => {
    if (value.key === "earliest") {
      const search = users.search.sort(
        (a, b) => new Date(a?.dateJoined) - new Date(b?.dateJoined)
      );
      setUsers({ ...users, search, all: search });
      return;
    }

    const search = users.search.sort(
      (a, b) => new Date(b?.dateJoined) - new Date(a?.dateJoined)
    );
    setUsers({ ...users, search, all: search });
  };

  const dataSource = () => {
    if (appVersions.length > 0) {
      return appVersions;
    }
    return users.search;
  };

  const onSearchChange = (searchTerm) =>
    setUsers({
      ...users,
      search: OnSearch(searchTerm, ["email", "username"], users.all),
    });

  const onRowClick = (record) => ({
    onClick: () => push(`/users/${record?.id}`), // click row
  });

  function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  }

  return (
    <BaseMarkUp>
      <div className="user-page">
        <div className="user-page-heading">
          <div className="cards_area">
            <CardLoading loading={loading} loops={2}>
              <Card
                link="/users"
                label="Total Users"
                icon={UsersIcon}
                value={users.all.length}
              />
              <Card
                link="/users"
                label="Users Online"
                icon={OnlineUsersIcon}
                value={users.online.length}
              />
              <Card
                link="/users/pending"
                label="Pending Users"
                icon={PendingUsersIcon}
                value={pendingCount}
              />
            </CardLoading>
          </div>
          <div className="sort_area">
            <Dropdown
              placement="bottomCenter"
              overlay={() => MenuOverlay(onSelectHeader)}
            >
              <Button className="icon_section" type="link">
                <img src={SortIconBlack} alt="sort-icon" /> Sort
              </Button>
            </Dropdown>
            <SearchComponent
              search
              placeholder="Search by user name"
              onChange={onSearchChange}
            />
          </div>
        </div>

        <Table
          onRow={onRowClick}
          rowClassName={"rowClass"}
          columns={userColumn(versionTitle)}
          loading={loading}
          dataSource={dataSource()}
          scroll={{ y: 500 }}
          pagination={{
            size: "small",
            itemRender: itemRender,
            showSizeChanger: false,
            total: dataSource()?.length,
            position: "both",
            defaultPageSize: 20,
            onShowSizeChange: (current, size) => {
              setRecordPage(current);
              setRecordPageSize(size);
            },
            onChange: (page, pageSize) => {
              setRecordPage(page);
              setRecordPageSize(pageSize);
            },
            showTotal: (total) =>
              `Page ${recordPage} of ${
                Math.floor(total / recordPageSize) + 1
              } pages`,
          }}
        />
      </div>
    </BaseMarkUp>
  );
}

export default Users;
