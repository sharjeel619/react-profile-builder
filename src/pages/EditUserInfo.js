import {
  Col,
  Row,
  notification,
} from "antd";
import { useState } from "react";
import { getAllUserData, initialFormState, saveUserInfo, sleep } from "../util";
import { Link, useParams } from "react-router-dom";
import { LeftCircleTwoTone } from "@ant-design/icons/lib/icons";
import UserInfoForm from "../components/UserInfoForm";
const EditUserInfo = () => {
  const [isSaving, setIsSaving] = useState(false);
  const { id } = useParams();
  const allUserData = getAllUserData();
  const fIndex = allUserData.findIndex((item) => item.userId == id);
  const userInfo = allUserData[fIndex];
  const initialState = { ...initialFormState, ...userInfo }
  const handleSubmit = async (data) => {
    setIsSaving(true)
    await sleep(1000);
    const userObj = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      tagLine: data.tagLine,
      skills: data.skills,
      workExperiences: data.workExperiences,
      userId: id,
    };
    saveUserInfo(userObj, fIndex)
    notification.success({
      message: "Success!",
      description: "User Info Updated!",
    });
    setIsSaving(false);
  };
  return (
    <>
      <Row justify="space-between" style={{ margin: "50px 50px 0 50px" }}>
        <Link to="/">
          <LeftCircleTwoTone /> Back
        </Link>
        <h1>Edit User Info</h1>
        <p>&nbsp;</p>
      </Row>
      <UserInfoForm handleSubmit={handleSubmit} initialState={initialState} isSaving={isSaving} />
    </>
  )
}
export default EditUserInfo