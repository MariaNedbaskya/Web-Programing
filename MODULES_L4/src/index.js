require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const bcrypt = require('bcrypt');
const saltRounds = 10;

console.log(`Текущий режим работы: ${process.env.MODE}`);

const passwords = [
  'password1', 'securePass123', 'qwerty', 
  'admin123', 'letmein', 'football', 
  'iloveyou', 'welcome', 'sunshine', 
  'dragon', 'password123', '123456', 
  'monkey'
];

async function hashPasswords() {
  for (const [index, password] of passwords.entries()) {
    const startTime = Date.now();
    const hash = await bcrypt.hash(password, saltRounds);
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log(`Пароль ${index + 1}: '${password}'`);
    console.log(`Хеш: ${hash}`);
    console.log(`Время шифрования: ${duration} мс\n`);
  }

  console.log('Вывод о времени:');
  console.log('Время шифрования зависит от сложности пароля, saltRounds и производительности системы.');
  console.log('Более сложные пароли и большее количество saltRounds увеличивают время хеширования.');
  console.log('Первые хеши могут занимать больше времени из-за "прогрева" модуля bcrypt.');
}

hashPasswords();