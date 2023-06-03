import CurrentDataApi from "../../api/CurrentDataApi";
import React, { useState, useEffect } from "react";

const CurrentData = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const response = await CurrentDataApi.getCurrentData();
          setTableData(response.data);
        };
        fetchData();
      }, []);

    return (
        <p> {JSON.stringify(tableData)} </p>
    )
}

export default CurrentData;