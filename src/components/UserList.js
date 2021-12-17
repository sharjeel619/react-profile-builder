import { Row, Col, Table, Space, Tag } from "antd";
import { Link } from "react-router-dom";

const tableColumns = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'tc-firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'tc-lastName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'tc-email',
  },
  {
    title: 'Skills',
    dataIndex: 'skills',
    key: 'tc-skills',
    render: tags => (
      <>
        {tags.slice(0, 3).map((item, index) => (<Tag key={"table-tag-" + index} color="#40a9ff">{item}</Tag>))}
      </>
    )
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Link to={"/edit-profile/" + record.userId}>Edit</Link>
        <Link to={"/view-profile/" + record.userId}>View</Link>
      </Space>
    ),
  }
]
const UserList = ({ userData }) => {
  const userList = userData.map(item => ({ ...item, key: "tr-" + item.userId }))
  return (
    <>
      <Row justify="center">
        <h1>User List</h1>
      </Row>
      <Row justify="center">
        <Col span={12}>
          <Table
            columns={tableColumns}
            dataSource={userList}
            pagination={false}
          />
        </Col>
      </Row>
    </>
  )
}
export default UserList;