import requests

def run_model(input_string):
    response = requests.post('http://localhost:3000/run-model', json={"input_string": input_string})
    return response.text

result = run_model("Hello, Replicate!")
print(result)