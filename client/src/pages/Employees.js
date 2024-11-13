import React, { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';
import { useNavigate } from 'react-router-dom';

const Employees = () => {
  const [data, setData] = useState({
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    name: "",
    profilePic: "",
  });

  const [isFormVisible, setIsFormVisible] = useState(true); // State to control form visibility

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setData((prev) => ({
        ...prev,
        [name]: [...prev[name], e.target.value],
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: prev[name].filter((course) => course !== e.target.value),
      }));
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("No file selected");
      return;
    }

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPG and PNG are allowed.");
      return;
    }

    const maxFileSizeMB = 5; // Maximum file size in MB
    if (file.size / 1024 / 1024 > maxFileSizeMB) {
      toast.info("Compressing large image...");
      const options = {
        maxSizeMB: maxFileSizeMB,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        const imagePic = await imageTobase64(compressedFile);

        setData((prev) => ({
          ...prev,
          profilePic: imagePic,
        }));
      } catch (error) {
        toast.error('Error compressing or uploading the image');
      }
    } else {
      try {
        const imagePic = await imageTobase64(file);
        setData((prev) => ({
          ...prev,
          profilePic: imagePic,
        }));
      } catch (error) {
        toast.error('Error uploading the image');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataResponse = await fetch(SummaryApi.addEmployee.url, {
        method: SummaryApi.addEmployee.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/admin-panel/all-users");
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error('An error occurred while creating the employee.');
      console.error('Error creating the employee:', error);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
    navigate("/admin-panel/all-users"); // Navigate to the admin panel
  };

  return (
    <div className='m-4'>
      {isFormVisible && (
        <section id='signup'>
          <div className='mx-auto container p-4'>
            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
              <p className='text-end cursor-pointer' onClick={toggleFormVisibility}>❌</p>
              <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                <div>
                  <img
                    src={data.profilePic || loginIcons}
                    alt='login icons'
                  />
                </div>
                <form>
                  <label>
                    <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                      Upload Photo
                    </div>
                    <input type='file' accept='image/jpeg,image/png' className='hidden'
                      onChange={handleUploadPic}
                    />
                  </label>
                </form>
              </div>

              <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid'>
                  <label>Name:</label>
                  <div className='bg-slate-100 p-2'>
                    <input
                      type='text'
                      placeholder='Enter your name'
                      name='name'
                      value={data.name}
                      onChange={handleOnChange}
                      required
                      className='w-full h-full outline-none bg-transparent' />
                  </div>
                </div>
                <div className='grid'>
                  <label>Email:</label>
                  <div className='bg-slate-100 p-2'>
                    <input
                      type='email'
                      placeholder='Enter email'
                      name='email'
                      value={data.email}
                      onChange={handleOnChange}
                      required
                      className='w-full h-full outline-none bg-transparent' />
                  </div>
                </div>
                <div className='grid'>
                  <label>Mobile Number:</label>
                  <div className='bg-slate-100 p-2'>
                    <input
                      type='tel'
                      placeholder='Enter mobile number'
                      name='mobile'
                      value={data.mobile}
                      onChange={handleOnChange}
                      required
                      className='w-full h-full outline-none bg-transparent' />
                  </div>
                </div>

                {/* Designation Dropdown */}
                <div className='grid'>
                  <label>Designation:</label>
                  <div className='bg-slate-100 p-2'>
                    <select
                      name="designation"
                      value={data.designation}
                      onChange={handleOnChange}
                      className="w-full h-full outline-none bg-transparent"
                      required
                    >
                      <option value="">Select Designation</option>
                      <option value="Manager">Manager</option>
                      <option value="Developer">Developer</option>
                      <option value="Tester">Tester</option>
                    </select>
                  </div>
                </div>

                {/* Gender Radio Buttons */}
                <div className='grid'>
                  <label>Gender:</label>
                  <div className='bg-slate-100 p-2 flex gap-4'>
                    <div>
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="Male"
                        onChange={handleOnChange}
                        checked={data.gender === "Male"}
                        required
                      />
                      <label htmlFor="male">Male</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="Female"
                        onChange={handleOnChange}
                        checked={data.gender === "Female"}
                        required
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="other"
                        name="gender"
                        value="Other"
                        onChange={handleOnChange}
                        checked={data.gender === "Other"}
                        required
                      />
                      <label htmlFor="other">Other</label>
                    </div>
                  </div>
                </div>

                {/* Course Checkboxes */}
                <div className='grid'>
                  <label>Course:</label>
                  <div className='bg-slate-100 p-2 flex gap-4'>
                    <div>
                      <input
                        type="checkbox"
                        name="course"
                        value="Computer Science"
                        onChange={handleCheckboxChange}
                        checked={data.course.includes("Computer Science")}
                      />
                      <label>Computer Science</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="course"
                        value="Business"
                        onChange={handleCheckboxChange}
                        checked={data.course.includes("Business")}
                      />
                      <label>Business</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="course"
                        value="Design"
                        onChange={handleCheckboxChange}
                        checked={data.course.includes("Design")}
                      />
                      <label>Design</label>
                    </div>
                  </div>
                </div>

                <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Employees;
