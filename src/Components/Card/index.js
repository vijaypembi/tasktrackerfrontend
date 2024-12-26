//TaskFormModal;
// import { useState, useEffect } from "react";
import { BsXLg } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";

import "./index.css";
const Card = (props) => {
    const { eachTask, isDarkMode, updatePreviousTask, deletePreviousTask } =
        props;

    const { id, name, description, dueDate, priority, status, isOverdue } =
        eachTask;
    const editTask = () => {
        updatePreviousTask(eachTask);
    };
    const deleteTask = () => {
        deletePreviousTask(id);
    };
    return (
        <div
            className={`task-card  text-start pt-1 p-3 rounded-2 ${
                isOverdue ? "bg-red" : isDarkMode ? "bg-dark " : "bg-custom "
            } m-2 align-self-center border-1 shadow-lg`}
        >
            <div className="buttons-container">
                <button onClick={editTask} className="edit-icon">
                    <FaRegEdit />
                </button>
                <button onClick={deleteTask} className="delet-icon">
                    <BsXLg />
                </button>
            </div>
            <hr />
            <div className="flex-wrap card-top gap-2 mb-2 d-flex flex-row ">
                <span className="tast-priority">{`Priority: ${priority} |`}</span>
                <span className="tast-status">{`Status: ${status} |`}</span>
                <span className="tast-dueDate">{`DueDate: ${dueDate} |`}</span>
            </div>
            <h3 className="task-name">{name}</h3>
            <p className="task-description">{description}</p>
        </div>
    );
};

export default Card;
