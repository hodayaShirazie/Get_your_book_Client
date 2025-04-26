import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const PasswordRecovery = () => {
    const [username, setUsername] = useState("");
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");

    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate("/home");
    };
    return (
        <div className="background-overlay">
            <div className="login-container">
                <h2>Password Recovery</h2>
                {error && <p className="error-message">{error}</p>}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="form-group">
                        <label>Security Question</label>
                        <select
                            value={securityQuestion}
                            onChange={(e) => setSecurityQuestion(e.target.value)}
                        >
                            <option value="">Select a question</option>
                            <option value="phone">What is your phone number?</option>
                            <option value="email">What is your email address?</option>
                            <option value="food">What is your favorite food?</option>
                            <option value="id">What is your ID number?</option>
                            <option value="name">What is your favorite name?</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Your Answer</label>
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Enter your answer"
                        />
                    </div>

                    <button className="login-button" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordRecovery;
