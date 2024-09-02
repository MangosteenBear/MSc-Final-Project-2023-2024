GraphRAG chatbot on Artificial Intelligence and Machine Learning
=======
Introduction
-----------
This chatbot is based on the open source GraphRAG library from Microsoft and trained on the lecture note of AIML: Artificial Intelligence and Machine Learning. The LLM used here is GPT-4o. This readme file guide you step by step through the setup of this chatbot.

Clone repository
-------
```
git clone https://github.com/MangosteenBear/MSc-Final-Project-2023-2024/
```
Environment
------
You need to have Python 3.10-3.12 installed on your work environment.
You need to install the GraphRAG library on your work environment.
You need to install the node.js on your work environment.

The program will check the enviroment automatically. If there is no python and graphrag library, it will install them.

Set the API
--------
Find the file way project/graphrag/ragtest/.env
```
GRAPHRAG_API_KEY=           #add your own OpenAI API here
GRAPHRAG_LLM_MODEL=gpt-4o   #you can adjust the model
```
Use the Chatbot
--------
Run the node in terminal
```
cd website
node server
```
Once you have seen the message:
>Server is running at the port: XXXXX. 
You can move on.

Open the html file
>public/request website.html

Type what you want to ask on the chatbox. Wait several seconds.
>Global research mode: better performance in comparison, summurization, conclusion
>Local research mode: better performance in understanding single concepts
