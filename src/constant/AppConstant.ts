// export const API_URL = "http://localhost:4000";

console.log("process.env:", process.env);
console.log("process.env.REACT_APP_NODE_ENV:", process.env.REACT_APP_NODE_ENV);
console.log(
  "process.env.REACT_APP_SERVER_BASE_URL:",
  process.env.REACT_APP_SERVER_BASE_URL
);
export const API_URL =
  process.env.REACT_APP_NODE_ENV === "development"
    ? process.env.REACT_APP_LOCAL_BASE_URL
    : process.env.REACT_APP_SERVER_BASE_URL;
