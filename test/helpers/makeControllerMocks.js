const makeControllerMocks = sandbox => ({
  '../services/UserService': {
    getUser: sandbox.stub().returns({}),
    getUsers: sandbox.stub().returns([]),
    createUser: sandbox.stub().returns({}),
    updateUser: sandbox.stub().returns({}),
    '@noCallThru': true,
  },
});

export default makeControllerMocks;
