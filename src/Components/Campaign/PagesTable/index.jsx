import React from 'react';
import { Table } from "antd";
import { campaignPagesColumn } from './campaignPagesColumn';

const PagesTable = () => {
  return(<Table
    onRow=''
    rowClassName={"rowClass"}
    columns={campaignPagesColumn()}
    loading={false}
    dataSource={[]}
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
  />)
}

export default PagesTable;