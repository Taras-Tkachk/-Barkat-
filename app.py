from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)

SERVICES = [
    {"id": 1, "icon": "📱", "name": "Смартфони", "desc": "Заміна екрану, батареї, роз'ємів, відновлення після води", "price": "від 299 грн", "time": "1–3 год"},
    {"id": 2, "icon": "💻", "name": "Ноутбуки", "desc": "Ремонт материнської плати, чищення, заміна клавіатури", "price": "від 499 грн", "time": "1–2 дні"},
    {"id": 3, "icon": "🖥️", "name": "Монітори", "desc": "Ремонт підсвітки, матриці, блоку живлення", "price": "від 399 грн", "time": "1–3 дні"},
    {"id": 4, "icon": "🎮", "name": "Ігрові консолі", "desc": "PS4/PS5, Xbox — ремонт приводу, контролерів, перепайка", "price": "від 349 грн", "time": "1–2 дні"},
    {"id": 5, "icon": "📷", "name": "Фотоапарати", "desc": "Чищення матриці, ремонт затвору, об'єктивів", "price": "від 450 грн", "time": "2–5 днів"},
    {"id": 6, "icon": "⌚", "name": "Смарт-годинники", "desc": "Заміна скла, батареї, ремонт корпусу", "price": "від 199 грн", "time": "1–2 год"},
]

REVIEWS = [
    {"name": "Олексій Коваль", "device": "iPhone 13 Pro", "text": "Замінили екран за 1.5 години. Відмінна якість, гарантія 6 місяців. Рекомендую!", "stars": 5},
    {"name": "Марина Сич", "device": "MacBook Air M1", "text": "Думала, ноут мертвий після кави. Хлопці відновили за день. Ціна адекватна, сервіс топ.", "stars": 5},
    {"name": "Дмитро Руденко", "device": "Samsung Galaxy S22", "text": "Швидко, якісно, з гарантією. Заряд тримає як новий після заміни батареї.", "stars": 5},
    {"name": "Ірина Павленко", "device": "PlayStation 5", "text": "Консоль не читала диски. Полагодили на наступний день. Все чітко!", "stars": 4},
]

@app.route('/')
def index():
    return render_template('index.html', services=SERVICES, reviews=REVIEWS, year=datetime.now().year)

@app.route('/services')
def services():
    return render_template('services.html', services=SERVICES, year=datetime.now().year)

@app.route('/about')
def about():
    return render_template('about.html', year=datetime.now().year)

@app.route('/contact')
def contact():
    return render_template('contact.html', year=datetime.now().year)

@app.route('/api/request', methods=['POST'])
def submit_request():
    data = request.json
    return jsonify({"status": "ok", "message": f"Заявку отримано! Ми зателефонуємо на {data.get('phone')} найближчим часом."})

if __name__ == '__main__':
    app.run(debug=True)
