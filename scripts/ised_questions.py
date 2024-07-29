#!/bin/python

import requests
import errno
import zipfile
import os
import csv
import json

def get_questions_db(exam_type):
    exam_type = 'adv' if exam_type == 'a' else 'basic'
    base_url = 'https://apc-cap.ic.gc.ca/datafiles/'
    filename = 'amat_' + exam_type + '_quest'
    r = requests.get(base_url + filename + '.zip', allow_redirects=True)
    if r.status_code == 200:
        # Open a local file in write-binary mode
        with open(filename + '.zip', 'wb') as file:
            # Write the content of the response to the file
            file.write(r.content)
    with zipfile.ZipFile(filename + '.zip', 'r') as zip_ref:
        for file in zip_ref.namelist():
            if file.startswith(filename): zip_ref.extract(file, '.') 
    return filename + '_delim.txt'

def txtdb_to_json(filename, exam_type):
    data = []
    with open(filename, newline='') as csvfile:
        questions = csv.DictReader(csvfile, delimiter=';', quotechar='|')
        for row in questions:
            # Convert lists of incorrect answers to individual dictionaries
            english_incorrect_answers = [{"answer": answer} for answer in row['incorrect_answer_1_english'].split(';')]
            english_incorrect_answers.extend([{"answer": answer} for answer in row['incorrect_answer_2_english'].split(';')])
            english_incorrect_answers.extend([{"answer": answer} for answer in row['incorrect_answer_3_english'].split(';')])
            french_incorrect_answers = [{"answer": answer} for answer in row['incorrect_answer_1_french'].split(';')]
            french_incorrect_answers.extend([{"answer": answer} for answer in row['incorrect_answer_2_french'].split(';')])
            french_incorrect_answers.extend([{"answer": answer} for answer in row['incorrect_answer_3_french'].split(';')])

            # Create a dictionary for the current question
            question_data = {
                "question_id": row['question_id '],
                "question_english": row['question_english'],
                "correct_answer_english": row['correct_answer_english'],
                "incorrect_answers_english": english_incorrect_answers,
                "question_french": row['question_french'],
                "correct_answer_french": row['correct_answer_french'],
                "incorrect_answers_french": french_incorrect_answers
            }
            data.append(question_data)
    questions_array = {"questions": data}
    final_json = get_category_array(exam_type)
    final_json.append(questions_array)
    with open('questions.json', 'w') as json_file:
        json.dump(final_json, json_file, indent=4)
    print("File successfully written to questions.json!")

def get_category_array(level):
    if level == 'b':
        category_schema = [{
            "id": "B-001",
            "title": "Regulations and Policies"
        },
        {
            "id": "B-002",
            "title": "Operarting and Procedures"
        },
        {
            "id": "B-003",
            "title": "Station Assembly, Practice and Safety"
        },
        {
            "id": "B-004",
            "title": "Circuit Components"
        },
        {
            "id": "B-005",
            "title": "Basic Electronics and Theory"
        },
        {
            "id": "B-006",
            "title": "Feedlines and Antenna Systems"
        },
        {
            "id": "B-007",
            "title": "Radio Wave Propagation"
        },
        {
            "id": "B-008",
            "title": "Interference and Suppression"
        }]
    else:
        category_schema = [{
            "id": "A-001",
            "title": "Advanced Theory"
        },
        {
            "id": "A-002",
            "title": "Advanced Components and Circuits"
        },
        {
            "id": "A-003",
            "title": "Measurements"
        },
        {
            "id": "A-004",
            "title": "Power Supplies"
        },
        {
            "id": "A-005",
            "title": "Transmitters, Modulation and Processing"
        },
        {
            "id": "A-006",
            "title": "Receivers"
        },
        {
            "id": "A-007",
            "title": "Feedlines - Matching and Antenna Systems"
        }]

    return {"categories": category_schema}

txtdb_to_json(get_questions_db('b'), 'b')
#txtdb_to_json(get_questions_db('a'), 'a')
