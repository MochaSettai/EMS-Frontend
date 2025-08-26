import axios from "axios";
import { useNavigate } from "react-router-dom";

export const fetchDepartments = async () => {
  const API_URL = import.meta.env.VITE_API_URL;

    let departments;
  try {
    const response = await axios.get(`${API_URL}/api/department`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
        departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    } else {
      console.log(error);
    }
  }
  return departments;
};

// Employees for Salary form
export const fetchEmployees = async (route, id) => {
  const API_URL = import.meta.env.VITE_API_URL;
    
    let employees;
  try {
    const response = await axios.get(`${API_URL}/api/employee/${route}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
        employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    } else {
      console.log(error);
    }
  }
  return employees;
};


export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px"
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px"
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    width: "120px"
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true
  },
];

export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
        onClick={() => navigate(`/admin-dashboard/employee/${_id}`)}
      >
        View
      </button>

      <button
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}
      >
        Edit
      </button>

      <button
        className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        onClick={() => navigate(`/admin-dashboard/employee/salary/${_id}`)}
      >
        Salary
      </button>

      <button
        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={() => navigate(`/admin-dashboard/employee/leaves/${_id}`)}
      >
        Leave
      </button>
    </div>
  );
};