import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import axios from "axios";

const LeaveTable = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/leave`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      if (response.data.success) {
        let sno = 1;

        const data = await response.data.leaves.map((leave) => {
          // Calculating the length of the leave in Days
          const start = new Date(leave.startDate);
          const end = new Date(leave.endDate);
          // Difference in days
          const diffTime = end - start; // ms difference
          let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          // If you want *inclusive* days (e.g. Aug 20 → Aug 24 = 5 days)
          diffDays = diffDays + 1;

          return {
            _id: leave._id,
            sno: sno++,
            employeeId: leave.employeeId.employeeId,
            name: leave.employeeId.userId.name,
            leaveType: leave.leaveType,
            department: leave.employeeId.department.dep_name,
            days: diffDays,
            status: leave.status,
            action: <LeaveButtons _id={leave._id} />,
          };
        });
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const records = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(records);
    setFilteredLeaves(records);
  };

  const filterByButtons = (e) => {
    const records = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(records);
    setFilteredLeaves(records);
  };

  return (
    <>
      {filteredLeaves ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>

          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Emp Id"
              className="px-4 py-0.5 border"
              onChange={filterByInput}
            />
            <div className="space-x-3">
              <button
                className="px-2 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                value="Pending"
                onClick={filterByButtons}
              >
                Pending
              </button>
              <button
                className="px-2 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                value="Approved"
                onClick={filterByButtons}
              >
                Approved
              </button>
              <button
                className="px-2 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                value="Rejected"
                onClick={filterByButtons}
              >
                Rejected
              </button>
            </div>
          </div>

          <div className="mt-5">
            <DataTable columns={columns} data={filteredLeaves} pagination />
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default LeaveTable;
