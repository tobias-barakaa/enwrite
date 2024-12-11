import React from "react";
import { Col } from "react-bootstrap";

const UserInfo: React.FC = () => {
  let username = "Guest"; // Default username if not available

  try {
    const userInfo = localStorage.getItem("userInfo");
    console.log("Raw userInfo:", userInfo); // Debugging the raw value

    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      username = parsedUserInfo.data?.username || "Guest"; // Access `username` inside `data`
    }
  } catch (error) {
    console.error("Error parsing userInfo from localStorage:", error);
  }

  return (
    <Col>
      <div>
        <strong>{username}</strong> <span>(mystats | nofeedback)</span>
      </div>
      <div>Billing Code: 23232423</div>
    </Col>
  );
};

export default UserInfo;
