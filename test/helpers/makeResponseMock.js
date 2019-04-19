const makeResponseMock = sandbox => ({
  status: sandbox.stub().returnsThis(),
  send: sandbox.stub().returnsThis(),
  json: sandbox.stub().returnsArg(0),
});

export default makeResponseMock;
