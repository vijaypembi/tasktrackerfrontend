import { useState, useEffect } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { format } from "date-fns";
import { MdAddToPhotos } from "react-icons/md";

import ApiUrl from "../ApiUrl";
import Card from "../Card";
import "./index.css";

const Home = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [allTaskes, setAllTasks] = useState([]);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Low");
    const [status, setStatus] = useState("Pending");
    const [isOpen, setIsOpen] = useState(false);
    const [isButton, setButton] = useState(true);

    const togglePopup = () => {
        setButton(true);
        setIsOpen(!isOpen);
        setName("");
        setDescription("");
        setDueDate("");
        setPriority("Low");
        setStatus("Pending");
    };
    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const updateData = (data) => {
        const { name, description, dueDate, priority, status, _id } = data;

        const date = new Date(dueDate);
        const currentDate = new Date();

        const dueDateOnly = format(date, "yyyy-MM-dd");
        const currentFormattedDate = format(currentDate, "yyyy-MM-dd");

        const isOverdue = dueDateOnly < currentFormattedDate;

        const updatedData = {
            name,
            description,
            dueDate: dueDateOnly,
            priority,
            status,
            id: _id,
            isOverdue,
        };
        return updatedData;
    };
    const fetchTasks = async () => {
        try {
            const response = await fetch(`${ApiUrl}/tasks`);
            const data = await response.json();

            setAllTasks(
                data.map((eachData) => {
                    return updateData(eachData);
                })
            );
            //console.log("Updated data:", data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
    useEffect(() => {
        const fetchIntially = async () => {
            try {
                const response = await fetch(`${ApiUrl}/tasks`);
                const data = await response.json();

                setAllTasks(
                    data.map((eachData) => {
                        return updateData(eachData);
                    })
                );
                //console.log("Updated data:", data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchIntially();
    }, []);
    
    const addNewTask = async (event) => {
        // alert("post, submit");
        event.preventDefault();
        if (!name || !description || !dueDate || !priority || !status) {
            alert("All fields are required!");
            return;
        }
        const newTaskData = {
            name,
            description,
            dueDate,
            status,
            priority,
        };

        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTaskData),
            };

            const response = await fetch(`${ApiUrl}/tasks`, options);
            const data = await response.json();
            if (response.ok) {
                alert("New Task is added");
            } else {
                alert("New Task is not added");
            }
            // setAllTasks((prevTasks) => [...prevTasks, updateData(data)]);
            fetchTasks();
            setName("");
            setDescription("");
            setDueDate("");
            setPriority("Low");
            setStatus("Pending");
            setIsOpen(!isOpen);
            console.log("Updated data:", data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            alert("Failed to fetch tasks. Please try again.");
        }
    };
    const updatePreviousTask = async (PreviousTask) => {
        setId(PreviousTask.id);
        setName(PreviousTask.name);
        setDescription(PreviousTask.description);
        setDueDate(PreviousTask.dueDate);
        setPriority(PreviousTask.priority);
        setStatus(PreviousTask.status);
        setIsOpen(!isOpen);
        setButton(false);
    };
    const updatePreviousTaskData = async () => {
        //alert("patch");
        try {
            const oldTaskData = {
                name,
                description,
                dueDate,
                status,
                priority,
            };
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(oldTaskData),
            };

            const response = await fetch(`${ApiUrl}/tasks/${id}`, options);
            const data = await response.json();
            console.log(response);
            if (response.ok) {
                alert("Task is Updated");
            } else {
                alert("Task is not updated");
            }
            //setAllTasks((prevTasks) => [...prevTasks, updateData(data)]);
            fetchTasks();
            setName("");
            setDescription("");
            setDueDate("");
            setPriority("Low");
            setStatus("Pending");
            setIsOpen(!isOpen);
            console.log("Updated data:", data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            alert("Failed to fetch tasks. Please try again.");
        }
    };
    const deletePreviousTask = async (id) => {
        try {
            const options = {
                method: "DELETE",
            };

            const response = await fetch(`${ApiUrl}/tasks/${id}`, options);
            //const data = await response.json();
            console.log(response);
            if (response.ok) {
                alert("Task is Deleted");
            } else {
                alert("Task is not Deleted");
            }
            //setAllTasks((prevTasks) => [...prevTasks, updateData(data)]);
            fetchTasks();
        } catch (error) {
            console.error("Error fetching tasks:", error);
            alert("Failed to fetch tasks. Please try again.");
        }
    };
    const searchTask = async (event) => {
        // console.log(event);
        if (event.key === "Enter") {
            const searchValue = event.target.value.trim();
            if (searchValue === "") {
                alert("Please enter a search term.");
                return;
            }

            try {
                const response = await fetch(
                    `${ApiUrl}/searchtasks?query=${searchValue}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                //console.log(response);
                if (response.ok) {
                    const data = await response.json();
                    const searchResult = data.map((eachTask) => ({
                        description: eachTask.description,
                        dueDate: eachTask.dueDate,
                        name: eachTask.name,
                        priority: eachTask.priority,
                        status: eachTask.status,
                        id: eachTask._id,
                    }));
                    setAllTasks(searchResult);

                    if (searchResult.length === 0) {
                        alert("No Result Found");
                    }
                } else {
                    setAllTasks([]);
                    alert("Failed to fetch tasks. Please try again.");
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
                alert("An error occurred while searching for tasks.");
            }
        }
    };

    return (
        <div
            className={`home-container d-flex flex-column ${
                isDarkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
        >
            {!isOpen && (
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row justify-content-between align-items-start container-fluid p-3">
                        <h1 className="text-start">
                            <span className="text-success">T</span>ask Tracker
                        </h1>
                        <input
                            type="text"
                            name="search"
                            onKeyDown={(event) => searchTask(event)}
                            className="search-input-web"
                            placeholder="Search by name or  status"
                            aria-label="Search through site content"
                        />
                        <button
                            className="btn day-dark-button p-0"
                            onClick={toggleTheme}
                        >
                            {isDarkMode ? (
                                <CiLight className="light-icon" />
                            ) : (
                                <MdOutlineDarkMode />
                            )}
                        </button>
                    </div>
                    <input
                        type="text"
                        name="search"
                        onKeyDown={(event) => searchTask(event)}
                        className="search-input-mb"
                        placeholder="Search by name or  status"
                        aria-label="Search through site content"
                    />
                    <div
                        className={`welcom-banner text-start p-3 rounded-2 ${
                            isDarkMode
                                ? "bg-dark text-white"
                                : "bg-custom text-white"
                        } w-75 align-self-center border-1 shadow-lg`}
                    >
                        <h1 className="welcom-heading">Hi!</h1>
                        <p className="welcom-description">
                            Welcome! Manage your all tasks & daily work here.
                        </p>
                    </div>
                    <h1 className="heading text-start m-3">My Tasks</h1>
                    <ul className=" display-task-container list-unstyled m-0 p-3 d-flex flex-column">
                        {allTaskes.map((eachTask) => (
                            <li key={eachTask.id}>
                                <Card
                                    eachTask={eachTask}
                                    isDarkMode={isDarkMode}
                                    updatePreviousTask={updatePreviousTask}
                                    deletePreviousTask={deletePreviousTask}
                                />
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={togglePopup}
                        className="add-button btn btn-primary position-fixed bottom-0 end-0 m-5"
                    >
                        <MdAddToPhotos /> Add
                    </button>
                </div>
            )}

            {isOpen && (
                <div className="d-flex flex-row justify-content-center">
                    <div
                        className={`popup-overlay mb-5   ${
                            isDarkMode ? "bg-dark " : "bg-custom "
                        }`}
                    >
                        <h2>Add New Task</h2>
                        <form onSubmit={addNewTask}>
                            <div className="input-eliment">
                                <label>Task Name</label>
                                <input
                                    placeholder="Enter your task..."
                                    type="text"
                                    name="name"
                                    value={name}
                                    required
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="input-eliment">
                                <label>Task Details</label>
                                <textarea
                                    name="description"
                                    rows={"4"}
                                    value={description}
                                    required
                                    placeholder="Enter your message here..."
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="input-eliment">
                                <label>Due Date</label>

                                <input
                                    type="date"
                                    name="date"
                                    value={dueDate}
                                    onChange={(e) => {
                                        setDueDate(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="input-eliment">
                                <label>Status</label>

                                <select
                                    onChange={(e) => {
                                        setStatus(e.target.value);
                                    }}
                                    required
                                    value={status}
                                    name="status"
                                    id="status"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">
                                        In Progress
                                    </option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <div className="input-eliment">
                                <label>Priority</label>
                                <select
                                    required
                                    name="priority"
                                    id="priority"
                                    value={priority}
                                    onChange={(e) => {
                                        setPriority(e.target.value);
                                    }}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>

                            <div className="form-buttons mb-5">
                                <button
                                    className="btn btn-light border-color-white m-3 "
                                    type="button"
                                    onClick={togglePopup}
                                >
                                    Cancel
                                </button>
                                {isButton ? (
                                    <button
                                        className="btn btn-primary m-3 "
                                        type="submit"
                                        onClick={addNewTask}
                                    >
                                        Submit
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-primary m-3 "
                                        type="button"
                                        onClick={updatePreviousTaskData}
                                    >
                                        Update
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;

// {
//     name : javaScript,
//     description : JavaScript is a programming language that allows developers to add interactivity to web pages. It's used to create dynamic content, such as animated graphics, interactive maps, and scrolling video jukeboxes. JavaScript is a key part of web development, along with HTML and CSS: ,
//     dueDate: 24-12-2024,
//     priority : High,
//     status : Pending,

// };

// description
// :
// "This is a test task"
// dueDate
// :
// "2024-12-31T00:00:00.000Z"
// name
// :
// "Test Task11"
// priority
// :
// "High"
// status
// :
// "Pending"
// __v
// :
// 0
