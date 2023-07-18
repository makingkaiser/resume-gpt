import React from 'react';
import { render, fireEvent, waitFor, getByLabelText, getByText } from '@testing-library/react';
import ChatComponent from './ChatComponent';
import '@testing-library/jest-dom/extend-expect';

describe('ChatComponent', () => {
  it('should render the chat component', () => {
    const { getByText } = render(<ChatComponent namespace="test" />);
    expect(getByText('OrbitAI Chat')).toBeInTheDocument();
  });

  it('should show the meaning of life', async () => {
    const { getByLabelText, getByText } = render(<ChatComponent namespace="test" />);
    const input = getByLabelText('Type your message');
    const submitButton = getByText('Submit');

    fireEvent.change(input, { target: { value: 'What is the meaning of life?' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Thinking...')).toBeInTheDocument();
    });

    await waitFor(() => {
      const textMatcher = (content, element) => {
        const hasText = (node) => node.textContent === content;
        const nodeHasText = hasText(element);
        const childrenHaveText = Array.from(element.children).some(hasText);
        return nodeHasText || childrenHaveText;
      };
      expect(getByText('The meaning of life is 42.', { matcher: textMatcher })).toBeInTheDocument();
    });
  });
});