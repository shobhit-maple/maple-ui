import React from "react";
import "./CustomDataTable.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import DataTable from "react-data-table-component";
import {
  CodeBlock,
  dracula,
} from "react-code-blocks";

const CustomDataTable = ({
  isLoading,
  columns,
  data,
  expandedComponent
}) => {

  const customStyles = {
    rows: {
      style: {
        fontSize: 14,
      },
    },
    headCells: {
      style: {
        fontSize: 14,
        fontWeight: 700
      },
    }
  };

  function replacer(key, value) {
    if (key === "actions") {
      return undefined;
    } else {
      return value;
    }
  }

  const ExpandedComponent = ({data}) =>
      <CodeBlock
          text={JSON.stringify(data, replacer, 2)}
          language="json"
          showLineNumbers={false}
          theme={dracula}
      />;

  return (
      isLoading ?
          <LoadingSpinner/>
          :
          <DataTable
              customStyles={customStyles}
              columns={columns}
              data={data}
              expandableRows
              expandableRowsComponent={expandedComponent || ExpandedComponent}/>
  )
};

export default CustomDataTable;