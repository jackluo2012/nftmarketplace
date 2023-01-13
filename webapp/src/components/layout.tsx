import { ReactNode } from "react";
import Xheader from "./header";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
type Props = {
    children:ReactNode
}
export function Xlayout(props:Props){
    return (
        <Layout className="layout" style={{ background: "none"}} >
            <Xheader />
            <Content>
            {props.children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>FirstDAPP ©2023 Created by Jack</Footer>        
        </Layout>
    )
}