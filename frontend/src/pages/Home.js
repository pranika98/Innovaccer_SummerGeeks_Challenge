import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import "antd/dist/antd.css";
import { Form, Input, Select, Button, Card, Layout } from "antd";
import Background from "../hk.png";
import Logo from "../innov.png";
const { Header, Content } = Layout;

const { Option } = Select;

class RegistrationForm extends React.Component {
    state = {
        otp: null,
        confirmDirty: false,
        // autoCompleteResult: []
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                const {
                    visitor_name,
                    visitor_email,
                    visitor_phone,
                    host_phone,
                    host_email,
                    host_name,
                    visitor_prefix,
                    host_prefix
                } = values;

                const requestBody = {
                    checkIn: (new Date()).toGMTString(),
                    visitor: {
                        name: visitor_name,
                        email: visitor_email,
                        phoneNumber:
                            "+" + String(visitor_prefix) + String(visitor_phone)
                    },
                    host: {
                        name: host_name,
                        email: host_email,
                        phoneNumber:
                            "+" + String(host_prefix) + String(host_phone)
                    }
                };
                console.log(requestBody);
                axios
                    .post("http://localhost:5000/entry/new", requestBody)
                    .then(res => {
                        console.log(res);
                        this.setState({ otp: res.data.otp });
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        // const { autoCompleteResult } = this.state;

        const visitorPrefix = getFieldDecorator("visitor_prefix", {
            initialValue: "91"
        })(
            <Select style={{ width: 70 }}>
                <Option value="91">+91</Option>
                <Option value="1">+1</Option>
            </Select>
        );
        const hostPrefix = getFieldDecorator("host_prefix", {
            initialValue: "91"
        })(
            <Select style={{ width: 70 }}>
                <Option value="91">+91</Option>
                <Option value="1">+1</Option>
            </Select>
        );

        console.log(this.state.otp);
        if (this.state.otp) {
            const { otp } = this.state;
            return (
                <Redirect
                    to={{
                        pathname: "/confirmation",
                        state: otp
                    }}
                />
            );
        }

        return (
            <div>
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
                                padding: "5% 30% 5% 30%"
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
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Item>
                                        {getFieldDecorator("host_name", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input your name!",
                                                    whitespace: true
                                                }
                                            ]
                                        })(
                                            <Input
                                                placeholder="Host Name"
                                                style={{ width: "90%" }}
                                            />
                                        )}
                                    </Form.Item>

                                    <Form.Item>
                                        {getFieldDecorator("host_email", {
                                            rules: [
                                                {
                                                    type: "email",
                                                    message:
                                                        "The input is not valid E-mail!"
                                                },
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input your E-mail!"
                                                }
                                            ]
                                        })(
                                            <Input
                                                placeholder="Host Email"
                                                style={{ width: "90%" }}
                                            />
                                        )}
                                    </Form.Item>

                                    <Form.Item>
                                        {getFieldDecorator("visitor_name", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input your name!",
                                                    whitespace: true
                                                }
                                            ]
                                        })(
                                            <Input
                                                placeholder="Visitor Name"
                                                style={{ width: "90%" }}
                                            />
                                        )}
                                    </Form.Item>

                                    <Form.Item>
                                        {getFieldDecorator("visitor_email", {
                                            rules: [
                                                {
                                                    type: "email",
                                                    message:
                                                        "The input is not valid E-mail!"
                                                },
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input your E-mail!"
                                                }
                                            ]
                                        })(
                                            <Input
                                                placeholder="Visitor Email"
                                                style={{ width: "90%" }}
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator("host_phone", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input your phone number!"
                                                }
                                            ]
                                        })(
                                            <Input
                                                addonBefore={hostPrefix}
                                                style={{ width: "90%" }}
                                                placeholder="Host Phone Number"
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator("visitor_phone", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input your phone number!"
                                                }
                                            ]
                                        })(
                                            <Input
                                                addonBefore={visitorPrefix}
                                                style={{ width: "90%" }}
                                                placeholder="Visitor Phone Number"
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            htmlType="submit"
                                            ghost
                                        >
                                            Check In
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </div>
                    </Content>
                    {/* <Header></Header> */}
                </Layout>
            </div>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
    RegistrationForm
);

export default WrappedRegistrationForm;
