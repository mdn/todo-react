import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

const DATA = [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false }
  ];

test('Test page title', () => {
  const { getByText } = render(<App tasks={DATA}/>);
  const linkElement = getByText(/What needs to be done?/i);
  expect(linkElement).toBeInTheDocument();
});

test('Test All tab presence', () => {
    const { getByTestId, getByText } = render(<App tasks={DATA}/>);
    const linkElement = getByTestId(/^All$/i);
    expect(linkElement).toBeInTheDocument();
    expect(getByText("3 tasks remaining")).toBeInTheDocument();
});

test('Test Active tab presence', () => {
    const { getByTestId, getByText } = render(<App tasks={DATA}/>);
    const linkElement = getByTestId(/^Active$/i);
    expect(linkElement).toBeInTheDocument();
    userEvent.click(linkElement);
    expect(getByText("2 tasks remaining")).toBeInTheDocument();
});

test('Test Completed tab presence', () => {
    const { getByTestId, getByText } = render(<App tasks={DATA}/>);
    const linkElement = getByTestId(/^Completed$/i);
    expect(linkElement).toBeInTheDocument();
    userEvent.click(linkElement);
    expect(getByText("1 task remaining")).toBeInTheDocument();
});