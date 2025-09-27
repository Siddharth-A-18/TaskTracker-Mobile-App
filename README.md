
# Task Tracker Mobile Application

Application to Add, Edit, Delete and View tasks.

Implemented persistent offline storage using sqlite, redux-toolkit for state management and push notification using firebase.

Developed and tested on windows 11.


## Run Locally

Clone the project

```bash
  git clone https://github.com/Siddharth-A-18/TaskTracker-Mobile-App.git <project name (assume task-tracker)>
```
Go to the project directory

```bash
  cd task-tracker
```

Install dependencies

```bash
  npm install
```

Go to android driectory and run the command

```bash
  cd ./android
  ./gradlew clean
```
Go back to project directory

```bash
  cd ..
```

Create a build and install the app on the device (this command installs and starts the app on windows but on linux machines after installation of the app run command npm start and click on the app icon to start the app)

```bash
  npx react-native run-android
```
Command to run metro server 

```bash
  npm start
```
## Screenshots

### Push Notification 1
![Push Notification 1](https://github.com/Siddharth-A-18/TaskTracker-Mobile-App/blob/main/screenshots/push_notification_foreground.jpg)

### Push Notification 2
![Push Notification 2](https://github.com/Siddharth-A-18/TaskTracker-Mobile-App/blob/main/screenshots/push_notification_message_bg.jpg)

### Task List Screen
![Task List screen](https://github.com/Siddharth-A-18/TaskTracker-Mobile-App/blob/main/screenshots/taskListscreen.jpg)

### Search by task title
![Search by task title](https://github.com/Siddharth-A-18/TaskTracker-Mobile-App/blob/main/screenshots/tasklist_search.jpg)

### Task List with data
![Task List Screen with sample data](https://github.com/Siddharth-A-18/TaskTracker-Mobile-App/blob/main/screenshots/tasklist_sampletask.jpg) 

### Add Task Screen 
![Add Task Screen](https://github.com/Siddharth-A-18/TaskTracker-Mobile-App/blob/main/screenshots/addtaskscreen.jpg)

### Edit/Delete Task Screen
![Edit/Delete Task Screen](https://github.com/Siddharth-A-18/TaskTracker-Mobile-App/blob/main/screenshots/edittaskscreen.jpg)

