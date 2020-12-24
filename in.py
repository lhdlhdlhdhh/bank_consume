from faker import Faker
import pymysql
import random

db = pymysql.Connect(
    host='localhost',
    port=3306,
    user='root',
    passwd='root',
    db='flask',
)
cur = db.cursor()

fake = Faker('zh-cn')

types = ['餐饮', '交通', '娱乐', '服装', '家具家电', '日用', '医疗', '电子产品']
moneys = range(0, 100000)
ages = range(18, 71)
sexs = [0, 1]

for i in range(5000):
    cur.execute('insert into userinfo (name, sex, age, money, type) values ("%s", %d, %d, %d, "%s")' % (fake.name(), random.choice(sexs),random.choice(ages),random.choice(moneys),random.choice(types)) )
db.commit()
db.close()
