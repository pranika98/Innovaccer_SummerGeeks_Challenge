import React from "react";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { Card, Col, Row, Button } from "antd";
import Background from "../hk.png";
import Logo from "../innov.png";
import { Layout } from "antd";

const { Header, Content } = Layout;

export default class Index extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    {/* <Header>
                        <h1 style={{ color: "#EF1F79" }}>INNOVACCER</h1>
                    </Header> */}
                    <Content>
                        <div style={{ position: "fixed", top: 10, left: '40%' }}>
                            <img src={Logo} />
                        </div>
                        <div
                            style={{
                                background: `url(${Background})`,
                                backgroundPosition: "fill",
                                backgroundSize: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "18% 30% 18% 30%"
                            }}
                        >
                            <Card
                                hoverable={true}
                                bordered={true}
                                title="ENTRY MANAGEMENT SYSTEM"
                                headStyle={{
                                    backgroundColor: "#EF1F79",
                                    color: "white",
                                    fontSize: "36px"
                                }}
                                bodyStyle={{ backgroundColor: "#ed3987" }}
                            >
                                <Col gutter={8}>
                                    <Row span={4}>
                                        <Button
                                            key="console"
                                            size="large"
                                            color="#EF1F79"
                                            block
                                            style={{ marginBottom: "10px" }}
                                        >
                                            <Link to="/home">
                                                <h3
                                                    style={{ color: "#EF1F79" }}
                                                >
                                                    CHECK IN
                                                </h3>
                                            </Link>
                                        </Button>
                                    </Row>
                                    <Row span={4}>
                                        <Button
                                            key="console"
                                            size="large"
                                            block
                                        >
                                            <Link to="/checkout">
                                                <h3
                                                    style={{ color: "#EF1F79" }}
                                                >
                                                    CHECK OUT
                                                </h3>
                                            </Link>
                                        </Button>
                                    </Row>
                                </Col>
                            </Card>
                        </div>
                    </Content>
                    {/* <Header></Header> */}
                </Layout>
            </div>
        );
    }
}
