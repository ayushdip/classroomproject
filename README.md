# Online Classroom Project

This project provides an online learning solution where teachers can form an online classroom and add students. The teacher can then add study materials and assignments for students. The people involved in the group can comment on each post. Right now the app doesn't provide functionality for students to upload their solved assignments for grading purposes. Also video class feature is also not available right now.

[App Link](https://classroomproject-fe770.web.app/)
## Tools Used

React.js, Firebase, Material UI, Firestore Database

## Authentication

For authentication the app uses Google Authentication. So any user with a valid google account will be able to login to the app and join or create classes

## Joining/Creating Classes

Once the users are authenticated they can join or create a class. When a user logs in to the app they can click on + icon on navbar. They can then create a class on their own or join an existing classs. For joining a class they need to ask the teacher for a classroom code. Once they enter the classroom code the app checks for existing class and adds the user to the corresponding class if the class exists.

## Classroom Features

### Stream Page

Each user who is a part of a particular class can create posts and comment on existing posts. All the posts,assignments,study material created are available on the stream page of the classroom.

### Classwork Page

The classwork page appears differently for teachers and students. For teachers an extra functionality is provided to add study materials and assignments. Both teachers and students can see study materials and assignments. Clicking on each item opens the class material and assignments.

### People Page

This page shows information of all people who are added to the particular classroom.

### Future Scope

Right now the students can't submit the assignments and grading feature is not available to teachers. Also feature for video classes is not available right now. Comming soon !