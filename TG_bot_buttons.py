#!usr/bin/env python3
# -*- coding:utf-8 -*-

from telebot import types
from variables import disciplines

button1 = types.ReplyKeyboardMarkup()
button1.row('Расписание', 'Материалы')

button2 = types.ReplyKeyboardMarkup()
button2.row('Пары сегодня', 'Пары завтра')

but1 = types.KeyboardButton(disciplines[0])
but2 = types.KeyboardButton(disciplines[1])
but3 = types.KeyboardButton(disciplines[2])
but4 = types.KeyboardButton(disciplines[3])
but5 = types.KeyboardButton(disciplines[4])
but6 = types.KeyboardButton(disciplines[5])
but7 = types.KeyboardButton(disciplines[6])
but8 = types.KeyboardButton(disciplines[7])
but9 = types.KeyboardButton(disciplines[8])
but10 = types.KeyboardButton(disciplines[9])
but11 = types.KeyboardButton(disciplines[10])
button3 = types.ReplyKeyboardMarkup()
button3.add(but1, but2, but3, but4, but5, but6, but7, but8, but9, but10, but11)

