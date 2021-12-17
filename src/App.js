import "./App.css";
import { getAllUserData, saveUserInfo, sleep } from "./util";
import {
  Col,
  Row,
  notification,
} from "antd";
import { useState } from "react";
import UserList from "./components/UserList";
import UserInfoForm from "./components/UserInfoForm";

const App = () => {
  const [userData, setUserData] = useState(() => getAllUserData());
  const [isSaving, setIsSaving] = useState(false);
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
      userId: userData.length + 1,
    };
    setUserData((state) => [...state, userObj]);
    saveUserInfo(userObj);
    notification.success({
      message: "Success!",
      description: "New user created!",
    });
    setIsSaving(false);
  };

  return (
    <div className="App">
      <UserList userData={userData} />
      <Row justify="center">
        <h1 style={{ marginTop: "24px" }}>Create User</h1>
      </Row>
      <UserInfoForm handleSubmit={handleSubmit} isSaving={isSaving} />
    </div>
  );
};

export default App;
