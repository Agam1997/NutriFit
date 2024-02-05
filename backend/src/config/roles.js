const allRoles = {
  user: [
    'getFitnessData',
    'manageFitnessData',
    'getFitnessRegime',
    'manageFitnessRegime',
    'getFoods',
    'getCategory',
    'getSubCategory',
  ],
  admin: [
    'getUsers',
    'manageUsers',
    'getFoods',
    'manageFoods',
    'getCategory',
    'manageCategory',
    'getSubCategory',
    'manageSubCategory',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
