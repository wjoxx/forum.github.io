let forumPosts = JSON.parse(localStorage.getItem('forumPosts')) || [
    {
        id: 1,
        title: 'Какой язык программирования учить первым?',
        content: 'Хочу начать изучать программирование. Посоветуйте, с какого языка лучше начать? Python, JavaScript или может быть Java?',
        author: 'Новичок',
        category: 'programming',
        date: '2025-10-20T10:30:00',
        comments: [
            {
                author: 'Олег',
                content: 'Начни с Python - у него простой синтаксис и много возможностей.',
                date: '2025-10-20T11:45:00'
            },
            {
                author: 'Елена',
                content: 'Если интересует веб - тогда JavaScript. Для общего развития - Python.',
                date: '2025-10-20T12:20:00'
            }
        ]
    },
    {
        id: 2,
        title: 'Проблема с версткой на мобильных',
        content: 'Сайт нормально выглядит на компьютере, но на телефоне все едет. Как правильно делать адаптивную верстку?',
        author: 'Верстальщик',
        category: 'web',
        date: '2025-10-19T14:15:00',
        comments: []
    },
    {
        id: 3,
        title: 'Какая IDE лучше для Java?',
        content: 'Работаю с Java. Intellij IDEA или Eclipse? Что выбрать и почему?',
        author: 'Java-разработчик',
        category: 'tools',
        date: '2025-10-18T09:45:00',
        comments: []
    },
    {
        id: 4,
        title: 'SQL или NoSQL для нового проекта?',
        content: 'Начинаю новый проект. Не могу определиться с базой данных. Что посоветуете?',
        author: 'Евгений',
        category: 'database',
        date: '2025-10-17T16:20:00',
        comments: [
            {
                author: 'Дмитрий',
                content: 'Зависит от структуры данных. Если данные структурированы - SQL, если нет - NoSQL.',
                date: '2025-10-17T17:05:00'
            }
        ]
    },
    {
        id: 5,
        title: 'Как научить Telegram-бота на Python не терять задачи пользователей при перезапуске?',
        content: 'Разрабатываю Telegram-бота на Python с использованием python-telegram-bot. Проблема в том, что при перезапуске бота все задачи пользователей сбрасываются. Как правильно организовать сохранение состояния? ',
        author: 'Разработчик ботов',
        category: 'programming',
        date: '2025-10-16T13:10:00',
        comments: [
            {
                author: 'Михаил',
                content: 'Для начала используй SQLite - это легкая база данных, которая отлично подходит для небольших ботов. Создай таблицу для хранения задач пользователей с полями: user_id, task_data, created_at.',
                date: '2025-10-16T14:25:00'
            },
            {
                author: 'Дарья',
                content: []
                date: '2025-10-16T15:40:00'
            }
        ]
    }
];

// Сохранение данных в localStorage
function savePosts() {
    localStorage.setItem('forumPosts', JSON.stringify(forumPosts));
}

// Отображение секций
function showSection(sectionName) {
    // Скрыть все секции
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Убрать активный класс со всех вкладок
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Показать выбранную секцию
    document.getElementById(`${sectionName}-section`).classList.add('active');
    
    // Активировать соответствующую вкладку
    event.target.classList.add('active');
    
    // Загрузить данные если необходимо
    if (sectionName === 'home') {
        loadAllPosts();
    }
}

// Форматирование даты
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'только что';
    if (diffMins < 60) return `${diffMins} мин. назад`;
    if (diffHours < 24) return `${diffHours} ч. назад`;
    if (diffDays < 7) return `${diffDays} дн. назад`;
    
    return date.toLocaleDateString('ru-RU');
}

// Получение названия категории
function getCategoryName(category) {
    const categories = {
        'web': 'Веб-разработка',
        'mobile': 'Мобильная разработка',
        'database': 'Базы данных',
        'programming': 'Программирование',
        'tools': 'Инструменты',
        'other': 'Другое'
    };
    return categories[category] || 'Другое';
}

// Загрузка всех постов
function loadAllPosts(posts = forumPosts) {
    const container = document.getElementById('all-posts');
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (sortedPosts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i>💬</i>
                <h3>Пока нет постов</h3>
                <p>Будьте первым, кто создаст обсуждение на форуме!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = sortedPosts.map(post => `
        <div class="post-card">
            <div class="post-header">
                <span class="post-author">${post.author || 'Аноним'}</span>
                <span class="post-date">${formatDate(post.date)}</span>
            </div>
            <h3 class="post-title">${post.title}</h3>
            <div class="post-content">${post.content}</div>
            <div class="post-meta">
                <span class="post-category">${getCategoryName(post.category)}</span>
                <div class="post-actions">
                    <button class="btn btn-outline" onclick="viewPost(${post.id})">
                        💬 Комментарии (${post.comments.length})
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Просмотр поста
function viewPost(postId) {
    const post = forumPosts.find(p => p.id === postId);
    if (!post) return;
    
    // Создаем модальное окно для просмотра поста
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">${post.title}</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
            </div>
            
            <div class="post-card">
                <div class="post-header">
                    <span class="post-author">${post.author || 'Аноним'}</span>
                    <span class="post-date">${formatDate(post.date)}</span>
                </div>
                <div class="post-content">${post.content}</div>
                <div class="post-meta">
                    <span class="post-category">${getCategoryName(post.category)}</span>
                </div>
            </div>
            
            <div class="comments-section">
                <h3 class="section-title">Комментарии (${post.comments.length})</h3>
                
                ${post.comments.length === 0 ? `
                    <div class="empty-state">
                        <p>Пока нет комментариев. Будьте первым!</p>
                    </div>
                ` : post.comments.map(comment => `
                    <div class="comment-card">
                        <div class="comment-header">
                            <span class="comment-author">${comment.author || 'Аноним'}</span>
                            <span class="comment-date">${formatDate(comment.date)}</span>
                        </div>
                        <div>${comment.content}</div>
                    </div>
                `).join('')}
                
                <div class="form-container" style="margin-top: 20px;">
                    <h4>Добавить комментарий</h4>
                    <div class="form-group">
                        <textarea class="form-control" id="comment-content" placeholder="Ваш комментарий..."></textarea>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" id="comment-author" placeholder="Ваше имя (необязательно)">
                    </div>
                    <button class="btn btn-primary" onclick="addComment(${post.id})">Отправить комментарий</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Добавление комментария
function addComment(postId) {
    const content = document.getElementById('comment-content').value.trim();
    const author = document.getElementById('comment-author').value.trim();
    
    if (!content) {
        alert('Пожалуйста, введите текст комментария');
        return;
    }
    
    const post = forumPosts.find(p => p.id === postId);
    if (!post) return;
    
    post.comments.push({
        author: author || 'Аноним',
        content: content,
        date: new Date().toISOString()
    });
    
    savePosts();
    
    // Закрываем модальное окно и открываем заново для обновления
    document.querySelector('.modal').remove();
    viewPost(postId);
}

// Создание нового поста
function createPost() {
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
    const author = document.getElementById('post-author').value.trim();
    const category = document.getElementById('post-category').value;
    
    if (!title || !content) {
        alert('Пожалуйста, заполните заголовок и содержание поста');
        return;
    }
    
    const newPost = {
        id: forumPosts.length > 0 ? Math.max(...forumPosts.map(p => p.id)) + 1 : 1,
        title: title,
        content: content,
        author: author || 'Аноним',
        category: category,
        date: new Date().toISOString(),
        comments: []
    };
    
    forumPosts.push(newPost);
    savePosts();
    
    // Очистка формы
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
    document.getElementById('post-author').value = '';
    
    alert('Пост успешно опубликован!');
    showSection('home');
}

// Поиск постов
function setupSearch() {
    const searchInput = document.getElementById('search-posts');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            if (searchTerm === '') {
                loadAllPosts();
                return;
            }
            
            const filteredPosts = forumPosts.filter(post => 
                post.title.toLowerCase().includes(searchTerm) || 
                post.content.toLowerCase().includes(searchTerm) ||
                post.author.toLowerCase().includes(searchTerm) ||
                getCategoryName(post.category).toLowerCase().includes(searchTerm)
            );
            
            loadAllPosts(filteredPosts);
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadAllPosts();
    setupSearch();
});
