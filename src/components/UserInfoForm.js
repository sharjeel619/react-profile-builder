import { skills } from "../data";
import { Card, Col, Row, Button, Tag, Divider, Typography } from "antd";
import { FieldArray, Formik } from "formik";
import {
  ResetButton,
  SubmitButton,
  Form,
  FormItem,
  Input,
  AutoComplete,
  DatePicker,
  Checkbox,
} from "formik-antd";
import {
  PlusCircleTwoTone,
  RightCircleTwoTone,
} from "@ant-design/icons/lib/icons";
import moment from "moment";
import { workExpState, initialFormState, validateEmail } from "../util";
const { Title } = Typography;
const skillOptions = skills.map((item) => ({ label: item, value: item }));
const monthFormat = "MMM YYYY";
const UserInfoForm = ({ type, handleSubmit, initialState, isSaving }) => {
  const onSkillsSearch = (text) => {
    if (!text) return [];
    else {
      return skillOptions.filter((item) => item.label.includes(text));
    }
  };
  const validateWorkExpForm = (values, toValidate) => {
    for (let key of toValidate) {
      if (!values[key]) return true;
    }
    return false;
  };
  const wordCount = (string) => {
    return string.trim().split(/\s+/).length - 1;
  };
  const validateProfileForm = (values) => {
    let errorObj = {};
    if (!values.firstName) errorObj.firstName = "Required!";
    if (!values.lastName) errorObj.lastName = "Required!";
    if (!values.email) errorObj.email = "Required!";
    if (values.email && !validateEmail(values.email))
      errorObj.email = "Incorrect email format!";
    return errorObj;
  };
  const UserForm = ({
    values,
    handleChange,
    setValues,
  }) => {
    const onAddWorkExp = () => {
      if (validateWorkExpForm(values, ["jobTitle", "companyName"])) return;
      setValues(
        (values) => ({
          ...values,
          workExperiences: [
            ...values.workExperiences,
            {
              jobTitle: values.jobTitle,
              companyName: values.companyName,
              startDate: values.startDate,
              endDate: values.endDate,
              currentlyWorking: values.currentlyWorking,
              jobDescription: values.jobDescription,
            },
          ],
          ...workExpState,
        }),
        false
      );
    };
    return (
      <Form>
        <Card className="profile-card" bordered={false}>
          <h2>Personal Info</h2>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem name="firstName" required={true}>
                <label>First Name</label> <span>*</span>
                <Input
                  size="large"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <Form.Item name="lastName" required={true}>
                <label>Last Name</label> <span>*</span>
                <Input
                  size="large"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="email">
                <label>Email</label> <span>*</span>
                <Input
                  size="large"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="tagLine">
                <label>About You</label>
                <Input.TextArea
                  rows={3}
                  size="large"
                  name="tagLine"
                  value={values.tagLine}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card className="profile-card" bordered={false}>
          <Row justify="space-between">
            <h2>Work Experience</h2>
            <Button
              hidden={values.expFieldsVisibility}
              type="link"
              size="large"
              onClick={() =>
                setValues((values) => ({
                  ...values,
                  expFieldsVisibility: true,
                }))
              }
            >
              <PlusCircleTwoTone /> Add
            </Button>
          </Row>
          <div>
            <Row>
              <Col span={24}>
                {values.workExperiences.map((item, index) => (
                  <div key={"work-" + index} style={{ margin: "16px 0" }}>
                    <Title level={4} color="primary">
                      <RightCircleTwoTone /> {item.companyName}
                    </Title>
                    <div style={{ paddingLeft: "32px" }}>
                      <p> {item.jobTitle}</p>
                      {item.startDate && (
                        <span>
                          {moment(item.startDate).format(monthFormat)}
                        </span>
                      )}
                      {item.startDate ? " - " : ""}
                      <span>
                        {item.currentlyWorking
                          ? "Present"
                          : item.endDate
                            ? moment(item.endDate).format(monthFormat)
                            : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </Col>
            </Row>
            {values.expFieldsVisibility && (
              <div>
                <Row gutter={16}>
                  <Col span={12}>
                    <FormItem
                      name="jobTitle"
                      required={values.expFieldsVisibility}
                    >
                      <label>Job Title</label> <span>*</span>
                      <Input
                        size="large"
                        name="jobTitle"
                        value={values.jobTitle}
                        onChange={handleChange}
                      />
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem
                      name="companyName"
                      required={values.expFieldsVisibility}
                    >
                      <label>Company Name</label> <span>*</span>
                      <Input
                        size="large"
                        name="companyName"
                        value={values.companyName}
                        onChange={handleChange}
                      />
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <Row justify="space-between">
                      <FormItem name="startDate">
                        <label>Start Date</label>
                        <DatePicker
                          style={{ display: "block" }}
                          name="startDate"
                          size="large"
                          picker="month"
                          format={monthFormat}
                          onChange={handleChange}
                        />
                      </FormItem>
                      <FormItem name="endDate">
                        <label>End Date</label>
                        <DatePicker
                          style={{ display: "block" }}
                          disabled={values.currentlyWorking}
                          name="endDate"
                          size="large"
                          picker="month"
                          format={monthFormat}
                          name="endDate"
                          onChange={handleChange}
                        />
                      </FormItem>
                    </Row>
                    <Row>
                      <FormItem name="currentlyWorking">
                        <Checkbox
                          name="currentlyWorking"
                          value={values.currentlyWorking}
                          onChange={handleChange}
                        >
                          I currently work here
                        </Checkbox>
                      </FormItem>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <FormItem name="jobDescription">
                      <label>Job Description</label>
                      <Input.TextArea
                        rows={3}
                        size="large"
                        name="jobDescription"
                        validate={(value) =>
                          wordCount(value) > 300 ? "300 words is the limit" : ""
                        }
                        value={values.jobDescription
                          .split(/\s+/)
                          .slice(0, 301)
                          .join(" ")}
                        onChange={() =>
                          wordCount(values.jobDescription) <= 300
                            ? handleChange()
                            : ""
                        }
                      />
                      <span>{wordCount(values.jobDescription)}/300 words</span>
                    </FormItem>
                  </Col>
                </Row>
                <Row justify="center">
                  <Button.Group size="large">
                    <Button
                      onClick={() => {
                        setValues(
                          (values) => ({ ...values, ...workExpState }),
                          false
                        );
                      }}
                    >
                      Cancel
                    </Button>
                    &nbsp;
                    <Button
                      type="primary"
                      disabled={validateWorkExpForm(values, [
                        "jobTitle",
                        "companyName",
                      ])}
                      onClick={onAddWorkExp}
                    >
                      Add
                    </Button>
                  </Button.Group>
                </Row>
              </div>
            )}
          </div>
        </Card>
        <Card className="profile-card" bordered={false}>
          <h2>Skills</h2>
          <FieldArray name="skills">
            {({ push, remove }) => (
              <div>
                <AutoComplete
                  size="large"
                  options={skillOptions}
                  style={{
                    width: 300,
                  }}
                  name="skillInput"
                  placeholder="e.g: React.js"
                  onSelect={(e) => push(e)}
                  onChange={handleChange}
                  onSearch={onSkillsSearch}
                />
                {values.skills.length > 0 && <Divider />}
                <Row>
                  {values.skills.map((item, index) => (
                    <Tag
                      onClose={(e) => remove(index)}
                      key={"tag-" + index}
                      closable
                      color="#40a9ff"
                    >
                      {item}
                    </Tag>
                  ))}
                </Row>
              </div>
            )}
          </FieldArray>
        </Card>
        <Row gutter={24} justify="center" style={{ margin: "24px 0" }}>
          <Button.Group size="large">
            {!initialState && <ResetButton>Reset</ResetButton>}
            &nbsp;
            <Button type="primary" htmlType="submit" loading={isSaving}>Submit</Button>
            {/* <SubmitButton>Submit</SubmitButton> */}
          </Button.Group>
        </Row>
      </Form>
    );
  };

  return (
    <Row justify="center">
      <Col span={12}>
        <Formik
          initialValues={initialState ? initialState : initialFormState}
          onSubmit={handleSubmit}
          validate={validateProfileForm}
          component={({ ...props }) => <UserForm {...props} />}
        />
      </Col>
    </Row>
  );
};
export default UserInfoForm;
