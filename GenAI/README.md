# Summarization API

This project provides a simple API for summarizing text using a transformer model.

## Description

The Summarization API is built using Flask and the Hugging Face Transformers library. It exposes an endpoint that accepts a transcript of text and returns a summarized version of it.

## Installation

1. Clone this repository
2. Install the required dependencies:
   ```
   pip install flask transformers
   ```

## Usage

1. Start the Flask server:
   ```
   python app.py
   ```
   The server will start running on `http://localhost:5000`

2. To use the API, send a POST request to the `/summarize` endpoint with a JSON payload containing the transcript you want to summarize.

### Example using curl

You can test the API using the following curl command:

```
curl -X POST http://127.0.0.1:5000/summarize -H "Content-Type: application/json" -d '{"transcript": "text you want to summarize"}'
```

Replace "text you want to summarize" with the actual text you want to summarize.

## API Specification

The API specification is defined in the `genai_api.yaml` file using OpenAPI 3.0.3 format. Here are the key details:

- Endpoint: `/summarize`
- Method: POST
- Request Body: JSON object with a `transcript` field containing the text to summarize
- Response: JSON object with a `summary` field containing the summarized text

### Responses

- 200 OK: Successful response with the summary
- 400 Bad Request: If no transcript is provided
- 500 Internal Server Error: If there's an exception during processing

## Error Handling

The API includes error handling for cases where no transcript is provided or if an exception occurs during the summarization process.

## Development

The main application logic is contained in `app.py`. To modify the summarization behavior, you can adjust the parameters in the `summarizer` function call.
