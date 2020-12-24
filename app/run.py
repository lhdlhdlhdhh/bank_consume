
import pymysql
from flask import Flask


db = pymysql.Connect(
    host='localhost',
    port=3306,
    user='root',
    passwd='root',
    db='flask',
)
cur = db.cursor()


app = Flask('bank_consume')


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/total_cost')
def total_cost():
    # 20%消费金额超过三千的是多少岁的人
    cur.execute('select money, type from userinfo')
    info = cur.fetchall()
    print(info)
    return info



