import React, { useState, useEffect } from "react";
import "./gists.scss";

import fire, { firestore } from "../../Firebase/firebase";
import { Container, Row, Col } from "react-bootstrap";
import { Radio, Input, Space, Form, DatePicker, TimePicker } from "antd";
import Pagination from "../Pagination";
import Spinner from "../Spinner";
import GistModal from "../GistModal";
import CurrencyFormat from "react-currency-format";
import ShowMoreText from "react-show-more-text";
import HeaderNav from "../HeaderNav";
import LazyLoad from "react-lazyload";
import BaseMarkUp from "../Base/BaseMarkUp";
import Card from "../Card";
import SchoolsIcon from "../../assest/icons/schholngLogo.png";
import Select from "../Select";
import Search from "../SearchComponent";
import SearchComponent from "../Searchh";
import GistCard from "./GistCard";
import { GistLists } from "./gists";
import Button from "../Button";

const Gists = () => {
  const [gistLength, setGistLength] = useState();
  const [selectedGist, setSelectedGist] = useState("Ambrose Alli University");
  const [schools, setSchools] = useState();
  const [flag, setFlag] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(4);
  const [searchValue, setSearchValue] = useState("");
  const [radio, setRadio] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState(false);
  const [dateSearch, setDateSearch] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [gistId, setGistId] = useState("");
  const [schGist, setSchGist] = useState();
  const [users, setUsers] = useState();
  const [value, setValue] = useState(1);
  const { RangePicker } = DatePicker;

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const verb = [];
  schools &&
    schools.map((sch) => {
      return sch.Profile
        ? sch.Profile.name === selectedGist
          ? sch.Posts
            ? verb.push(Object.values(sch.Posts))
            : undefined
          : ""
        : undefined;
    });

  const executeOnClick = (isExpanded) => {
    console.log(isExpanded);
  };

  const ppt = [];
  schools &&
    schools.map((sch) => {
      return sch.Profile
        ? sch.Profile.name === selectedGist
          ? sch.Posts
            ? ppt.push(Object.keys(sch.Posts).length)
            : undefined
          : ""
        : undefined;
    });
  const tpost = schGist && schGist.length;

  useEffect(() => {
    var schoolGistRef = firestore
      .collection("School Gist")
      .doc(selectedGist)
      .collection("Gist")
      .get();
    schoolGistRef.then(function (querySnapshot) {
      const gistPush = [];
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        var snap = doc.data();

        gistPush.push(snap);
      });
      setSchGist(gistPush);
      setGistLength(gistPush.length);
    });
  }, [selectedGist]);

  useEffect(() => {
    var schoolRef = fire.database().ref().child("Schools");
    schoolRef.on("value", (snap) => {
      const school = snap.val();
      const schoolList = [];
      for (let m in school) {
        schoolList.push(school[m]);
      }
      setSchools(schoolList);
    });

    var FlagRef = fire.database().ref().child("Flagged Gist");
    FlagRef.on("value", (snap) => {
      const flag = snap.val();
      const allFlag = flag.All;
      const flagList = [];
      flagList.push(allFlag);
      setFlag(flagList);
    });

    var userRef = fire.database().ref().child("Users");
    userRef.on("value", (snap) => {
      const user = snap.val();
      const userList = [];

      for (let m in user) {
        userList.push(user[m]);
      }
      setUsers(userList);
    });
  }, []);

  const sendFlag = [];
  flag &&
    flag.map((fs) => Object.values(fs).map((fd) => sendFlag.push(fd.postid)));

  const start = Date.parse(startDate);
  const end = Date.parse(endDate);

  const searchSubmit = () => {
    // return window.location.href=`/search?start=${startDate}&end=${endDate}`
    setDateSearch(true);
  };

  const handleGist = (id) => {
    setModalShow(true);
    setGistId(id);
  };

  const _onFocus = (e) => {
    e.currentTarget.type = "date";
  };

  const _onBlur = (e) => {
    e.currentTarget.type = "text";
  };

  const resetSubmit = () => {
    setDateSearch(false);
    setStartDate("");
    setEndDate("");
  };

  const postComment = (gistId) => {
    return (
      users &&
      users.map((user) => {
        return user["Post Comments"]
          ? Object.entries(user["Post Comments"]).map((post) => {
              return post[0] === gistId ? Object.values(post[1]).length : null;
            })
          : undefined;
      })
    );
  };

  const postLikes = (gistId) => {
    return (
      users &&
      users.map((user) => {
        return user.PostLikes
          ? Object.entries(user.PostLikes).map((post) => {
              return post[0] === gistId ? Object.values(post[1]).length : null;
            })
          : undefined;
      })
    );
  };

  const repost = (gistId) => {
    return (
      users &&
      users.map((user) => {
        return user.Repost
          ? Object.entries(user.Repost).map((post) => {
              return post[0] === gistId ? Object.values(post[1]).length : null;
            })
          : undefined;
      })
    );
  };

  const gistArr =
    schGist &&
    schGist.filter((cr) =>
      cr.user.username.toLowerCase().includes(searchValue.toLowerCase())
    );

  const gistDateFilter =
    schGist && schGist.filter((cr) => cr.date >= start && cr.date <= end);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onFinish = (values) => {};

  return (
    <BaseMarkUp>
      <div className="gists-wrpper">
        <div className="gists-header">
          <div className="gists-cards">
            <Card
              label="Total Gist"
              icon={SchoolsIcon}
              value="400"
              link="/gists"
            />
          </div>
          <div className="search-section">
            <div className="select-gist">
              <Select />
            </div>
            <div className="search-gist">
              <Search />
            </div>
          </div>
        </div>

        <div className="content">
          <div className="gists-details">
            {GistLists.map((gist) => {
              return (
                <React.Fragment key={gist.id}>
                  <GistCard gist={gist} />
                </React.Fragment>
              );
            })}
          </div>
          <div className="gists-filter">
            <p className="gist-filter-header">Filter</p>
            <div className="gist-filter-by-status">
              <p>By Status</p>
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio value={1}>All</Radio>
                  <Radio value={2}>Flagged</Radio>
                </Space>
              </Radio.Group>
            </div>

            <div className="gist-filter-by-date">
              <p>By Date</p>
              <div className="input-elements">
                <Form name="time_related_controls" onFinish={onFinish}>
                  <Form.Item name="date-picker" label="">
                    <DatePicker
                      className="search-by-date"
                      placeholder="Start Date"
                    />
                  </Form.Item>
                  <Form.Item name="date-picker" label="">
                    <DatePicker
                      className="search-by-date"
                      placeholder="End Date"
                    />
                  </Form.Item>
                  <div className="btn-wrapper">
                    <Button type="button">Reset</Button>
                    <Button type="submit">Submit</Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseMarkUp>
  );
};

export default Gists;
