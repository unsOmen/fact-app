import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import '../App.css';


const AppLayout = () => {
    return (
        <Layout>
            <Layout.Content>
                <Outlet/>
            </Layout.Content>
        </Layout>
    );
};

export default AppLayout;