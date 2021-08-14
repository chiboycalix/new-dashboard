import React from 'react';
import { Select } from 'antd';
import './styles.scss';
const { Option } = Select;

const SelectComponent = (props) => {
  return (<>
    <Select 
      size="large" 
      defaultValue="All Pages" 
      onChange={props.handleSearch}
      className="select_element" 
      style={{ width: '100%' }}
      loading={props?.loading}
    >
      <Option value="All Pages">All Pages</Option>
     {
       props?.records?.map((record) => {
          return <Option value={record?.Profile?.name}>{record?.Profile?.name}</Option>
        })
      }
    </Select>
  </>)
}

export default SelectComponent;