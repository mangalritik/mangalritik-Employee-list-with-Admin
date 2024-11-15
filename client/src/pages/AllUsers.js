import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit, MdDelete } from "react-icons/md";
import { FaRegCircleUser } from 'react-icons/fa6';
import EmployeeForm from './Employees'; // Import the EmployeeForm component

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    course: "",
    profilePic: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: 'include',
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
      } else if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiEndpoint = isEditing ? `${SummaryApi.updateEmployee.url}/${formData._id}` : SummaryApi.addEmployee.url;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(apiEndpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        
      });
console.log(apiEndpoint)
      const dataResponse = await response.json();

      if (dataResponse.success) {
        setFormData({
          name: "",
          email: "",
          mobile: "",
          gender: "",
          course: "",
          profilePic: "",
        });
        setIsEditing(false);
        setShowForm(false); // Hide form after submission
        await fetchAllUsers();
        toast.success(dataResponse.message);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Error submitting data");
    }
  };

  const handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
    setShowForm(true); // Show form when editing
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${SummaryApi.deleteEmployee.url.replace(':id', id)}`, {
        method: SummaryApi.deleteEmployee.method,
      });
      const dataResponse = await response.json();

      if (dataResponse.success) {
        await fetchAllUsers();
        toast.success(dataResponse.message);
        
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  return (
    <div className="bg-white pb-4">
      <div className="container mx-auto p-5">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">User Management</h1>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            onClick={() => {
              setIsEditing(false);
              setShowForm(true); // Show form when creating a new user
            }}
          >
            Create User
          </button>
        </div>

        {showForm ? (
          <EmployeeForm
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            formData={formData}
            isEditing={isEditing}
            setShowForm={setShowForm} // Pass setShowForm to close form
          />
        ) : (
          <table className="w-full userTable">
            <thead>
              <tr className="bg-black text-white">
                <th>Unique id.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.length > 0 ? (
                allUsers.map((user, index) => (
                  <tr className='text-center' key={user._id}>
                    <td>{index + 1}</td>
                    <td>
                      {user?._id && (
                        <div className='text-3xl cursor-pointer relative flex justify-center'>
                          {user?.profilePic ? (
                            <img
                              src={user?.profilePic}
                              className='w-10 h-10 rounded-full'
                              alt={user?.name}
                            />
                          ) : (
                            <FaRegCircleUser />
                          )}
                        </div>
                      )}
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>{user.designation}</td>
                    <td>{user.gender}</td>
                    <td>{user.course}</td>
                    <td>{moment(user.createdAt).format('LL')}</td>
                    <td>
                      <button
                        className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 mx-1"
                        onClick={() => handleEdit(user)}
                      >
                        <MdModeEdit />
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 mx-1"
                        onClick={() => handleDelete(user._id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
