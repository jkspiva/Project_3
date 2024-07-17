import csv
import json

csv_file_path = '/Users/sandysamy/Desktop/Projects/Project_3/Final_Draft/Alcohol_Consumption_US.csv'
json_file_path = '/Users/sandysamy/Desktop/Projects/Project_3/Sandy/Alcohol_Consumption_US.json'

data = []
with open(csv_file_path, newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        data.append(row)

with open(json_file_path, 'w') as jsonfile:
    json.dump(data, jsonfile, indent=4)