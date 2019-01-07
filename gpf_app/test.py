from flask import Flask,render_template, request, url_for, jsonify
import os
import json
import sys
import subprocess
import re
import pprint
import time

app = Flask(__name__)
# app.config['SECRET_KEY'] = "dfdfdffdad"

@app.route('/')
def index():
    return render_template('1.html')



@app.route('/upload/dat', methods=['POST'])#功能1 读取dat,保存为filelist.json,需要一个filelist.json文件
def read_dat_func():
    #检查是否有同名文件存在，删掉
    file_list={}
    uploaded_files = request.files.getlist('myfile')
    workspace=os.getcwd()
    path=os.path.join(workspace,"1.dat")
    uploaded_files[0].save(path)
    # file_list[uploaded_files]=path
    print(path)
    file_list["filelist"]=path
    path=os.path.join(workspace,"filelist.json")
    with open (path,"w") as f:
        json.dump(file_list,f)
    return render_template("1.html")


@app.route('/upload/dcm', methods=['POST'])#功能1 读取dcm
def read_dcm_func():
    #检查是否有同名文件存在，删掉
    #接受文件，从指定目录读取文件
    dcm_names_dict={}
    workspace=os.getcwd()
    uploaded_files2 = request.files.getlist('myfile2')
    n=0
    for dat_file in uploaded_files2 :
        datname=str(n)+".DCM"
        path=os.path.join(workspace,datname)
        dat_file.save(path)
        dcm_names_dict[datname]=path
        n=n+1
    dcm_dicts={}
    for key in dcm_names_dict.keys():
        dcm_name=dcm_names_dict[key]
        print(dcm_name)
        dcm_dict=read_DCM(dcm_name)
        dcm_dicts.update(dcm_dict)
    pprint.pprint(dcm_dicts)
    # return jsonify(dcm_dicts)
    return jsonify({"calis": dcm_dicts})
    # return render_template("1.html", dict2=json.dumps(dcm_dicts))

def read_DCM(dcm_file):
    this_dcm={}
    with open(dcm_file,'rb') as t:
        tt=t.read()
        tt=str(tt, encoding='gbk')
        matchObj  =re.findall( 'FESTWERT[\s\S]*?END',tt)
        if matchObj:
            for part in matchObj:
                lines=re.split("\n",part)
                if lines[0]:
                    words=re.split("\s+",lines[0])
                    name=words[1]
                if lines[-2]:
                    words=re.split("\s+",lines[-2])
                    value=words[2]
                this_dcm[name]=eval(value)
    with open(dcm_file,'rb') as t:
        tt=t.read()
        tt=str(tt, encoding='gbk')
        matchObj  =re.findall( 'KENNLINIE[\S\s]*?END',tt)
        if matchObj:
            for part in matchObj:
                X=[]
                Z=[]
                lines=re.split("\n",part)
                if lines[0]:
                    words=re.split("\s+",lines[0])
                    name=words[1]
                for line in lines:
                    words=re.split("\s+",line)
                    if(len(words)>1):
                        if("ST" in words[1]):
                            for x in words[2:len(words)-1]:
                                X.append(eval(x))
                        if(words[1]=="WERT"):
                            for z in words[2:len(words)-1]:
                                Z.append(eval(z))
                curve={}
                curve['x']=X
                curve['z']=Z
                this_dcm[name]=curve
    return this_dcm


@app.route('/upload/simulation', methods=['POST'])#功能3 计算触发
def read_simulation_func():
    workspace=os.getcwd()
    flg_ok = os.path.exists(os.path.join(workspace,'saveGPF.json'))
    if(flg_ok):
        os.remove(os.path.join(workspace,'saveGPF.json'))
    get_bytes=request.get_data()
    _str = str(get_bytes, encoding='utf-8')
    _dict = json.loads(_str)#标定字典
    path=os.path.join(workspace,"filelist.json")
    with open (path,"r") as f:
         datfile=json.load(f)
    _dict.update(datfile)
    path=os.path.join(workspace,"calibrations.json")
    print(path)
    with open (path,"w") as f:
        json.dump(_dict,f)
    path=os.path.join(workspace,'start.bat')
    
    p=subprocess.call(path, shell=True)
    
    flg_ok = False
    timeoutCounter = 0
    
    while (flg_ok==False or timeoutCounter<30):
        flg_ok = os.path.exists(os.path.join(workspace,'saveGPF.json'))
        timeoutCounter = timeoutCounter+1
        time.sleep(1)
        print("waiting for cal finish..")
        print(flg_ok)
        if (flg_ok):
            break
    
    path=os.path.join(workspace,'saveGPF.json')
    with open (path,"r") as f:
         painting=json.load(f)
    return jsonify(painting)

if __name__ == '__main__':
    app.run()