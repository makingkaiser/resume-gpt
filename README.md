# OrbitAI

# Instructions on running the webapp
(As of 27 May)
first, install python dependencies
go to the file path where the folder 'flask-server' is and start a virtual environment in the terminal
for Mac, it was 'python3 -m venv venv'
then, run 'pip install -r requirements.txt'
to install all required dependencies
next, set your openai API key with:
 Windows : Run the following in the cmd prompt, replacing <yourkey> with your API key:

setx OPENAI_API_KEY “<yourkey>”

This will apply to future cmd prompt window, so you will need to open a new one to use that variable with curl. You can validate that this variable has been set by opening a new cmd prompt window and typing in 

echo %OPENAI_API_KEY%

then, download the csv file from "https://cdn.openai.com/API/examples/data/winter_olympics_2022.csv"
and place it in the 'flask-server' folder. 

then, navigate to the file path where the 'src' folder is and run 'npm install' in the terminal. 
this will install the required dependencies. do not update them, but just try npm start, which should open up a localhost:3000 in your browser. 
finally, navigate to the 'flask-server' path again and run 'flask run'.

## About the project
What's the problem?

We all know how ChatGPT works -- it responds to questions you may have with insightful answers. But what happens when you have questions about a customized dataset that is too specific for the general body of knowledge that GPT-3 is trained on? Herein lies the problem: you have burning questions about a specific text document but you cannot find the answers using ChatGPT because it has no knowledge on the content of the document.

How will our project solve this problem?

Our project aims to allow users to gain insights and meaningful answers to questions they have about specific, customised contexts. Users will input data they want OrbitAI to learn and analyze, and OrbitAI will create a customized instance of GPT ‘trained’ with the additional data. It will then output the desired answers to users' questions regarding the specific given context.

Who will stand to gain from our project?

Everyone! Educators, students, researchers, office workers...anyone who wants quick answers to their multifarious questions can turn to OrbitAI, upload a document they have questions about, and ask away!

## User Stories

As an talent recruiter, I can input an applicant's resume into OrbitAI and get it to summarise his/ her resume via its basic semantic capability. I can learn about the working experiences the applicant has had via OrbitAI's specific detail retrieval.
I can also learn whether an applicant is considered him/her to be a good candidate for the job via OrbitAI's semantic analysis ability. 

As a teacher, I could input a section of a textbook into OrbitAI and get it to generate a pop quiz I can use for my lessons the next day. I am able to use OrbitAI to aid me in creating lesson plans via semantic analysis. 

## Features
As of now, the features include a main page with a box that allows you to type in your questions, as well as file upload feature.

In future milestones, we are planning to include button features for prompt engineering.
