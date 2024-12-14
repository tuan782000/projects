'use client';
import React from 'react';
import { Layout, theme } from 'antd';
import AdminFooter from '@/components/layout/admin.footer';
import AdminHeader from '@/components/layout/admin.header';
import AdminSideBar from '@/components/layout/admin.sidebar';

const DashboardPage = () => {
    const { Content } = Layout;

    return <div className=''>Dashboard Page</div>;
};

export default DashboardPage;

/*
Layout là phần chính thay vì page

children truyền vào là nội dung bao gồm AdminSideBar - Layout ...
*/
