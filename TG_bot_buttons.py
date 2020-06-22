#!usr/bin/env python3
# -*- coding:utf-8 -*-

from telebot import types
from variables import disc_keys as dk
from variables import groups as g
from variables import skills as sk

button1 = types.ReplyKeyboardMarkup(resize_keyboard=True)
for i in sk:
    button1.row(i)

button2 = types.ReplyKeyboardMarkup(resize_keyboard=True)
for j in g:
    button2.row(j)

button3 = types.ReplyKeyboardMarkup(resize_keyboard=True)
for k in dk:
    button3.row(k)

