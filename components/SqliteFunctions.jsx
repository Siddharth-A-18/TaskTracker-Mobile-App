import SQLite from 'react-native-sqlite-storage';

// Enable SQLite debugging if needed
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'Task.db'; // Database name
const database_version = '1.0'; // Database version
const database_displayname = 'SQLite Task Data';
const database_size = 200000; // Database size in bytes

let db;


// Function to initialize the database
export const initDB = async () => {
  try {
    db = await SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size,
    );
    console.log('Database opened successfully');

    await createTables(); // Create necessary tables

    return db;
  } catch (error) {
    console.error('Error opening database:', error);
    throw error; // Re-throw error for handling at call site
  }
};

// Function to create table
const createTables = async () => {
  try {
    await db.executeSql(
      `CREATE TABLE IF NOT EXISTS task (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        updatedAt TEXT NOT NULL
      );`,
    );

    console.log('Tables created or updated successfully');
  } catch (error) {
    console.error('Error creating or updating tables:', error);
  }
};


// Function to get task title and updatedAt
export const getAllTasks = async () => {
  try {
    if (!db) {
      console.error('Database not initialized.');
      return [];
    }

    const [taskDetails] = await db.executeSql(`SELECT * FROM task`);

    const tasks = [];
    for (let i = 0; i < taskDetails.rows.length; i++) {
      tasks.push(taskDetails.rows.item(i));
    }
    // Return the array of users
    return tasks;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// Function to get all details of a task by id
export const getTaskDetails = async (id) => {
  try {
    if (!db) {
      console.error('Database not initialized.');
      return [];
    }

    // Use parameterized query to safely pass the id
    const [taskDetails] = await db.executeSql(
      `SELECT id,title,description FROM task WHERE id = ?`,
      [id]
    );

    const tasks = [];
    for (let i = 0; i < taskDetails.rows.length; i++) {
      tasks.push(taskDetails.rows.item(i));
    }

    return tasks;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};



// Function to insert task details into the task table
export const insertTask = async taskDetails => {
  try {
    if (!db) {
      console.error('Database not initialized.');
      return;
    }

    const {
      title,
      description,
      updatedAt
    } = taskDetails;

    await db.executeSql(
      `INSERT INTO task (title, description,updatedAt)
       VALUES (?, ?, ?)`,
      [
        title,
        description,
        updatedAt
      ],
    );

    console.log('task inserted successfully');
  } catch (error) {
    console.error('Error inserting task', error);
  }
};


// Delete task based on title
export const deleteTask = async id => {
  try {
    if (!db) {
      console.error('Database not initialized.');
      return;
    }

    await db.executeSql(
      `DELETE FROM task WHERE id = ?`,
      [id]
    );

    console.log(`Task with id "${id}" deleted successfully`);
  } catch (error) {
    console.error('Error deleting task', error);
  }
};


// Function to update task
export const updateTask = async (id, updatedDetails) => {
  try {
    if (!db) {
      console.error('Database not initialized.');
      return;
    }

    const { title, description, updatedAt } = updatedDetails;

    await db.executeSql(
      `UPDATE task SET title = ?, description = ?, updatedAt = ? WHERE id = ?`,
      [title, description, updatedAt, id]
    );
    console.log(`Task with id "${id}" updated successfully`);
  } catch (error) {
    console.error('Error updating task', error);
  }
};
