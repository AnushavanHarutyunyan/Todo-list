import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Navigation from "./components/Navigation/Navigation";
import Header from "./components/Header/Header";
import Home from "./view/Home/Home";
import Task from "./view/Task";
import Tasks from "./view/Tasks";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Header />
            <Navigation />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/task/:id" element={<Task />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
