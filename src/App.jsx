import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBasedRoutes from './utils/RoleBasedRoutes';
import AdminSummary from './components/adminDashboard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import EmployeeList from './components/employee/EmployeeList';
import AddEmployee from './components/employee/AddEmployee';
import ViewEmployee from './components/employee/ViewEmployee';
import EditEmployee from './components/employee/EditEmployee';
import AddSalary from './components/salary/AddSalary';
import ViewSalary from './components/salary/ViewSalary';
import EmployeeSummary from './components/empDashboard/EmployeeSummary';
import LeaveList from './components/leave/LeaveList';
import AddLeave from './components/leave/AddLeave';
import Settings from './components/settings/Settings';
import LeaveTable from './components/leave/LeaveTable';
import LeaveDetails from './components/leave/LeaveDetails';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='admin-dashboard' />}></Route>
        <Route path='/login' element={<Login />}></Route> 

        {/* Admin Routes */}
        <Route path='/admin-dashboard' element={ 
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<AdminSummary />}></Route>

          <Route path='/admin-dashboard/departments' element={<DepartmentList />}></Route>
          <Route path='/admin-dashboard/add-department' element={<AddDepartment />}></Route>
          <Route path='/admin-dashboard/department/edit/:id' element={<EditDepartment />}></Route>

          <Route path='/admin-dashboard/employees' element={<EmployeeList />}></Route>
          <Route path='/admin-dashboard/add-employee' element={<AddEmployee />}></Route>
          <Route path='/admin-dashboard/employee/:id' element={<ViewEmployee />}></Route>
          <Route path='/admin-dashboard/employee/edit/:id' element={<EditEmployee />}></Route>
          <Route path='/admin-dashboard/employee/salary/:id' element={<ViewSalary />}></Route>
          <Route path='/admin-dashboard/employee/leaves/:id' element={<LeaveList />}></Route>

          <Route path='/admin-dashboard/leaves' element={<LeaveTable />}></Route>
          <Route path='/admin-dashboard/leave/:id' element={<LeaveDetails />}></Route>

          <Route path='/admin-dashboard/salary/add' element={<AddSalary />}></Route>

          <Route path='/admin-dashboard/settings' element={<Settings />}></Route>
        </Route>

        {/* Employee Routes */}
        <Route path='/employee-dashboard' element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<EmployeeSummary />}></Route>

          <Route path='/employee-dashboard/profile/:id' element={<ViewEmployee />}></Route>
          <Route path='/employee-dashboard/leaves/:id' element={<LeaveList />}></Route>
          <Route path='/employee-dashboard/add-leave' element={<AddLeave />}></Route>
          <Route path='/employee-dashboard/salary/:id' element={<ViewSalary />}></Route>
          <Route path='/employee-dashboard/settings' element={<Settings />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
