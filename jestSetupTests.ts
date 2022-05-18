import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import {configure} from '@testing-library/react';

configure({
  testIdAttribute: 'data-tn',
});
