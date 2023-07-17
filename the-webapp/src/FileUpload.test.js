import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import FileUpload from './FileUpload';
import '@testing-library/jest-dom/extend-expect'
jest.mock('axios');

describe('FileUpload', () => {
  test('uploads a file successfully', async () => {
    const { getByLabelText } = render(<FileUpload />);
    const fileInput = getByLabelText('Upload a file...');

    const file = new File(['(⌐□_□)'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files[0]).toStrictEqual(file);
  });

  test('should update file state when a file is selected', async () => {
    const { getByLabelText } = render(<FileUpload />);
    const fileInput = getByLabelText('Upload a file...');

    const file = new File(['(⌐□_□)'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files[0]).toStrictEqual(file);
  });

  test('should set file state to null when no file is selected', async () => {
    const { getByLabelText } = render(<FileUpload />);
    const fileInput = getByLabelText('Upload a file...');

    fireEvent.change(fileInput, { target: { files: [] } });

    expect(fileInput.files[0]).toBeUndefined();
  });

  test('should update label state with the name of the selected file', async () => {
    const { getByLabelText } = render(<FileUpload />);
    const fileInput = getByLabelText('Upload a file...');

    const file = new File(['(⌐□_□)'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [file] } });
  });

  test('should set label state to "Upload a file..." when no file is selected', async () => {
    const { getByLabelText } = render(<FileUpload />);
    const fileInput = getByLabelText('Upload a file...');

    fireEvent.change(fileInput, { target: { files: [] } });

    const label = getByLabelText('Upload a file...');
    expect(label.textContent).toBe('');
  });

  test('should update namespace state when a namespace is entered', async () => {
    const { getByPlaceholderText } = render(<FileUpload />);
    const namespaceInput = getByPlaceholderText('Enter an existing namespace...');

    fireEvent.change(namespaceInput, { target: { value: 'my-namespace' } });

    expect(namespaceInput.value).toBe('my-namespace');
  });

  test('should set namespace state to an empty string when no namespace is entered', async () => {
    const { getByPlaceholderText } = render(<FileUpload />);
    const namespaceInput = getByPlaceholderText('Enter an existing namespace...');

    fireEvent.change(namespaceInput, { target: { value: '' } });

    expect(namespaceInput.value).toBe('');
  });

  test('should submit namespace successfully', async () => {
    const onNamespaceUpdate = jest.fn();
    const { getByPlaceholderText, getByText } = render(<FileUpload onNamespaceUpdate={onNamespaceUpdate} />);
    const namespaceInput = getByPlaceholderText('Enter an existing namespace...');
    const submitButton = getByText('Start!');

    fireEvent.change(namespaceInput, { target: { value: 'my-namespace' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith('/namespacevalidity/my-namespace');
  });

  test('should show error message for invalid namespace', async () => {
    axios.post.mockRejectedValueOnce(new Error('Namespace already exists'));
    const { getByPlaceholderText, getByText, findByText } = render(<FileUpload />);
    const namespaceInput = getByPlaceholderText('Enter an existing namespace...');
    const submitButton = getByText('Start!');

    fireEvent.change(namespaceInput, { target: { value: 'invalid-namespace' } });
    fireEvent.click(submitButton);

    const errorMessage = await findByText('An error occurred while checking the namespace validity');
    expect(errorMessage).toBeInTheDocument('');
  });
});