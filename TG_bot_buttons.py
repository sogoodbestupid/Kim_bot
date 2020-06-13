#!usr/bin/env python3
# -*- coding:utf-8 -*-

from telebot import types
from variables import disc_keys as dk

button1 = types.ReplyKeyboardMarkup()
button1.row('Расписание', 'Материалы')

button2 = types.ReplyKeyboardMarkup()
button2.row('СБИ-211', 'СБИ-212')

but1 = types.KeyboardButton(dk[0])
but2 = types.KeyboardButton(dk[1])
but3 = types.KeyboardButton(dk[2])
but4 = types.KeyboardButton(dk[3])
but5 = types.KeyboardButton(dk[4])
but6 = types.KeyboardButton(dk[5])
but7 = types.KeyboardButton(dk[6])
but8 = types.KeyboardButton(dk[7])
but9 = types.KeyboardButton(dk[8])
but10 = types.KeyboardButton(dk[9])
but11 = types.KeyboardButton(dk[10])
button3 = types.ReplyKeyboardMarkup()
button3.add(but1, but2, but3, but4, but5, but6, but7, but8, but9, but10, but11)

