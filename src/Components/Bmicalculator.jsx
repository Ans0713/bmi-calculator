import React, { useState, useEffect } from 'react';
import './Bmicalculator.css'; // Assuming you will add your CSS styles here

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('bmiHistory')) || [];
    setHistory(storedHistory);
  }, []);

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    const roundedBMI = bmiValue.toFixed(2);
    setBmi(roundedBMI);
    determineStatus(bmiValue);
    saveToHistory(roundedBMI, status);
  };

  const determineStatus = (bmiValue) => {
    if (bmiValue < 18.5) {
      setStatus('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setStatus('Normal weight');
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setStatus('Overweight');
    } else {
      setStatus('Obesity');
    }
  };

  const saveToHistory = (bmiValue, status) => {
    const newRecord = {
      bmi: bmiValue,
      status: status,
      date: new Date().toLocaleDateString(),
    };
    const updatedHistory = [...history, newRecord];
    setHistory(updatedHistory);
    localStorage.setItem('bmiHistory', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('bmiHistory');
  };

  return (
    <div className="bmi-calculator">
      <h1>BMI Calculator</h1>
      <div className="input-group">
        <label htmlFor="height">Height (cm):</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={handleHeightChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="weight">Weight (kg):</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={handleWeightChange}
        />
      </div>
      <button onClick={calculateBMI}>Calculate BMI</button>
      {bmi && (
        <div className="result">
          <p>BMI: {bmi}</p>
          <p>Status: {status}</p>
        </div>
      )}
      {history.length > 0 && (
        <div className="history">
          <h2>History</h2>
          <button onClick={clearHistory}>Clear History</button>
          <ul>
            {history.map((record, index) => (
              <li key={index}>
                <p>Date: {record.date}</p>
                <p>BMI: {record.bmi}</p>
                <p>Status: {record.status}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;


