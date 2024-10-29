from cog import BasePredictor, Input
from dash import Dash, html, dcc
from flask import Flask, request, jsonify
import threading

class Predictor(BasePredictor):
    def setup(self):
        """Load the model into memory to make running multiple predictions efficient"""
        # No setup required for this simple example
        pass

    def predict(self, input_string: str = Input(description="Input string")) -> str:
        """Run a single prediction on the model"""
        # Create and run Dash app
        dash_thread = threading.Thread(target=self.run_dash_app, args=(input_string,))
        dash_thread.start()
        
        # Return a message indicating Dash app is running
        return f"Dash app is running with input: {input_string}"

    def run_dash_app(self, input_string):
        server = Flask(__name__)
        app = Dash(__name__, server=server)

        app.layout = html.Div([
            html.H1(f"Input received: {input_string}"),
            html.Div(id='prediction-output'),
            # Add more Dash components as needed
        ])

        @app.callback(
            Output('prediction-output', 'children'),
            Input('prediction-output', 'id')
        )
        def update_output(_):
            return f"Prediction: response successful for {input_string}"

        app.run_server(debug=False, port=8050)

# Add a route to handle requests from Node.js
@server.route('/run-dash', methods=['POST'])
def run_dash():
    input_data = request.json['input_string']
    predictor = Predictor()
    result = predictor.predict(input_data)
    return jsonify({"result": result})

if __name__ == '__main__':
    server.run(port=5000)