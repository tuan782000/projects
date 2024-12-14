'use client';

import { Layout } from 'antd';
import React from 'react';

const AdminFooter = () => {
    const { Footer } = Layout;

    return (
        <Footer style={{ textAlign: 'center' }}>
            tuannguyendev ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
    );
};

export default AdminFooter;
