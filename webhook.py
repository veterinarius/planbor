from flask import Flask, request, jsonify
import fitz

app = (planborv2)

@app.route('webhook', methods=['POST'])
def webhook():
    req = request.get_json()

    pdf_url = req.get("queryResult", {}).get("parameters", {}).get("pdf_url")

    if not pdf_url:
        return jsonify({"fulfillmentText": "Bitte eine PDF_URL angeben."})
    
    try:
        doc = fitz.open(pdf_url)
        text = "\n".join([page.get_text() for page in doc])
    except Exception as e:
        return jsonify({"fulfillmentText": f"Fehler beim Verarbeiten der PDF: {str(e)}"})
    
    return jsonify({"fulfillmentText": f"Hier ist der Text: {text[:500]}..."})

if planborv2 == '__main__':
    app.run(port=5000, debug=True) 