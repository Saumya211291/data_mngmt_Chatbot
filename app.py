from flask import Flask, request, jsonify 

import os
from google.cloud import bigquery
import google.generativeai as genai

app = Flask(__name__)

# Set Google Cloud credentials
SERVICE_ACCOUNT_FILE = "C:\\Users\\DELL\\Documents\\cloudathon2025\\ltc-hack-prj-17-ee27d1e46f80.json"
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = SERVICE_ACCOUNT_FILE

# Initialize BigQuery client
client = bigquery.Client()

# Initialize Gemini API
genai.configure(api_key="AIzaSyCiB3PbZJVAUIm37bZKBgBxplaH2CGZkw0")
model = genai.GenerativeModel("gemini-2.0-flash")

@app.route('/get_explanation', methods=['GET'])
def get_explanation():
    query = "SELECT * FROM `ltc-hack-prj-17.Joltmasters.Master_dataset`;"
    query_job = client.query(query)
    rows = query_job.result()
    
    table_data = "\n".join([str(row) for row in rows])

    response = model.generate_content(
        contents=[{"parts": [{"text": f"Explain the following BigQuery table data:\n{table_data}"}]}]
    )

    return jsonify({"response": response.text})

if __name__ == '__main__':
    app.run(debug=True)
