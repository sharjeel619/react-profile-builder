export const workExpState = {
  jobTitle: "",
  companyName: "",
  startDate: null,
  endDate: null,
  currentlyWorking: false,
  jobDescription: "",
  expFieldsVisibility: false,
};

export const personalInfoState = {
  firstName: "",
  lastName: "",
  email: "",
  tagLine: "",
};

export const initialFormState = {
  ...workExpState,
  ...personalInfoState,
  workExperiences: [],
  skillInput: "",
  skills: [],
};

export const sleep = (time) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const capitalizeString = (str) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const getAllUserData = () => {
  let data = localStorage.getItem("users");
  return JSON.parse(data) || [];
};

export const saveUserInfo = (data, index) => {
  let allData = getAllUserData();
  console.log(index)
  if (index >= 0) allData[index] = data;
  else allData.push(data);
  localStorage.setItem("users", JSON.stringify(allData));
};
