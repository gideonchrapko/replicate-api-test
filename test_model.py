import requests

def run_model(input_string):
    try:
        response = requests.post('http://localhost:3000/run-model', json={"input_string": input_string})
        return response.text
    except requests.exceptions.ConnectionError:
        return "Error: Unable to connect to the Node.js server. Make sure it's running on port 3000."

if __name__ == '__main__':
    result = run_model("Hello, Replicate!")
    print(result)
