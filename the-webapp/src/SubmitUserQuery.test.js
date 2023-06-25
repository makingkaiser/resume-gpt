import '@testing-library/jest-dom';
import React from 'react';
import axios from 'axios';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SubmitUserQuery from './SubmitUserQuery';

jest.mock('axios');

describe('SubmitUserQuery', () => {
  it('should render the component', () => {
    render(<SubmitUserQuery />);
    expect(screen.getByText('OrbitAI Chat')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ask me anything')).toBeInTheDocument();
  });

  it('should send a request to the server when the form is submitted', async () => {
    const query = 'test query';
    const response = { data: { output: 'test response' } };
    axios.post.mockResolvedValueOnce(response);

    render(<SubmitUserQuery />);
    const input = screen.getByPlaceholderText('Ask me anything');
    const button = screen.getByText('Submit');

    fireEvent.change(input, { target: { value: query } });
    fireEvent.click(button);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith('/api/execute-gpt-query/undefined', { input: query });
    //expect(screen.getByText('test response')).toBeInTheDocument();
  });
});