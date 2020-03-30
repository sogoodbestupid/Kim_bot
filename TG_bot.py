#! usr/bin/env python3
# -*- coding:utf-8 -*-

import telebot
import variables as v
import TG_bot_buttons as Tg
from bs4 import BeautifulSoup as BtSp
import re
from urllib.request import urlopen

bot = telebot.TeleBot(v.TOKEN)


@bot.message_handler(content_types=['text', 'document'])
def bot_say_hi(message):
    if message.text == 'Привет' or message.text == '/start':
        bot.send_message(message.from_user.id, "Привет, меня зовут Ким! Отправь мне 'Ким' если ты хочешь разобраться "
                                               "в моих навыках")
        bot.register_next_step_handler(message, skills)
    elif message.text == 'Ким' or message.text == 'ким':
        skills(message)
    elif message.text == 'Расписание':
        bot.send_message(message.from_user.id, "Выбери группу: ", reply_markup=Tg.button2)
    elif message.text == 'Материалы':
        bot.send_message(message.from_user.id, 'Доступные дисциплины: ', reply_markup=Tg.button3)
    elif message.text == 'СБИ-211':
        get_link(v.syn_link, message.text, message)
    elif message.text == 'СБИ-212':
        get_link(v.syn_link, message.text, message)
    elif message.text == v.disciplines[0]:
        bot.send_message(message.from_user.id, v.info_com_sys_net)
    elif message.text == v.disciplines[1]:
        bot.send_message(message.from_user.id, v.big_data)
    elif message.text == v.disciplines[2]:
        bot.send_message(message.from_user.id, v.modeling_system)
    elif message.text == v.disciplines[3]:
        bot.send_message(message.from_user.id, v.graph_3d)
    elif message.text == v.disciplines[4]:
        bot.send_message(message.from_user.id, v.mispisit)
    elif message.text == v.disciplines[5]:
        bot.send_message(message.from_user.id, v.time_managment)
    elif message.text == v.disciplines[6]:
        bot.send_message(message.from_user.id, v.mobile_device_dev_tech)
    elif message.text == v.disciplines[7]:
        bot.send_message(message.from_user.id, v.mob_dev_net_comp_framework)
    elif message.text == v.disciplines[8]:
        bot.send_message(message.from_user.id, v.osn_isp_1c_predp)
    elif message.text == v.disciplines[9]:
        bot.send_message(message.from_user.id, v.prog_app_sred_inf_bez)
    elif message.text == v.disciplines[10]:
        bot.send_message(message.from_user.id, v.practice)
    else:
        bot.send_message(message.from_user.id, 'Отправь мне "Ким"!')


def get_link(lnk, group, message):
    obj = ''
    soup = BtSp(urlopen("https://synergy.ru/students/schedule").read().decode('utf-8'), 'html5lib')
    source = soup.find(attrs={'id': 'scheduleSelect'})
    option = source.find_all_next('option')
    for i in option:
        if group in i:
            soup2 = BtSp(urlopen(lnk + i['value']).read().decode('utf-8'), 'html5lib')
            for j in soup2.find_all(attrs={'class': 'today'}):
                obj = j.text
            reg = re.sub('[\t\r\n]', ' ', obj)
            return schedule(reg, message)


@bot.message_handler(content_types=['text'])
def skills(message):
    if message.text == 'Ким' or message.text == 'ким':
        bot.send_message(message.from_user.id, 'Ок, вот что я могу: ', reply_markup=Tg.button1)
    else:
        bot.send_message(message.from_user.id, 'Я сообщу разработчику!')


@bot.message_handler(content_types=['text'])
def schedule(les, message):
    return bot.send_message(message.from_user.id, les)


bot.polling(none_stop=True, interval=0)
