import React, { useState, useEffect } from "react";
import { Button, Dropdown, Menu, Table, OverlayTrigger, Popover, } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import { GeneralHelpers } from "../../Utils/Helpers";
import Pagination from "../Pagination";
import Spinner from "../Spinner";
import HeaderNav from "../HeaderNav";
import BaseMarkUp from "../Base/BaseMarkUp";
import CardLoading from "../Card/CardLoading";
import Card from "../Card";
import './pages.scss';
import MenuOverlay from '../MenuOverlay';
import Select from '../Select';
import SearchComponent, { OnSearch } from "../SearchComponent";
import { pagesColumn } from './pagesColumn'
import fire from "../../Firebase/firebase";
import { useHistory } from "react-router";
import {
  OnlineUsersIcon,
  PendingUsersIcon,
  SortIconBlack,
  UsersIcon,
} from "../../assest/icons";


function Pages() {
  const [users, setUsers] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false)
  const [sort, setSort] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(15);
  const [pages, setPages] = useState([]);
  const { push } = useHistory();
  const [recordPage, setRecordPage] = React.useState(1);
  const [recordPageSize, setRecordPageSize] = React.useState(20);

  useEffect(() => {
    setLoading(true)
    const fetchUsers = async () => {
      const usersRecord =  await GeneralHelpers.fetchDatabaseRecord("Users");
      setUsers(usersRecord);
    }
    
    const fetchSchools = async () => {
      const schoolsRecord = await GeneralHelpers.fetchDatabaseRecord("Schools");
      setSchools(schoolsRecord);
    }
    
    const fecthPages = async () => {
      const pagesRecord = await GeneralHelpers.fetchDatabaseRecord('All Pages');
      setPages(pagesRecord);
    };
    
    fetchSchools();
    fetchUsers();
    fecthPages();
    setLoading(false)
  }, []);
  

  console.log({pages});
  console.log({schools})
  console.log({users})
  console.log({loading})
  const handleSearch = (e) => {
    console.log({e})
  }

  const dataSource = () =>{
    return pages
  }

  return (
    <BaseMarkUp>
      <div className="pages-wrapper">
      <div className="page-heading">
        <div className="cards_area">
            <CardLoading loading={loading} loops={2}>
              <Card
                link="/pages"
                label="Total Pages"
                icon={UsersIcon}
                value={10}
              />
              <Card
                link="/users"
                label="Active Campaign"
                icon={OnlineUsersIcon}
                value={200}
              />
            </CardLoading>
          </div>
          
          <div className="sort_area">
            <Dropdown
              placement="bottomCenter"
              overlay={() => MenuOverlay()}
            >
              <Button className="icon_section" type="link">
                <img src={SortIconBlack} alt="sort-icon" /> Sort
              </Button>
            </Dropdown>
            <div className="select_area">
              <Select records={schools} handleSearch={handleSearch} loading={loading}/>
            </div>
            <SearchComponent
              search
              placeholder="Search by user name"
              onChange=""
            />
          </div>
        </div>

        <Table
          onRow=''
          rowClassName={"rowClass"}
          columns={pagesColumn()}
          loading={loading}
          dataSource={dataSource()}
          scroll={{ y: 500 }}
          // pagination={{
          //   size: "small",
          //   itemRender: "",
          //   showSizeChanger: false,
          //   total:50,
          //   position: "both",
          //   defaultPageSize: 20,
          //   onShowSizeChange: (current, size) => {
          //     setRecordPage(current);
          //     setRecordPageSize(size);
          //   },
          //   onChange: (page, pageSize) => {
          //     setRecordPage(page);
          //     setRecordPageSize(pageSize);
          //   },
          //   showTotal: (total) =>
          //     `Page ${recordPage} of ${
          //       Math.floor(total / recordPageSize) + 1
          //     } pages`,
          // }}
        />

      </div>
    </BaseMarkUp>
  );
}

export default Pages;
