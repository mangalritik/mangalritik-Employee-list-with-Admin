import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet } from 'react-router-dom';

const AdminPanel = () => { 
    const user = useSelector(state => state?.user?.user);

    return (
        <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
            {/* Sidebar */}
            <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
                <div className='h-32 flex justify-center items-center flex-col mt-4'>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>
                        {user?.profilePic ? (
                            <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                        ) : (
                            <FaRegCircleUser />
                        )}
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                {/* Navigation */}
                <div>   
                    <nav className='grid p-4'>
                        <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>Employee List</Link>
                    </nav>
                </div>  
            </aside>

            {/* Main content area with background image */}
            <main className='w-full h-full p-2 bg-cover bg-center mt-44' style={{ backgroundImage: 'url("/path/to/your/background-image.jpg")' }}>
                <div className='flex justify-center items-center h-full bg-black bg-opacity-50'>
                    {/* Welcome Text Section */}
                    <div className='text-center text-white px-4'>
                        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
                            Welcome to the Admin Panel
                        </h1>
                        <p className='text-lg md:text-xl mb-6'>
                            Manage all your users, products, and settings with ease.
                        </p>
                        <Link 
                            to={"/admin-panel/all-users"} 
                            className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-all'
                        >
                            Start Managing
                        </Link>
                    </div>
                </div>

                {/* Outlet for Nested Routes */}
                <div className='w-full'>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default AdminPanel;
