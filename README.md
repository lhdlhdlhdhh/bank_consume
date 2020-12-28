# bank_consume
## 题目：基于银行卡消费业务大数据用户画像系统的设计与实现 

目录
各个文件用途：
.
├── README.md           # 使用说明
├── app                 # 整体项目代码文件夹
│   ├── run.py          # flask后端app文件
│   ├── static          # 使用到的静态文件文件夹
│   │   ├── css         # css样式文件夹
│   │   │   └── index.css
│   │   ├── img         # img图片文件夹
│   │   │   ├── bg.png
│   │   │   ├── down.png
│   │   │   ├── t_bg.png
│   │   │   ├── t_border.png
│   │   │   ├── t_header.png
│   │   │   └── top.png
│   │   └── js          # js文件夹
│   │       ├── echarts.min.js
│   │       ├── index.js
│   │       ├── jquery-2.2.1.min.js
│   │       └── rem.js
│   └── templates       # html页面文件夹
│       └── index.html
├── faker_data.py       # 生成假数据文件
├── flask.sql           # 数据库sql文件
└── requirements.txt    # pip三方包

1.安装python >= 3.6;安装好mysql和navicat，导入flask.sql文件
2.使用豆瓣源安装三方包：pip3 install -r requirements.txt -i https://pypi.doubanio.com/simple/
3.进入到app文件夹下(确保 ls  可以看到run.py)打开终端准备启动程序：
    linux:
        export FLASK_APP=run.py
        python3 -m flask run
    windows:
        在 Command Prompt 下:
            set FLASK_APP=run.py
            python3 -m flask run
        在 PowerShell 下:
            $env:FLASK_APP = "hello.py"
            python3 -m flask run

访问http://localhost:5000/
