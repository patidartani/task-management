import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";


const TaskDetail = () => {
  const [input, setInput] = useState({});
  const [user, setUser] = useState();
  const { _id } = useParams();
  const isAdmin = useSelector((state) => state.isAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/task/gettask/?_id=${_id}`
      );
      setInput(res.data[0]);
      setUser(res.data[0].assign.name);
    } catch (err) {
      console.log(err);
    }
  };

  if (!isAdmin) {
    navigate("/");
    return null;
  }

  return (
    <div className="background_container">
      <section className="task-card-section">
        <div className="task-card">
          <h3 className="task-title">{input.title}</h3>
          <div className="task-details">
            <p>
              <strong>Description:</strong>{" "}
              {input.description}
            </p>
            <p>
        <strong>Assigned To:</strong>{" "}
              {user}
            </p>
            <p>
              <strong>Priority:</strong>{" "}
              {input.priority}
            </p>
            <p>
      <strong>Status:</strong>{" "}
              {input.status}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {input.startdate}
            </p>
            <p>
             <strong>End Date:</strong>{" "}
              {input.enddate}
            </p>
          </div>
          <button className="back-button" onClick={() => navigate(-1)}>
            <FaLongArrowAltLeft /> 
          </button>
        </div>
      </section>

      {/* Styles */}
      <style>
        {`
          /* Background styling */
          .background_container {
            display: flex;
            justify-content: center;
            align-items: center;         
            color: white;
            font-family: 'Roboto', sans-serif;
          }

          /* Card Section */
          .task-card-section {
            width: 100%;
            max-width: 800px;
            margin: auto;
            padding: 10px;
          }

          /* Task Card */
          .task-card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 16px;
            padding: 5px;
            text-align: left;
          }
          /* Title */
          .task-title {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 30px;
            color: #2b2b2b;
          }

          /* Task Details */
          .task-details p {
            font-size: 18px;
            margin: 10px 0;
            background-color: #c3c3c3;
            color: #333;
            display: flex;
            align-items: center;
            gap: 10px;
            padding:0.7vmax 2vmax;
            border-radius:10px;
            width:100%;
            display:flex;
            justify-content:  flex-start;
            align-item: flex-start
          }

          .task-details strong {
            font-weight: 600;
            color: #2b2b2b;
          }

          /* Back Button */
          .back-button {
            margin-top: 20px;
            padding: 10px 20px;
            color: white;
            border: none;
            border-radius: 8px;
            background-color: black;
            font-size: 20px;
            cursor: pointer;
          }

          /* Icons */
          .icon {
            font-size: 22px;
            color: #6a11cb;
          }

          /* Media Query for Responsive Design */
          @media (max-width: 768px) {
            .task-card {
              padding: 20px;
            }
            .task-title {
              font-size: 24px;
            }
            .task-details p {
              font-size: 16px;
            }
            .back-button {
              font-size: 14px;
              padding: 8px 16px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default TaskDetail;
