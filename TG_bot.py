#! usr/bin/env python3
# -*- coding:utf-8 -*-

import telebot
import variables as v
import TG_bot_buttons as Tg
import datetime
import openpyxl as xl

bot = telebot.TeleBot(v.TOKEN)


@bot.message_handler(content_types=['text', 'document'])
def bot_say_hi(message):
    if message.text == 'Привет' or message.text == '/start':
        bot.send_message(message.from_user.id, "Привет, меня зовут Ким! Отправь мне 'Ким' если ты хочешь разобраться "
                                               "в моих навыках")
        bot.register_next_step_handler(message, skills)
    elif message.text == 'Ким':
        skills(message)
    elif message.text == 'Расписание':
        bot.send_message(message.from_user.id, "Выбери день: ", reply_markup=Tg.button2)
    elif message.text == 'Материалы':
        bot.send_message(message.from_user.id, 'Доступные дисциплины: ', reply_markup=Tg.button3)
    elif message.text == 'Пары сегодня':
        schedule_getter_today(v.schedule_source_home, message)
    elif message.text == 'Пары завтра':
        schedule_getter_tomorrow(v.schedule_source_home, message)
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


def schedule_getter_today(source, message):
    result = list()
    data = xl.load_workbook(source)
    sheet = data.get_sheet_by_name('Лист1')
    sht = sheet
    datetd = datetime.date.today()
    today = datetd.strftime('%Y-%m-%d') + ' ' + '00:00:00'
    for i in sht:
        day = str(i[0].value)
        if day == today:
            for j in i:
                result.append(str(j.value))
                return schedule(result, message)
        else:
            bot.send_message(message.from_user.id, 'Пар сегодня нет')


def schedule_getter_tomorrow(source, message):
    result = list()
    data = xl.load_workbook(source)
    sheet = data.get_sheet_by_name('Лист1')
    sht = sheet
    datetd = datetime.date.today()
    datetm = datetd + datetime.timedelta(days=1)
    tomorrow = datetm.strftime('%Y-%m-%d') + ' ' + '00:00:00'
    for i in sht:
        day = str(i[0].value)
        if day == tomorrow:
            for j in i:
                result.append(str(j.value))
                return schedule(result, message)
        else:
            bot.send_message(message.from_user.id, 'Пар завтра нет!')
            break


@bot.message_handler(content_types=['text'])
def skills(message):
    if message.text == 'Ким':
        bot.send_message(message.from_user.id, 'Ок, вот что я могу: ', reply_markup=Tg.button1)
    else:
        bot.send_message(message.from_user.id, 'Я сообщу разработчику!')


@bot.message_handler(content_types=['text'])
def schedule(les, message):
    dat = ' '.join(les)
    bot.send_message(message.from_user.id, dat)


bot.polling(none_stop=True, interval=0)
