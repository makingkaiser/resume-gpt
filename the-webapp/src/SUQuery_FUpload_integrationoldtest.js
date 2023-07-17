import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import SubmitUserQuery from './SubmitUserQuery';
import FileUpload from './FileUpload';

jest.mock('axios');

describe('SubmitUserQuery component', () => {
  it('should render the component', () => {
    const { getByText, getByPlaceholderText } = render(<SubmitUserQuery />);
    expect(getByText('OrbitAI Chat')).toBeInTheDocument();
    expect(getByPlaceholderText('Ask me anything')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('should submit a user query and receive a response', async () => {
    const { getByPlaceholderText, getByText } = render(<SubmitUserQuery />);
    const input = getByPlaceholderText('Ask me anything');
    const submitButton = getByText('Submit');


    axios.post.mockResolvedValueOnce({
      data: {
        output: 'This is a response',
      },
    });

    fireEvent.change(input, { target: { value: 'This is a query' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/api/execute-gpt-query/undefined', {
        input: 'This is a query',
      });
      expect(getByText('This is a response')).toBeInTheDocument();
    });
  });
});

describe('FileUpload component', () => {
  it('should render the component', () => {
    const { getByText, getByLabelText } = render(<FileUpload />);
    expect(getByText('Upload your PDF file')).toBeInTheDocument();
    expect(getByLabelText('Upload your PDF file')).toBeInTheDocument();
    expect(getByText('Upload')).toBeInTheDocument();
  });

  it('should upload a PDF file and receive a success message', async () => {
    const onNamespaceUpdate = jest.fn();
    const { getByLabelText, getByText } = render(<FileUpload onNamespaceUpdate={onNamespaceUpdate} />);
    const input = getByLabelText('Upload your PDF file');
    const submitButton = getByText('Upload');
  
    const file = new File(['(⌐□_□)'], 'test.pdf', { type: 'application/pdf' });
    const formData = new FormData();
    formData.append('file', file);
  
    axios.post.mockResolvedValueOnce({
      data: {
        namespace: 'test',
      },
    });
  
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/upload/test', expect.any(FormData), {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      expect(onNamespaceUpdate).toHaveBeenCalledTimes(1);
      expect(onNamespaceUpdate).toHaveBeenCalledWith('test');
      expect(getByText('File uploaded successfully! You can now chat with your files.')).toBeInTheDocument();
    });
  });

  it('should display an error message if no file is selected', async () => {
    const { getByText } = render(<FileUpload />);
    const submitButton = getByText('Upload');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).not.toHaveBeenCalled();
      expect(getByText('No file selected')).toBeInTheDocument();
    });
  });

  it('should display an error message if a non-PDF file is selected', async () => {
    const { getByLabelText, getByText } = render(<FileUpload />);
    const input = getByLabelText('Upload your PDF file');
    const submitButton = getByText('Upload');

    const file = new File(['(test)'], 'test.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).not.toHaveBeenCalled();
      expect(getByText('Only PDF files are allowed')).toBeInTheDocument();
    });
  });
});