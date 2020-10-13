#!usr/bin/env python3
# -*- coding:utf-8 -*-

DROP_BOX_TOKEN = ''

TOKEN = ''  # telegram_token

skills = ['Расписание', 'Материалы']

schedules = ['Студент', 'Преподаватель']

groups = ['СБИ-311', 'СБИ-312']

discipline = {'Инфокоммуникационные системы и сети':
              'link to resource',
              'Технологии больших данных':
              'link to resource',
              'Моделирование систем':
              'link to resource',
              'Трехмерная графика':
              'link to resource',
              'МиСПИСиТ':
              'link to resource',
              'Тайм-менеджмент':
              'link to resource',
              'Технологии разработки ПО Моб. Устр.':
              'link to resource',
              'Программирование МУ .Net Compact Framework':
              'link to resource',
              'Осн. Исп. и Конф. 1С Предприятие':
              'link to resource',
              'Прог. и Апп. Средства Инф. Без.':
              'link to resource',
              'Практика':
              'link to resource'
              }
disc_keys = list(discipline.keys())

syn_link = 'https://synergy.ru'

teachers = [
    'Максимов Константин Викторович',
    'Гавриленко Андрей Васильевич',
    'Ребус Наталья Анатольевна',
    'Прокимнов Николай Николаевич',
    'Ожередов Вадим Андреевич',
    'Гнибеда Артем Юрьевич'
]

stud_mode = '/students/schedule'
teach_mode = '/students/schedule?view_mode=teacher'
