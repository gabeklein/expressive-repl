import { Row } from 'common/layout/Layout';
import { Document } from 'editor/Document';
import React, { Component, createElement, Fragment } from 'react';

import { InputEditor, OutputJSX } from './Editors';

const Container = ({ parent }) => {
  border: 0x444, 2;
  radius: 10;
  overflow: hidden;

  <this ref={parent} />
}

export const Interface = () => {
  <Row>
    <Input />
    <Output />
    <Preview />
  </Row>
}

const Input = InputEditor.as(Container);
const Output = OutputJSX.as(Container);

const Preview = () => {
  const {
    key,
    error,
    onError,
    Preview
  } = Document.get();

  flex: 1;
  flexAlign: center;
  border: dashed, 2, $borderLight;
  background: $cmBackgroundDark;
  radius: 8;
  position: relative;
  overflow: hidden;
  color: $cmText;

  issue: {
    color: $red;
  }

  <this>
    {error ? (
      <issue>{error}</issue>
    ) : Preview ? (
      <Preview key={key} onError={onError} />
    ) : (
      <issue>Waiting for exports...</issue>
    )}
  </this>
}