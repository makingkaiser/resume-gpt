
# OrbitAI

**Team ID**: 5778

**Team Members**:
Kaiser Cheng, Joy Foo

**Level of Achievement**: Apollo 11


# Instructions on running the webapp
(As of 27 May)

First, install python dependencies.
Go to the file path where the folder 'flask-server' is and start a virtual environment in the terminal.

For Mac, run `python3 -m venv venv`, while for Windows, run `py -m venv venv` to create a virtual environment called `env`.

Then, run `pip install -r requirements.txt` to install all required dependencies.

Next, set your OpenAI API key:

 On Windows, run the following in the CLI, replacing <yourkey> with your API key:

`setx OPENAI_API_KEY <yourkey>`

This will apply to future CLI windows, so you will need to open a new one to use that variable with curl. You can validate that this variable has been set by opening a new CLI window and typing in 

`echo %OPENAI_API_KEY%`

Then, download the csv file from "https://cdn.openai.com/API/examples/data/winter_olympics_2022.csv"
and place it in the 'flask-server' folder. 

Then, navigate to the file path where the 'src' folder is and run `npm install` in the terminal. 

This will install the required dependencies. Do not update them, but just run `npm start`, which should open up a localhost:3000 in your browser. 
 
Finally, navigate to the 'flask-server' path again and run `flask run`.

## About the Project
**What’s the problem?**

We all know how ChatGPT works -- it responds to questions you may have with insightful answers. But what happens when you have questions about a customised dataset that is too specific for the general body of knowledge that GPT-3 is trained on? In other words, what if you have some burning questions about some text that ChatGPT has no idea exists? You are left with unanswered questions because even ChatGPT cannot help you.

**How will our project solve this problem?**

Our project aims to allow users to gain insights and meaningful answers to questions they have about specific, customised contexts. Users will input data they want OrbitAI to learn and analyse, and OrbitAI will create a customised instance of GPT ‘trained’ with the given data. It will then output the desired answers to users' questions regarding the specific given context.

**Who will stand to gain from this solution?**

Everyone! Educators, students, researchers, office workers...anyone who wants quick answers to their multifarious questions can turn to OrbitAI, upload a document they have questions about, and ask away!

## Project Lift-Off Poster:
Our *poster* can be viewed at [5778.png.](https://drive.google.com/file/d/16ImxMp8x71ir37Fwxc_jQWOkwGz-SRF_/view?usp=share_link) Made using Canva.

Our *Project Trailer* can be viewed at [5778.mp4.](https://drive.google.com/file/d/1Txf9ak5EnQ1CORsjyI9iwCPzuybsgJdg/view?usp=share_link)


## User Stories
* As a professional, I can upload my reports and  use OrbitAI to proofread my reports.
 
* As a student, I can upload a chunk of text and ask OrbitAI to summarise this text, or ask questions about this text. For example,  I could ask OrbitAI what literary devices are being used in a piece of literature.

* As a researcher, I can upload research papers onto OrbitAI and get it to summarise the research papers, or provide insights on scientific concepts, or 

* As a data analyst, I can upload my data files onto OrbitAI and get it to help me analyse the given data to point out significant figures and  trends.

* As an event organiser, I can submit a text file with information about my event to OrbitAI. Event goers can then  ask the chatbot about the event, and OrbitAI will answer any question it can find the answer to within the provided information. 


## Design
Our *Class Diagram* can be viewed [here.](https://drive.google.com/file/d/1QlvFjIR3chX3KTD6zOu66jYNZG6PmbMk/view?usp=share_link)

## Features

**Proposed**
* A File Upload field for users to upload their own files
* An Input field for users to input questions
* A Button that sends the user's input questions into the backend
* A Chatbot reply style output field for users to get answers to their questions
* Prompt buttons to streamline the context of the Chatbot

**In Progress**

* A File Upload field for users to upload their own files
* An Input field for users to input questions
* A Button that sends the user's input questions into the backend

Our ***Technical Proof-of-Concept*** can be found [here](https://docs.google.com/document/d/1QA0hiq3B01C-MLfwHBFUVlUo8GxjuN346ZPz-yJGT60/edit?usp=sharing).


## Next up…
Some features for the next phases:
* A Chatbot reply style output field for users to get answers to their questions
* Prompt buttons to streamline the context of the Chatbot (ie prompt engineering)

## Project Flow and Timeline
Our *Project Flow and Development Timeline* can be found [here](https://docs.google.com/document/d/1QA0hiq3B01C-MLfwHBFUVlUo8GxjuN346ZPz-yJGT60/edit?usp=sharing).

## Project Log
Our *Project Log* can be found [here](https://docs.google.com/document/d/1QA0hiq3B01C-MLfwHBFUVlUo8GxjuN346ZPz-yJGT60/edit?usp=sharing).

## Tech-Stack

For our project, we used: 
* Python
* Flask
* React
* OpenAI API
