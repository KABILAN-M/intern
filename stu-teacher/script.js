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

// Admin module
const adminModule = {
    addTeacher: () => {
        const addTeacherForm = document.getElementById("add-teacher");
        addTeacherForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const department = document.getElementById("department").value;
            const subject = document.getElementById("subject").value;
            firebase.firestore().collection("teachers").add({
                name,
                department,
                subject,
            }).then(() => {
                alert("Teacher added successfully!");
            }).catch((error) => {
                alert("Error adding teacher: " + error.message);
            });
        });
    },
    updateTeacher: () => {
        const updateTeacherForm = document.getElementById("update-teacher");
        updateTeacherForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const department = document.getElementById("department").value;
            const subject = document.getElementById("subject").value;
            firebase.firestore().collection("teachers").doc(name).update({
                department,
                subject,
            }).then(() => {
                alert("Teacher updated successfully!");
            }).catch((error) => {
                alert("Error updating teacher: " + error.message);
            });
        });
    },
    deleteTeacher: () => {
        const deleteTeacherForm = document.getElementById("delete-teacher");
        deleteTeacherForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            firebase.firestore().collection("teachers").doc(name).delete().then(() => {
                alert("Teacher deleted successfully!");
            }).catch((error) => {
                alert("Error deleting teacher: " + error.message);
            });
        });
    },
    approveRegistration: () => {
        const approveRegistrationForm = document.getElementById("approve-registration");
        approveRegistrationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            firebase.firestore().collection("students").doc(name).update({
                approved: true,
            }).then(() => {
                alert("Registration approved successfully!");
            }).catch((error) => {
                alert("Error approving registration: " + error.message);
            });
        });
    },
};

// Teacher module
const teacherModule = {
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
    scheduleAppointment: () => {
        const scheduleAppointmentForm = document.getElementById("schedule-appointment");
        scheduleAppointmentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const studentName = document.getElementById("student-name").value;
            const appointmentDate = document.getElementById("appointment-date").value;
            const appointmentTime = document.getElementById("appointment-time").value;
            firebase.firestore().collection("appointments").add({
                studentName,
                appointmentDate,
                appointmentTime,
            }).then(() => {
                alert("Appointment scheduled successfully!");
            }).catch((error) => {
                alert("Error scheduling appointment: " + error.message);
            });
        });
    },
    approveCancelAppointment: () => {
        const approveCancelAppointmentForm = document.getElementById("approve-cancel-appointment");
        approveCancelAppointmentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const appointmentId = document.getElementById("appointment-id").value;
            firebase.firestore().collection("appointments").doc(appointmentId).update({
                approved: true,
            }).then(() => {
                alert("Appointment approved successfully!");
            }).catch((error) => {
                alert("Error approving appointment: " + error.message);
            });
        });
    },
    viewMessages: () => {
        const viewMessagesForm = document.getElementById("view-messages");
        viewMessagesForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const messagesList = document.getElementById("messages-list");
            firebase.firestore().collection("messages").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const message = doc.data();
                    const messageHTML = `
                        <li>
                            <h3>${message.studentName}</h3>
                            <p>${message.message}</p>
                        </li>
                    `;
                    messagesList.innerHTML += messageHTML;
                });
            });
        });
    },
    viewAllAppointments: () => {
        const viewAllAppointmentsForm = document.getElementById("view-all-appointments");
        viewAllAppointmentsForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const appointmentsList = document.getElementById("appointments-list");
            firebase.firestore().collection("appointments").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const appointment = doc.data();
                    const appointmentHTML = `
                        <li>
                            <h3>${appointment.studentName}</h3>
                            <p>${appointment.appointmentDate}</p>
                            <p>${appointment.appointmentTime}</p>
                        </li>
                    `;
                    appointmentsList.innerHTML += appointmentHTML;
                });
            });
        });
    },
    logout: () => {
        const logoutForm = document.getElementById("logout");
        logoutForm.addEventListener("submit", (e) => {
            e.preventDefault();
            firebase.auth().signOut().then(() => {
                alert("Logged out successfully!");
            }).catch((error) => {
                alert("Error logging out: " + error.message);
            });
        });
    },
};

