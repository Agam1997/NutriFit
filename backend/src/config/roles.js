const allRoles = {
  user: ['getFitnessData', 'manageFitnessData', 'getFitnessRegime', 'manageFitnessRegime', 'getFoods'],
  admin: ['getUsers', 'manageUsers', 'getFoods', 'manageFoods'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
