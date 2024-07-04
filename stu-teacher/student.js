// Student module
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBz5uISK0r-zvkYP8BspC_5KJR890hWfg0",
  authDomain: "student-teacher-12f18.firebaseapp.com",
  projectId: "student-teacher-12f18",
  storageBucket: "student-teacher-12f18.appspot.com",
  messagingSenderId: "403508922903",
  appId: "1:403508922903:web:56157d0fa65ffbd425ea52",
  measurementId: "G-JWJLH1HG2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const studentModule = {
    register: () => {
        const registerForm = document.getElementById("register");
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
                user.updateProfile({
                    displayName: name,
                });
                alert("Registered successfully!");
            }).catch((error) => {
                alert("Error registering: " + error.message);
            });
        });
    },
    login: () => {
        const loginForm = document.getElementById("login");
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
                alert("Logged in successfully!");
            }).catch((error) => {
                alert("Error logging in: " + error.message);
            });
        });
    },
    searchTeacher: () => {
        const searchTeacherForm = document.getElementById("search-teacher");
        searchTeacherForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const teacherName = document.getElementById("teacher-name").value;
            firebase.firestore().collection("teachers").where("name", "==", teacherName).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const teacher = doc.data();
                    const teacherHTML = `
                        <h2>${teacher.name}</h2>
                        <p>${teacher.department}</p>
                        <p>${teacher.subject}</p>
                    `;
                    document.getElementById("teacher-info").innerHTML = teacherHTML;
                });
            });
        });
    },
    bookAppointment: () => {
        const bookAppointmentForm = document.getElementById("book-appointment");
        bookAppointmentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const teacherName = document.getElementById("teacher-name").value;
            const appointmentDate = document.getElementById("appointment-date").value;
            const appointmentTime = document.getElementById("appointment-time").value;
            firebase.firestore().collection("appointments").add({
                studentName: firebase.auth().currentUser.displayName,
                teacherName,
                appointmentDate,
                appointmentTime,
            }).then
        });
    },
};