from django.test import TestCase

# Create your tests here.
import requests

BASE_URL = "http://127.0.0.1:8000/"  # Base URL of the Django API
username = 'testfinal'
password = 'testpassF'
email = 'testF@gmail.com'

def check_api_response(response):
    try:
        if response.status_code >=200 and response.status_code < 300:
            print("🌟🌟🌟 API is OK :" , response.content)
            print("\n")
        else:
            raise Exception(f"Error:🧰 Received status code {response.text}\n")
        
    except Exception as e:
        print(e)

def register_user(username,email, password):
    print("----register_user----")
    url = f'{BASE_URL}userconf/register/'
    payload = {
        "username": username,
        'password': password,
        'email': email ,
    } 
    response = requests.request("POST", url, json=payload)
    check_api_response(response)

def Login_user(username,password): 
    print( "----login----")
    url = f'{BASE_URL}userconf/login/'
    payload = {
        'username': username,
        'password': password
    } 
    response = requests.request("POST", url, json=payload)
    JWT_token = response.json().get('tokens', {}).get('access')
    print(f'User logged in successfully.🌟🌟🌟 \nJWT token: {JWT_token}\n')
    return JWT_token
'''
Project
'''

def add_project(headers):
    print("---create project---")
    url = f'{BASE_URL}api/Project-list/'
    payload = {
            'title': 'Project 1'
            }
    response = requests.request("POST", url, json=payload, headers=headers)
    check_api_response(response)
    return response.json().get('Project_id')

def list_project(headers):
    print("---List_project---")
    url = f'{BASE_URL}api/Project-list/'
    response = requests.request("GET", url, headers=headers)
    check_api_response(response)

def update_project(headers,id):
    print("---update_project---")
    url = f'{BASE_URL}api/Project-list/{id}/'
    payload = {
            'title': 'Project updated'
            }
    response = requests.request("PUT", url, json=payload, headers=headers)
    check_api_response(response)

def retrieve_project(headers,id):
    print("---Retrieve_project---")
    url = f'{BASE_URL}api/Project-list/{id}'
    response = requests.request("GET", url, headers=headers)
    check_api_response(response)

def delete_project(headers,id):
    print("---Delete_Project---")
    url = f'{BASE_URL}api/Project-list/{id}'
    response = requests.request("DELETE", url, headers=headers)
    check_api_response(response)

'''
ToDo
'''
def add_todo(headers):
    print("---create todo---")
    url = f'{BASE_URL}api/Todo-list/'
    payload = {
            'Description': 'Todo 1',
            'Status': False,
            }
    response = requests.request("POST", url, json=payload, headers=headers)
    check_api_response(response)
    return response.json().get('todo_id')

def project_todo(headers,project_id,todo_id):
    print("---project_todo---")
    url = f'{BASE_URL}api/Todo-list/{todo_id}/projecttodoupdate/'
    payload = {
            'Project_id': project_id,
            }
    response = requests.request("POST", url, json=payload, headers=headers)
    check_api_response(response)

def list_todo(headers,project_id):
    print("---List_todo---")
    url = f'{BASE_URL}api/Todo-list/'
    response = requests.request("GET", url, headers=headers,params={'Project_id':project_id})
    check_api_response(response)

def update_todo(headers,id):
    print("---update_todo---")
    url = f'{BASE_URL}api/Todo-list/{id}/'
    payload = {
            'Description': 'Todo updated',
            'Status': True
            }
    response = requests.request("PUT", url, json=payload, headers=headers)
    check_api_response(response)

def retrieve_todo(headers,id):
    print("---Retrieve_todo---")
    url = f'{BASE_URL}api/Todo-list/{id}'
    response = requests.request("GET", url, headers=headers)
    check_api_response(response)

def delete_todo(headers,id):
    print("---Delete_todo---")
    url = f'{BASE_URL}api/Todo-list/{id}'
    response = requests.request("DELETE", url, headers=headers)
    check_api_response(response)



register_user(username,email, password)
JWT_token = Login_user(username,password)
headers = {
    "accept": "application/json",
    "Content-Type": "application/json",
    "Authorization":f"Bearer {JWT_token}"
    }


project_id = add_project(headers)
list_project(headers)
update_project(headers,project_id)
list_project(headers)

todo_id = add_todo(headers)
project_todo(headers,project_id,todo_id)
list_todo(headers,project_id)
update_todo(headers,todo_id)
list_todo(headers,project_id)

retrieve_project(headers,project_id)
retrieve_todo(headers,todo_id)

delete_todo(headers,todo_id)
delete_project(headers,project_id)