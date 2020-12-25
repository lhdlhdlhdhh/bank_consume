import time
import json
import pymysql
from flask import Flask, render_template, url_for
import pandas as pd


def get_dfdata():
    db = pymysql.Connect(
        host='39.97.109.158',
        #host='localhost',
        port=3306,
        user='root',
        passwd='root',
        db='flask',
    )   
    cur = db.cursor()
    cur.execute('select age, sex, money, type from userinfo')
    data = cur.fetchall()
    df = pd.DataFrame(data)
    df.columns = ['age', 'sex', 'money', 'type']
    print(df)
    db.close()
    return df


app = Flask('bank_consume')
dbdf = get_dfdata()
'''总消费 人均各项消费；总消费性别比 各项消费性别比；总消费年龄比 各项消费年龄区间比； '''
# 20%消费金额超过三千的是多少岁的人


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/total_cost', methods=['GET', 'POST'])
def total_cost():
    df = dbdf[['type', 'money']]
    df = df.groupby(by=['type'])['money'].sum()
    res = df.to_json(force_ascii=False)
    data = json.loads(res)
    res_list = []
    for k,v in data.items():
        res_list.append({'name':k, 'value':v})
    res = {'data': res_list}
    return res

@app.route('/average_cost')
def average_cost():
    df = dbdf[['type', 'money']]
    lengh = len(df)
    df = df.groupby(by=['type'])['money'].sum()
    res = df.to_json(force_ascii=False)
    data = json.loads(res)
    res_list = []
    for k,v in data.items():
        res_list.append({'name':k, 'value':v})
    res = {'data': res_list}
    for d in res['data']:
        d['value'] = round(d['value']/lengh)
    print(res)
    return res 


@app.route('/total_sex')
def total_sex():
    df = dbdf[['sex', 'money']]
    df = df.groupby(by=['sex'])['money'].sum()
    res = df.to_json(force_ascii=False)
    res = json.loads(res)
    res['女']=res.pop('0')
    res['男']=res.pop('1')
    return res


@app.route('/types_sex/<type_name>')
def types_sex(type_name):
    df = dbdf[['sex', 'type', 'money']]
    df = df[df['type'] == type_name]
    df = df.groupby(by=['sex'])['money'].sum()
    res = df.to_json(force_ascii=False)
    res = json.loads(res)
    print(res)
    res['女']=res.pop('0')
    res['男']=res.pop('1')
    return res


@app.route('/total_age')
def total_age():
    df = dbdf[['age', 'money']]
    listBins = [18, 20, 30, 40, 50, 60, 70]
    listLabels = ['18_20','21_30','31_40','41_50','51_60','61及以上']
    df['age'] = pd.cut(df['age'], bins=listBins, labels=listLabels, include_lowest=True)
    df = df.groupby(by=['age'])['money'].sum()
    print(df)
    res = df.to_json(force_ascii=False)
    return res


@app.route('/types_age/<type_name>')
def types_age(type_name):
    df = dbdf[['age', 'type', 'money']]
    df = df[df['type'] == type_name]
    listBins = [18, 20, 30, 40, 50, 60, 70]
    listLabels = ['18_20','21_30','31_40','41_50','51_60','61及以上']
    df['age'] = pd.cut(df['age'], bins=listBins, labels=listLabels, include_lowest=True)
    df = df.groupby(by=['age'])['money'].sum()
    print(df)
    res = df.to_json(force_ascii=False)
    return res
