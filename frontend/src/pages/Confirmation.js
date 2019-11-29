import React from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Button, Card, Layout, Result } from "antd";
import Background from "../hk.png";
import Logo from "../innov.png";
const { Header, Content } = Layout;

export default class Confirmation extends React.Component {
    render() {
        return (
            <Layout>
                
                <Content>
                <div style={{ position: "fixed", top: 10, left: '40%' }}>
                            <img src={Logo} />
                        </div>
                    <div
                        style={{
                            backgroundImage: `url(${Background})`,
                            backgroundPosition: "center",
                            backgroundSize: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "8% 30% 8% 30%"
                        }}
                    >
                        <Card
                            hoverable={true}
                            bordered={true}
                            title="Welcome to Innovaccer"
                            headStyle={{
                                backgroundColor: "#EF1F79",
                                color: "white",
                                fontSize: "36px"
                            }}
                            bodyStyle={{ backgroundColor: "#ed3987" }}
                        >
                            <Result
                                status="success"
                                title="You have succesfully checked in!"
                                // subtitle={subtitle}
                                subTitle={`Your OTP : ${this.props.location.state} <-----DO NO FORGET THIS. You will need this is to check out. \n Have a nice day.`}
                                extra={[
                                    <Button type="dashed" ghost key="console">
                                        <Link to="/">Go Back Home</Link>
                                    </Button>
                                ]}
                            />
                        </Card>
                    </div>
                </Content>
                {/* <Header></Header> */}
            </Layout>
        );
    }
}
