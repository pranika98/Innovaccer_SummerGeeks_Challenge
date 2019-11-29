import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";
import { Form, Input, Select, Button, Card, Layout } from "antd";
import Background from "../hk.png";
import Logo from "../innov.png";
const { Header, Content } = Layout;
const { Option } = Select;

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false
        // autoCompleteResult: []
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            debugger;
            if (!err) {
                console.log("Received values of form: ", values);
                const { visitor_phone, otp, visitor_prefix } = values;

                const requestBody = {
                    checkOut: new Date().toGMTString(),
                    phoneNumber:
                        "+" + String(visitor_prefix) + String(visitor_phone),
                    otp
                };
                console.log(requestBody);
                axios
                    .post("http://localhost:5000/exit", requestBody)
                    .then(res => {
                        console.log(res);
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

        return (
            <Layout>
                <Content>
                    <div style={{ position: "fixed", top: 10, left: "40%" }}>
                        <img src={Logo} />
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${Background})`,
                            backgroundPosition: "center",
                            backgroundSize: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "14% 25% 14% 25%"
                        }}
                    >
                        <Card
                            hoverable={true}
                            bordered={true}
                            title="Thank you for visiting Innovaccer"
                            headStyle={{
                                backgroundColor: "#EF1F79",
                                color: "white",
                                fontSize: "36px"
                            }}
                            bodyStyle={{ backgroundColor: "#ed3987" }}
                        >
                            <Form onSubmit={this.handleSubmit}>
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
                                            placeholder="Please enter your mobile number"
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator("otp", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "Please input your otp"
                                            }
                                        ]
                                    })(
                                        <Input
                                            style={{ width: "90%" }}
                                            placeholder="Please enter your OTP"
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        htmlType="submit"
                                        ghost
                                        onClick={this.handleSubmit}
                                    >
                                        <Link
                                            to={{
                                                pathname: "/"
                                            }}
                                        >
                                            Check Out
                                        </Link>
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                </Content>
                {/* <Header></Header> */}
            </Layout>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
    RegistrationForm
);

export default WrappedRegistrationForm;
