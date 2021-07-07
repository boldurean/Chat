/* eslint-disable import/prefer-default-export */

import path from 'path';
import readPackageJson from 'read-package-json-fast';
import _ from 'lodash';

export const getEntryPointPath = async (projectPath) => {
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageSource = await readPackageJson(packageJsonPath);
  // TODO: find a ready-made solution with normalization
  const main = _.get(packageSource, 'main', 'index.js');
  return path.join(projectPath, main);
};
