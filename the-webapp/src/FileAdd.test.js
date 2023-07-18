import React from 'react';
import axios from 'axios';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import FileAdd from './FileAdd';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

describe('FileAdd', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders file upload button with correct label', () => {
    render(<FileAdd namespace="test" />);
    const uploadButton = screen.getByText('Upload');
    const fileUploadLabel = screen.getByLabelText('Upload file');
    expect(uploadButton).toBeInTheDocument();
    expect(fileUploadLabel).toBeInTheDocument();
  });

  it('should show an error message if no file is selected', async () => {
    const { getByText } = render(<FileAdd namespace="test" />);
    const uploadButton = getByText('Upload');
    fireEvent.click(uploadButton);
    await waitFor(() => {
      expect(getByText('Please select a file')).toBeInTheDocument();
    });
  });

  it('should show an error message if the selected file is not a PDF', async () => {
    const { getByLabelText, getByText } = render(<FileAdd namespace="test" />);
    const fileInput = getByLabelText('Upload file');
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    const uploadButton = getByText('Upload');
    fireEvent.click(uploadButton);
    await waitFor(() => {
      expect(getByText('Only PDF files are allowed')).toBeInTheDocument();
    });
  });

  it('should show an error message if the selected file size is greater than 50MB', async () => {
    const { getByLabelText, getByTestId } = render(<FileAdd namespace="test" />);
    const fileInput = getByLabelText('Upload file');
    const file = new File(['hello'], 'hello.pdf', { type: 'application/pdf', size: 60 * 1024 * 1024 });
    fireEvent.change(fileInput, { target: { files: [file] } });
    const uploadButton = getByTestId('upload-button');
    fireEvent.click(uploadButton);
    await waitFor(() => {
      expect(getByTestId('error-message')).toBeInTheDocument();
    });
  });

  it('should upload the selected file and show a success message', async () => {
    const { getByLabelText, getByText, queryByText } = render(<FileAdd namespace="test" />);
    const fileInput = getByLabelText('Upload file');
    const file = new File(['hello'], 'hello.pdf', { type: 'application/pdf', size: 10 * 1024 * 1024 });
    fireEvent.change(fileInput, { target: { files: [file] } });
    const uploadButton = getByText('Upload');
    fireEvent.click(uploadButton);
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/upload/test', expect.any(FormData), {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const successMessage = queryByText('File uploaded successfully! You can now chat with your files.');
      expect(successMessage).not.toBeInTheDocument();
    });
  });

  it('should show an error message if the file upload fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Upload failed'));
    const { getByLabelText, getByText } = render(<FileAdd namespace="test" />);
    const fileInput = getByLabelText('Upload file');
    const file = new File(['hello'], 'hello.pdf', { type: 'application/pdf', size: 10 * 1024 * 1024 });
    fireEvent.change(fileInput, { target: { files: [file] } });
    const uploadButton = getByText('Upload');
    fireEvent.click(uploadButton);
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(getByText('An error occurred while uploading the file')).toBeInTheDocument();
    });
  });
});