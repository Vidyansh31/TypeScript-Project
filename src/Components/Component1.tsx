import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

interface DataRow {
  id: number;
  title: string;
  body: string;
}

const Component1: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);

  useEffect(() => {
    // Fetch data from API
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));

    // console.log(data);
  }, []);

  console.log("Component1");

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 700 },
  ];

  return (
    <div className="tableContainer">
      <h1 className="tableTitle">Table</h1>
      <DataGrid rows={data} columns={columns} />
    </div>
  );
};

export default Component1;
