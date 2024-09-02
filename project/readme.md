# GraphRAG chatbot on Artificial Intelligence and Machine Learning
### Introduction
This chatbot is based on the open source GraphRAG library from Microsoft and trained on the lecture note of *AIML: Artificial Intelligence and Machine Learning*. The LLM used here is GPT-4o.
This readme file guide you step by step through the setup of this chatbot.
## Install
### prerequisite 
You need to have Python 3.10-3.12 installed on your work environment.
### Install GraphRAG
You need to install the GraphRAG library on your work environment.
```bash
pip install graphrag
```
## Use the Chatbot
Clone the entire `graphrag`folder into your workspace. Navigate into `~/graphrag` . You should only find `lancedb` and `ragtest` folders when you do the `ls` command. 
To do a global query on the lecture note over all (such as asking about the content of the lecture note), do 
```sh
python -m graphrag.query --root ./ragtest --method global "your question"
```
To do a local query on the specific subject of the lecture note (such as asking about the detail of Markov chain model), do 
```sh
python -m graphrag.query --root ./ragtest --method local "your question"
```