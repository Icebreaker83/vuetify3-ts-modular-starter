export default {
  security: {
    self: 'Administration',
    users: {
      self: 'User | Users',
      status: {
        1: 'Active',
        2: 'Inactive',
        3: 'Deactivated',
        4: 'Blocked',
      },
      views: {
        list: {
          self: 'Users',
          title: 'Users list',
        },
      },
    },
  },
};
