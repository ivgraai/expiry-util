import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import Dialog from '../Dialog';
import '../../common/String.extension';

test(`open new dialog, give a message, it will be returned back on close`, () => {
    const { getByTestId } = render(
        <Dialog visible={true} onClose={message => expect(message).toBe('dummy')}></Dialog>
      );
    fireEvent.changeText(
        getByTestId('textInput'),
        'dummy'
      );
    fireEvent.press(getByTestId('button'));
  });
