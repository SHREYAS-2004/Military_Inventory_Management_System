import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"


const GenerateReport = () => {
    const [views, setViews] = useState([]);
    const navigate = useNavigate()

    // Function to trigger report generation based on the button pressed
    const generateReport = async (type) => {
        let apiUrl;
        let requestBody = {};

        // Collect necessary data based on the report type
        if (type === 'day') {
            const date = prompt("Enter the date (YYYY-MM-DD):");
            if (!date) return alert("Date is required.");
            requestBody = { date };
            apiUrl = 'http://localhost:3000/manager/generate-view/day';
        } else if (type === 'week') {
            const startDate = prompt("Enter the start date of the week (YYYY-MM-DD):");
            if (!startDate) return alert("Start date is required.");
            requestBody = { startDate };
            apiUrl = 'http://localhost:3000/manager/generate-view/week';
        } else if (type === 'month') {
            const year = prompt("Enter the year (YYYY):");
            const month = prompt("Enter the month (MM):");
            if (!year || !month) return alert("Year and month are required.");
            requestBody = { year, month };
            apiUrl = 'http://localhost:3000/manager/generate-view/month';
        } else if (type === 'year') {
            const year = prompt("Enter the year (YYYY):");
            if (!year) return alert("Year is required.");
            requestBody = { year };
            apiUrl = 'http://localhost:3000/manager/generate-view/year';
        }

        // Call the backend to generate the report
        try {
            const response = await axios.post(apiUrl, requestBody);
            alert(response.data.message);
            loadGeneratedViews(); // Reload views after generating the report
        } catch (error) {
            console.error('Error generating report:', error);
            alert('An error occurred while generating the report.');
        }
    };

    // Function to load and display all the generated views
    const loadGeneratedViews = async () => {
        try {
            const response = await axios.get('http://localhost:3000/manager/generated-views');
            setViews(response.data);
        } catch (error) {
            console.error('Error loading views:', error);
            alert('Failed to load generated views.');
        }
    };

    // Function to view the data from a specific generated view
    const viewReport = (viewName) => {
        navigate("/manager/viewreport",{state : viewName})
    };

    // Load generated views when the component is mounted
    useEffect(() => {
        loadGeneratedViews();
    }, []);

    return (
        <div>
            <h1>Generate Order Reports</h1>

            <div className="button-container" style={{ marginBottom: '20px' }}>
                <button onClick={() => generateReport('day')} style={buttonStyle}>
                    Generate Daily Report
                </button>
                <button onClick={() => generateReport('week')} style={buttonStyle}>
                    Generate Weekly Report
                </button>
                <button onClick={() => generateReport('month')} style={buttonStyle}>
                    Generate Monthly Report
                </button>
                <button onClick={() => generateReport('year')} style={buttonStyle}>
                    Generate Yearly Report
                </button>
            </div>

            <div id="views-container" style={{ marginTop: '20px' }}>
                <h2>Existing Views</h2>
                {views.length === 0 ? (
                    <p>No views generated yet.</p>
                ) : (
                    views.map((view) => (

                        <div key={view.view_name} className="view" style={viewStyle}>
                            <strong>{view.view_name}</strong> (Generated on {view.created_at})
                            <button onClick={() => viewReport(view.view_name)} style={buttonStyle}>
                                View
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

// Styles
const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    cursor: 'pointer',
    fontSize: '16px',
};

const viewStyle = {
    margin: '5px 0',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    border: '1px solid #ccc',
};

export default GenerateReport;
