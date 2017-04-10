import fs from 'fs';
import path from 'path';

export default item => fs.readFileSync(
  (path.isAbsolute(item)) ? item : (path.resolve(process.cwd(), item)), 'utf8');
