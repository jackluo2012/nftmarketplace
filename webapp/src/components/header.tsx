import NextLink from "next/link"
import { Layout,Button } from 'antd';
const { Header } = Layout;
import { Col, Row } from 'antd';
const siteTitle = "NFT市场DApp"
export default function Xheader(){
    return (        
            <Header style={{background: "#f5f5f5"}}>
                <Row justify="space-between">
                    <Col span={4}>{siteTitle}</Col>
                    <Col span={4}>
                    <Button type="link" block>
                        Button for Account 
                    </Button>
                    </Col>
                </Row>
            </Header>
        
    )
}