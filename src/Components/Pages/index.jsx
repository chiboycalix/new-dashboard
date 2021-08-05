import React, { useState, useEffect } from "react";
import "./Pages.css";
import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { GeneralHelpers } from "../../Utils/Helpers";
import Pagination from "../Pagination";
import Spinner from "../Spinner";
import HeaderNav from "../HeaderNav";
import BaseMarkUp from "../Base/BaseMarkUp";

function Pages() {
  const [users, setUsers] = useState();
  const [selectedPage, setSelectedPage] = useState("Ambrose Alli University");
  const [schools, setSchools] = useState();
  const [sort, setSort] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(15);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fecthRecords = async () => {
      const pagesRecord = GeneralHelpers.fetchDatabaseRecord(
        "Categories for page and group"
      );
      setPages(pagesRecord);
      const usersRecord = GeneralHelpers.fetchDatabaseRecord("Users");
      setUsers(usersRecord);
    };
    fecthRecords();
  }, []);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const mts = [];
  schools &&
    schools.map((school) => {
      return school.Profile.name.toString() === selectedPage
        ? school.Business
          ? mts.push(school.Business.Category.General).length
          : undefined
        : undefined;
    });

  const pt = mts[0] ? Object.values(mts[0]).length : undefined;

  const currentPost =
    schools &&
    schools.map((sch) =>
      sch.Business
        ? Object.values(sch.Business.Category.General).filter((cr) =>
            cr.name.toLowerCase().includes(searchValue.toLowerCase())
          )
        : ""
    );

  return (
    <BaseMarkUp>
      <div className="pages-wrapper">
        
      </div>
    </BaseMarkUp>
  );
}

export default Pages;
