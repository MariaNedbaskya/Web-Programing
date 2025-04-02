const { fetchData } = require('./src/modules/fetchModule');
const { sortStringsIgnoringSpaces } = require('./src/modules/sortModule');
const fs = require('./src/modules/fsModule');

async function main() {
  const usersResponse = await fetchData('https://jsonplaceholder.typicode.com/users');
  
  if (usersResponse.error) {
    console.error('Error fetching users:', usersResponse.error);
    return;
  }

  const users = usersResponse.data;
  const names = users.map(user => user.name);
  const sortedNames = sortStringsIgnoringSpaces(names);
  console.log('Отсортированные имена:', sortedNames);
  const usersDir = './users';

  await fs.createDirectory(usersDir);
  
  const namesContent = sortedNames.join('\n');
  await fs.createFile(path.join(usersDir, 'names.txt'), namesContent);

  const emails = users.map(user => user.email).join('\n');
  await fs.createFile(path.join(usersDir, 'emails.txt'), emails);
  
  console.log('Файлы успешно созданы и заполнены');
}

main().catch(console.error);