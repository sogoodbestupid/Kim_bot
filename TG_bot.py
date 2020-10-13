#! usr/bin/env python3
# -*- coding:utf-8 -*-

import telebot
import variables as v
import TG_bot_buttons as Tg
from bs4 import BeautifulSoup as BtSp
import re
from urllib.request import urlopen

bot = telebot.TeleBot(v.TOKEN)


@bot.message_handler(content_types=['text'])
def bot_say_hi(message):
    schedule_mode_setter(message)
    schedule_modded_getter(message)
    if message.text == 'Привет' or message.text == '/start':
        bot.send_message(message.from_user.id, "Привет, меня зовут Ким! Отправь мне 'Ким' если ты хочешь разобраться "
                                               "в моих навыках")
    elif message.text == 'Ким' or message.text == 'ким' or message.text == 'КИМ':
        skills(message)
    elif message.text == 'Расписание':
        schedule_mode_getter(message)
    elif message.text == 'Материалы':
        bot.send_message(message.from_user.id, 'Доступные дисциплины: ', reply_markup=Tg.button3)


@bot.message_handler(content_types=['text'])
def schedule_modded_getter(message):
    for t in v.teachers:
        if t == message.text:
            get_link(v.syn_link, message.text, v.teach_mode, message)
    for j in v.groups:
        if j == message.text:
            get_link(v.syn_link, message.text, v.stud_mode, message)
    for i in v.discipline:
        if i == message.text:
            bot.send_message(message.from_user.id, v.discipline[message.text])


def get_link(lnk, param, mode, message):
    obj = ''
    soup = BtSp(urlopen(lnk + mode).read().decode('utf-8'), 'html5lib')
    source = soup.find(attrs={'id': 'scheduleSelect'})
    option = source.find_all_next('option')
    for i in option:
        if param in i:
            soup2 = BtSp(urlopen(lnk + i['value']).read().decode('utf-8'), 'html5lib')
            for j in soup2.find_all(attrs={'class': 'today'}):
                obj = re.sub('[\t\r\n]', ' ', j.text)
            return schedule(obj, message)


@bot.message_handler(content_types=['text'])
def skills(message):
    return bot.send_message(message.from_user.id, 'Ок, вот что я могу: ', reply_markup=Tg.button1)


@bot.message_handler(content_types=['text'])
def schedule_mode_getter(message):
    bot.send_message(message.from_user.id, 'Какое расписание нужно?', reply_markup=Tg.button4)


@bot.message_handler(content_types=['text'])
def schedule_mode_setter(message):
    if message.text == v.schedules[0]:
        bot.send_message(message.from_user.id, "Выбери группу: ", reply_markup=Tg.button2)
    elif message.text == v.schedules[1]:
        bot.send_message(message.from_user.id, "Выбери преподавателя: ", reply_markup=Tg.button5)


@bot.message_handler(content_types=['text'])
def schedule(les, message):
    return bot.send_message(message.from_user.id, les)


bot.infinity_polling()

# bot.polling(none_stop=True, interval=0)
