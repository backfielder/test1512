import pickle
import json
import sys
import os
import _thread
import numpy as np
from datetime import datetime
import time
import datetime
import shutil
from hdfs import Client
import requests as rq
import tempfile
import random
import socket
import pandas as pd
import matplotlib.pyplot as plt
from sklearn import preprocessing
import numpy as np
import json

train_file = '../data/train_FD001.txt'
test_file = '../data/test_FD001.txt'

raw = pd.read_csv(train_file, sep=" ", header=None)
colname = ["unit", "cycle", "o1", "o2", "o3"]
for i in range(raw.shape[1]-5):
    colname.append("s-" + str(i))
raw.columns = colname

models={}

feature = 's-19'
for index in range(100):
    engine = raw[raw['unit'] == index+1].copy()
    x = range(engine.shape[0])

    # normalize
    min_max_scaler = preprocessing.MinMaxScaler()
    scaled = min_max_scaler.fit_transform(engine.values)
    engine = pd.DataFrame(scaled)
    engine.columns = colname

    #plt.figure()

    coef = np.polyfit(x, engine[feature].values, 2)
    poly = np.poly1d(coef)

    #plt.title(feature)
    #plt.plot(x, engine[feature])
    #plt.plot(x, poly(x))
    #plt.show()


    models[index+1] = [poly, engine.shape[0]]


# testing
output={}
for testindex in range(1,100):
    output[testindex] = {}
    testraw = pd.read_csv(test_file, sep=" ", header=None)
    testraw.columns = colname

    testengine = testraw[testraw['unit'] == testindex].copy()
    test_x = range(testengine.shape[0])
    min_max_scaler = preprocessing.MinMaxScaler()
    scaled = min_max_scaler.fit_transform(testengine.values)
    testengine = pd.DataFrame(scaled)
    testengine.columns = colname

    min_mse = -1
    min_model = None
    min_shift = 0
    min_mindex = 0
    for mindex in range(len(models)):
        model = models[mindex+1]
        if model[1] < len(test_x):
            continue

        for shift in range(model[1] - len(test_x)):
            x = [y + shift for y in test_x]
            predict = model[0](x)
            mse = ((predict - testengine[feature].values)**2).mean(axis=0)

            if min_mse == -1:
                min_mse = mse
                min_model = model
                min_shift = 0
                mon_mindex = mindex+1
            else:
                if min_mse > mse:
                    min_mse = mse
                    min_model = model
                    min_shift = shift
                    min_mindex = mindex+1

    if min_mindex == 0:
        continue
    print(testindex, min_mindex)
    #plt.figure()
    engine = raw[raw['unit'] == min_mindex].copy()
    x = range(engine.shape[0])

    # normalize
    min_max_scaler = preprocessing.MinMaxScaler()
    scaled = min_max_scaler.fit_transform(engine.values)
    engine = pd.DataFrame(scaled)
    engine.columns = colname

    #plt.plot(x, engine[feature].values)
    output[testindex]['x1'] = list(x)
    output[testindex]['y1'] = list(engine[feature].values)

    output[testindex]['x2'] = list(x)
    output[testindex]['y2'] = list(min_model[0](x))

    x = [y + min_shift for y in test_x]
    #plt.plot(x, testengine[feature].values)
    output[testindex]['x3'] = list(x)
    output[testindex]['y3'] = list(testengine[feature].values)

    output[testindex]['model'] = min_mindex
    output[testindex]['rul'] = len(engine[feature].values) - x[len(x)-1]




    #plt.show()

with open('../output/result.json', 'w') as fp:
    json.dump(output, fp)

'''
for i in range(engine.shape[1]-2):
    plt.figure()
    plt.title("s-" + str(i))
    plt.plot(x, engine["s-" + str(i)])
    plt.show()
'''


