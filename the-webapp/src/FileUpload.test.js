import '@testing-library/jest-dom';
import React from 'react';
import axios from 'axios';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FileUpload from './FileUpload';

jest.mock('axios');

describe('FileUpload', () => {
  it('should upload a PDF file and call onNamespaceUpdate', async () => {
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const namespace = 'test';
    const response = { data: { namespace } };
    axios.post.mockResolvedValueOnce(response);

    const onNamespaceUpdate = jest.fn();

    render(<FileUpload onNamespaceUpdate={onNamespaceUpdate} />);
    const input = screen.getByLabelText('Upload your PDF file');
    const button = screen.getByText('Upload');

    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(button);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith(`/upload/${namespace}`, expect.any(FormData), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    expect(onNamespaceUpdate).toHaveBeenCalledWith(namespace);
  });

  it('should not upload a non-PDF file', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });

    const onNamespaceUpdate = jest.fn();

    render(<FileUpload onNamespaceUpdate={onNamespaceUpdate} />);
    const input = screen.getByLabelText('Upload your PDF file');
    const button = screen.getByText('Upload');

    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(button);

    expect(axios.post).not.toHaveBeenCalled();
    expect(onNamespaceUpdate).not.toHaveBeenCalled();
    expect(screen.getByText('Only PDF files are allowed')).toBeInTheDocument();
  });

  it('should not upload a file if none is selected', async () => {
    const onNamespaceUpdate = jest.fn();

    render(<FileUpload onNamespaceUpdate={onNamespaceUpdate} />);
    const button = screen.getByText('Upload');

    fireEvent.click(button);

    expect(axios.post).not.toHaveBeenCalled();
    expect(onNamespaceUpdate).not.toHaveBeenCalled();
    expect(screen.getByText('No file selected')).toBeInTheDocument();
  });
});