document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Пароли не совпадают');
        return;
    }

    if (/\s/.test(login) || /\s/.test(password)) {
        alert('Логин и пароль не должны содержать пробелы');
        return;
    }

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Регистрация прошла успешно!');
    })
    .catch((error) => {
        console.error('Ошибка:', error);
    });
});