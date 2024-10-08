import React from 'react';
import { Tabs } from 'antd';
import AddEvent from './AddEvent';
import Navbar from '../components/Navbar';
import Addadmin from '../pages/Addadmin';
import BookingComponent from './Bookings';
const { TabPane } = Tabs;

const AdminScreen = () => {
  return (
    <>
      <Navbar />
      <div className="">
        <h1 className="text-4xl font-bold text-center text-white">
          Admin Panel
        </h1>
        <div className="flex justify-center mt-10">
          <Tabs defaultActiveKey="1" className="w-full">
            <TabPane tab="Add Event" key="2">
              <AddEvent />
            </TabPane>
            <TabPane tab="Add User" key="3">
            <Addadmin/>
            </TabPane>
            <TabPane tab="Bookings" key="4">
              <BookingComponent/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminScreen;
