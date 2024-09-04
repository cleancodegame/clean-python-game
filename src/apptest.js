import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App'; // Importing your App component

describe('App Component', () => {
  test('renders the App component correctly', () => {
    render(<App />);
    const taskTitle = screen.getByText(/Task 1/); // Checks if Task 1 is displayed
    expect(taskTitle).toBeInTheDocument();
  });

  test('selecting a task updates the code', () => {
    render(<App />);
    const taskTitle = screen.getByText(/Task 1/);
    fireEvent.click(taskTitle);

    const codeSnippet = screen.getByText(/class LongClassName/); // Check if the correct code is displayed
    expect(codeSnippet).toBeInTheDocument();
  });

  test('variable renaming triggers code updates', () => {
    render(<App />);
    const variable = screen.getByText(/x/); // Assuming "x" is one of the variables to rename
    fireEvent.click(variable);

    // After clicking, the variable name should be updated in the code
    expect(screen.getByText(/posX/)).toBeInTheDocument();
  });

  test('terminal shows success message when task is completed', () => {
    render(<App />);
    const variable = screen.getByText(/x/);
    fireEvent.click(variable); // Simulate renaming

    const successMessage = screen.getByText(/Success: All variables have been renamed!/);
    expect(successMessage).toBeInTheDocument();
  });
});
