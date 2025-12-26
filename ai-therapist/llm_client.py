import requests

class LLMClient:
    def __init__(self, model="gemma:7b", host="http://localhost:11434"):
        self.model = model
        self.url = f"{host}/api/generate"

    def generate(self, prompt: str) -> str:
        response = requests.post(
            self.url,
            json={
                "model": self.model,
                "prompt": prompt,
                "stream": False
            },
            timeout=300
        )
        response.raise_for_status()
        return response.json()["response"].strip()
