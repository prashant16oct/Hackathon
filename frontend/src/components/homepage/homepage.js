import React, { useState } from "react"
import {FooterDash} from "../FooterDash/FooterDash";
import {NavDash} from "../NavDash/NavDash";
import { Card, Col, Row, Radio, Space, Tooltip, Button, Modal, Form, Input} from 'antd';
import Data from './data/temp';
import 'antd/dist/antd.css';
import "./homepage.css"
import HostelImage1 from "../../11.jpg"
import HostelImage2 from "../../22.jpg"
import HostelImage3 from "../../33.jpg"

const Homepage = ({updateUser}) => {
    const [hostel, setHostel] = useState(0);
    const [hostelData, setHostelData] = useState();
    const [value , setValue] = useState(1);
    const [room, setRoom] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const [isModalVisible1, setIsModalVisible1] = useState(false);

    const showModal1 = () => {
        setIsModalVisible1(true);
    };

    const handleOk1 = () => {
        setIsModalVisible1(false);
    };

    const handleCancel1 = () => {
        setIsModalVisible1(false);
    };

    const Selection = (index) => {
        setHostel(index);
        setHostelData(Data['hostel' + index]);
        console.log(Data['hostel' + index]);
    }

    const onChange = e => {
        setValue(e.target.value);
        setRoom(1);
    }

    const mainFunc = (index) => {
        setRoom(index+1);
        console.log(index);
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        const temp  = hostelData
        temp['floor' + value][room-1].name = values.Name;
        temp['floor' + value][room-1].email = values.Email;
        temp['floor' + value][room-1].phone = values['Phone Number'];
        temp['floor' + value][room-1].age = values.Age;
        temp['floor' + value][room-1].status = true;
        setHostelData(temp);
        console.log(hostelData,temp);
        handleOk()
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const swap = (index) => {
        console.log(room + ' Swapping ' + (Number(index)+1));
        if(room === (Number(index)+1)){
            alert('Same room!');
            return;
        } else {
            const temp = hostelData;
            const temp1 = temp['floor' + value][room-1];
            temp['floor' + value][room-1] = temp['floor' + value][index];
            temp['floor' + value][index] = temp1;
            setHostelData(temp);
        }
    }
    
    const reallocate = (index) => {
        console.log(room + ' Changing room ' + (Number(index)+1));
        if(room === (Number(index)+1)){
            alert('Same room!');
            return;
        } else {
            const temp = hostelData;
            const temp1 = temp['floor' + value][room-1];
            temp['floor' + value][room-1] = temp['floor' + value][index];
            temp['floor' + value][index] = temp1;
            setHostelData(temp);
            showModal1();
        }

    }

    return (
        <div>   
        <div className="dash-main">
            <NavDash updateUser={updateUser} />
            <br /><br /><br />
            <br /><br /><br />
            {
                hostel === 0 &&
                <div className="site-card-wrapper">
                    <Row gutter={25} >
                    <Col span={8}>
                  
                        <Card  className="card-edit" onClick={() => Selection(1)} title="Hostel 1" bordered={false}>
                        <div className="card-img-div">
                        <img src={HostelImage1} alt="Hostel 1" className="card-img-edit1" />
                        </div>
                        <br/>
                        Boys Hostel
                 
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className="card-edit" onClick={() => Selection(2)} title="Hostel 2" bordered={false}>
                        <div className="card-img-div">
                        <img src={HostelImage2} alt="Hostel 2" className="card-img-edit2" />
                        </div>
                        <br/>
                        Boys Hostel
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className="card-edit" onClick={() => Selection(3)} title="Hostel 3" bordered={false}>
                        <div className="card-img-div">
                        <img src={HostelImage3} alt="Hostel 3" className="card-img-edit3" />
                        </div>
                        <br/>
                        Girls Hostel
                        </Card>
                        <br/>
                    <br/>
                    </Col>
                    
                    </Row>
                </div>
            }
            {
                hostel !== 0 &&
                <div className="site-card-wrapper">
                <div className = "room-data-edit" > <h2 style={{display:"inline-block", fontSize:"3rem"}}>Total Rooms = <span style={{color:"yellow"}}>{room}</span></h2> </div>
                <div className = "room-data-edit" ><h2 style={{display:"inline-block", fontSize:"3rem" }}>Filled Rooms = <span style={{color:"lightgreen"}}>2</span></h2></div>
                <div className = "room-data-edit1" > <h2 style={{display:"inline-block", fontSize:"3rem"}}>Empty Rooms = <span style={{color:"red"}}>2</span></h2></div>

                <br/>
                <br/>
                    <h1>{hostelData.name}</h1>
                    <Row>
                        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                        <Radio.Group onChange={onChange} value={value}>
                            <Space direction="vertical">
                            <Radio value={1}>Floor 1</Radio>
                            <Radio value={2}>Floor 2</Radio>
                            <Radio value={3}>Floor 3</Radio>
                            </Space>
                        </Radio.Group>
                        </Col>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                            {
                                hostelData['floor' + value].map((sel,index) => (
                                    <div className="room-box">
                                        {
                                            sel.status &&
                                            <Tooltip placement="topLeft" title={"Occupied by: " + sel.name}  >
                                                <div onClick={() => mainFunc(index)} className={room-1===index ? "legend-item-box selected room-edit" : "legend-item-box room-edit" } style={{ backgroundColor: '#77D970' }} />
                                            </Tooltip>
                                        }
                                        {
                                            !sel.status &&
                                            <div onClick={() => mainFunc(index)} className={room-1===index ? "legend-item-box selected room-edit" : "legend-item-box room-edit"} style={{ backgroundColor: '#FF2E63' }} />
                                        }
                                    </div>
                                ))
                            }
                            <div className="btn-group">
                                <Button  onClick={showModal} disabled={hostelData['floor' + value][room-1].status ? true : false} type="primary" className="button-edit1">Allocate Room</Button>
                                <Button  onClick={showModal1} disabled={hostelData['floor' + value][room-1].status ? false : true} type="primary" className="button-edit2" >ReAllocate Room</Button>
                                {
                                    (room) &&
                                    <span>
                                        Room Selected: {room}
                                    </span>
                                }
                                <Modal title={"ReAllocate room: " + room} visible={isModalVisible1} onOk={handleOk1} onCancel={handleCancel1}>
                                    <h4 style={{textAlign: 'center'}}>Choose a new room</h4>
                                    {
                                        hostelData['floor' + value].map((room,index) => (
                                            <div className="room-box">
                                                {
                                                    room.status &&
                                                    <Tooltip placement="topLeft" title={"Occupied by: " + room.name} >
                                                        <div onClick={() => swap(index)} className="legend-item-box" style={{ backgroundColor: '#77D970' }} />
                                                    </Tooltip>
                                                }
                                                {
                                                    !room.status &&
                                                    <div onClick={() => reallocate(index)} className="legend-item-box" style={{ backgroundColor: '#FF2E63' }} />
                                                }
                                            </div>
                                        ))
                                    }
                                    <br /><br /><br />
                                    <br /><br /><br />
                                </Modal>
                                <Modal title={"Allocate room: " + room} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}   cancelButtonProps={{ style: { display: 'none' } }}  okButtonProps={{ style: { display: 'none' } }} >
                                <Form
                                    name="basic"
                                    labelCol={{
                                        span: 8,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    >
                                    <Form.Item
                                        label="Name"
                                        name="Name"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input Student Name!',
                                        },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Phone Number"
                                        name="Phone Number"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input Student Phone Number!',
                                        },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        name="Email"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input Student Email!',
                                        },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Age"
                                        name="Age"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input Student Age!',
                                        },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        wrapperCol={{
                                        offset: 18,
                                        span: 16,
                                        }}
                                    >
                                 
                                        <Button type="primary" htmlType="submit" className="button-edit1">
                                        Allocate Room
                                        </Button>
                                        
                                    </Form.Item>
                                    </Form>
                                </Modal>
                            </div>
                        </Col>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                            {
                                hostelData['floor' + value][room-1].status &&
                                <div className="req-hostel-data" style={{backgroundColor:"white", borderRadius:"20px", backgroundColor:"lightgray", paddingLeft:"10px"}}>
                                <br/>
                                    <h4> Name: {hostelData['floor' + value][room-1].name}</h4>
                                    <h4> Phone Number: {hostelData['floor' + value][room-1].phone}</h4>
                                    <h4> Age: {hostelData['floor' + value][room-1].age}</h4>
                                    <h4> Email: {hostelData['floor' + value][room-1].email}</h4>
                                <br/>
                                </div>
                            }
                        </Col>
                      
                    </Row>
                    <br/>
                    <br/>
                  
                </div>
           
            }
     
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <FooterDash/> 
        </div>
    )
}

export default Homepage