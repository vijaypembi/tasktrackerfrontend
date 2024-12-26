# Task Tracker Application

## Overview

The Task Tracker application is a web-based tool that allows users to manage their daily tasks effectively. Users can create, update, delete, and search tasks, as well as toggle between light and dark modes. The application features an intuitive UI for task management, leveraging React for frontend development.

---

## Features

-   **Add New Tasks:** Create tasks by providing details such as name, description, due date, priority, and status.
-   **Update Tasks:** Edit previously created tasks.
-   **Delete Tasks:** Remove tasks from the task list.
-   **Search Tasks:** Search for tasks by name or status using a dynamic search input.
-   **Theme Toggle:** Switch between light and dark modes for better usability.
-   **Task Display:** View tasks with key details, such as name, due date, priority, status, and overdue indicators.

---

## Technologies Used

-   **Frontend:** React, React Hooks (`useState`, `useEffect`), React Icons.
-   **Styling:** CSS for custom styling.
-   **Date Formatting:** `date-fns` library for date manipulation and formatting.
-   **API Integration:** Fetch API for server communication.

---

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd task-tracker
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm start
    ```

---

## Components

### `Home` Component

The main component responsible for rendering the task tracker interface and handling business logic.

#### Key Functionalities:

1. **State Management:**

    - Manages tasks and UI states using `useState`.
    - Stores task details (`name`, `description`, `dueDate`, `priority`, `status`).

2. **Dark Mode Toggle:**

    - Allows users to switch between light and dark themes.

3. **Task Operations:**

    - Fetch tasks from the server.
    - Add new tasks with form validation.
    - Update existing tasks.
    - Delete tasks.
    - Search for tasks using a dynamic search bar.

4. **Reusable Components:**
    - `Card`: Displays individual task details.

---

## API Endpoints

### Task Endpoints

1. **Fetch All Tasks**

    - `GET /tasks`
    - Retrieves a list of all tasks.

2. **Add New Task**

    - `POST /tasks`
    - Creates a new task.
    - Request Body:
        ```json
        {
            "name": "Task Name",
            "description": "Task Description",
            "dueDate": "YYYY-MM-DD",
            "priority": "Low | Medium | High",
            "status": "Pending | In Progress | Completed"
        }
        ```

3. **Update Task**

    - `PATCH /tasks/:id`
    - Updates a task by ID.
    - Request Body:
        ```json
        {
            "name": "Updated Name",
            "description": "Updated Description",
            "dueDate": "YYYY-MM-DD",
            "priority": "Low | Medium | High",
            "status": "Pending | In Progress | Completed"
        }
        ```

4. **Delete Task**

    - `DELETE /tasks/:id`

5. **Search Tasks**
    - `GET /searchtasks?query=<search-value>`
    - Retrieves tasks that match the search query (name or status).

---

## Folder Structure

```
project-root/
├── src/
│   ├── components/
│   │   ├── Card.js
│   │   ├── Home.js
│   │   └── ApiUrl.js
│   ├── index.css
│   ├── index.js
│   └── App.js
```

---

## Usage

1. **View Tasks:**

    - All tasks are displayed on the main screen.

2. **Add New Task:**

    - Click the "+ Add" button to open the task creation form.

3. **Update Task:**

    - Click the "Edit" button on a task card to open the update form.

4. **Delete Task:**

    - Click the "Delete" button on a task card to remove the task.

5. **Search Tasks:**

    - Enter a search term (name or status) and press Enter.

6. **Toggle Theme:**
    - Click the theme toggle button to switch between light and dark modes.

---

## Example Task Object

```json
{
    "name": "Test Task",
    "description": "This is a sample task.",
    "dueDate": "2024-12-31",
    "priority": "High",
    "status": "Pending",
    "id": "12345"
}
```

---

## Notes

-   Ensure the backend API is running and accessible at the specified `ApiUrl`.
-   Handle errors gracefully, as demonstrated in the `fetchTasks` and `searchTask` functions.
-   Adjust styles in `index.css` as needed.

---

## Future Enhancements

-   Add authentication and user-specific task management.
-   Implement advanced filters (e.g., by date, priority).
-   Add drag-and-drop task reordering.
-   Use state management libraries like Redux for larger state handling.

---

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.
