import { Row, Col, Table, Space, Tag, Card, Typography, Timeline } from "antd";
import { Link, useParams } from "react-router-dom";
import { getAllUserData } from "../util";
import moment from "moment";
import { LeftCircleTwoTone } from "@ant-design/icons/lib/icons";
const { Title } = Typography;
const monthFormat = "MMM YYYY";
const ViewUserInfo = () => {
  const { id } = useParams();
  const userInfo = getAllUserData().find((item) => item.userId == id);
  return (
    <>
      <Row justify="space-between" style={{ margin: "50px 50px 0 50px" }}>
        <Link to="/">
          <LeftCircleTwoTone /> Back
        </Link>
        <h1>User Info</h1>
        <p>&nbsp;</p>
      </Row>
      <Row justify="center">
        <Col span={12}>
          <Card>
            <Title level={4}>Name</Title>
            <p>
              {userInfo.firstName} {userInfo.lastName}
            </p>
            <Title level={4}>Email</Title>
            <a href={"mailto:" + userInfo.email}>{userInfo.email}</a>
            <Title level={4}>About</Title>
            <p>{userInfo.tagLine || "No description provided!"}</p>
            <Title level={4}>Skills</Title>
            <p>
              {userInfo.skills.length
                ? userInfo.skills.map((item, index) => (
                  <Tag key={"table-tag-" + index} color="#40a9ff">
                    {item}
                  </Tag>
                ))
                : "No skills provided!"}
            </p>
            <Title level={4}>Work Experiences</Title>
            <Timeline mode="left">
              {userInfo.workExperiences.map((item, index) => (
                <Timeline.Item
                  key={"work-" + index}
                  label={
                    item.startDate
                      ? moment(item.startDate).format(monthFormat)
                      : "Unknown"
                  }
                >
                  <div>
                    <Title level={4} color="primary">
                      {item.companyName}
                    </Title>
                    <p> {item.jobTitle}</p>
                    <p> {item.jobDescription}</p>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default ViewUserInfo;
