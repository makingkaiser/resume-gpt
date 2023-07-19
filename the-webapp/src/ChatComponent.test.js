import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ChatComponent from './ChatComponent';
import '@testing-library/jest-dom/extend-expect'
jest.mock('axios');

describe('ChatComponent', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without errors', () => {
    const { getByText } = render(<ChatComponent />);
    expect(getByText('OrbitAI Chat')).toBeInTheDocument();
  });

  it('disables submit button when user query is empty', () => {
    const { getByLabelText, getByText } = render(<ChatComponent />);
    const input = getByLabelText('Type your message');
    const submitButton = getByText('Submit');

    expect(submitButton).toBeDisabled();

    fireEvent.change(input, { target: { value: 'Hello' } });

    expect(submitButton).toBeEnabled();

    fireEvent.change(input, { target: { value: '' } });

    expect(submitButton).toBeDisabled();
  });

  it('sends user query to server and displays response', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({ status: 200, data: { output: 'Hello, world!' } }));
    axios.post.mockImplementationOnce(() => Promise.resolve({ status: 200, data: { output: 'Here are some questions I can answer: What is the main topic of the document? Who is the intended audience? What are the key takeaways?' } }));

    const { getByLabelText, getByText } = render(<ChatComponent />);
    const input = getByLabelText('Type your message');
    const submitButton = getByText('Submit');

    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(submitButton);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/api/execute-gpt-query/undefined', {
      input: 'Hello',
    });

    await waitFor(() => {
      expect(getByText('Thinking...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByText('Hello, world!')).toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: 'What is the main topic of the document?' } });
    fireEvent.click(submitButton);

    expect(axios.post).toHaveBeenCalledTimes(2);
    expect(axios.post).toHaveBeenCalledWith('/api/execute-gpt-query/undefined', {
      input: 'What is the main topic of the document?',
    });

    await waitFor(() => {
      expect(getByText('Thinking...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByText('Here are some questions I can answer: What is the main topic of the document? Who is the intended audience? What are the key takeaways?')).toBeInTheDocument();
    });
  });
});