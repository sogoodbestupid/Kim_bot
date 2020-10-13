#!usr/bin/env python3
# -*- coding:utf-8 -*-

from telebot import types
from variables import disc_keys as dk
from variables import groups as g
from variables import skills as sk
from variables import schedules as tc
from variables import teachers as th

button1 = types.ReplyKeyboardMarkup(resize_keyboard=True)
for i in sk:
    button1.row(i)

button2 = types.ReplyKeyboardMarkup(resize_keyboard=True)
for j in g:
    button2.row(j)

button3 = types.ReplyKeyboardMarkup(resize_keyboard=True)
for k in dk:
    button3.row(k)

button4 = types.ReplyKeyboardMarkup(resize_keyboard=True)
for t in tc:
    button4.row(t)

button5 = types.ReplyKeyboardMarkup(resize_keyboard=True)
for m in th:
    button5.row(m)
