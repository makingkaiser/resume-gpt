

# OrbitAI

**Team ID**: 5778

**Team Members**:
Kaiser Cheng, Joy Foo

**Level of Achievement**: Apollo 11

## About our Project
**The Problem**

We all know how ChatGPT works -- it responds to questions you may have with insightful answers. But what happens when you have questions about a customised dataset that is too specific for the general body of knowledge that GPT-3 is trained on? What if you have some burning questions about some text that ChatGPT has no idea exists? You are left with unanswered questions because even ChatGPT cannot help you.

**Our Solution**

OrbitAI is your second brain in the cloud. 
Ask questions, upload additional documents for OrbitAI to learn,
and share your customized chatbot through namespaces.

### Backend Design

The backend consists of 2 main steps, namely Ingestion and LangChain Processing. 

**Ingestion**

The documents (limited to PDFs in this milestone) are received by the backend, which then parses the documents by extracting the raw text. 
In future iterations, other file formats can be supported. As long as the content can be parsed into a text format, any LLM will be able to evaluate the ingested documents. 

Next, it is necessary to split up the text into chunks.  Ideally, semantically related pieces of text should be grouped together, however given that the scope of our project focuses on the typical types of PDFs, we split the text as follows:
1. Split the text up into small, semantically meaningful chunks (often sentences).
2. Start combining these small chunks into a larger chunk until a certain size is reached (the larger the size, the more costly the operation).
3. Once you reach that size, make that chunk its own piece of text and then start creating a new chunk of text with some overlap (to keep context between chunks).

These steps ensure that the chunks are at least somewhat semantically related, and that the chunks chosen to be shown to the LLM at the second last step are as relevant as possible according to the question.

4. Finally, the chunks are transformed into vectors and stored in Pinecone, a vector database. The reason why transforming the text is necessary, is that in the next step, in choosing which parts of the text will most likely contain an answer to the user question, vectors allow for much faster and easier calculation of which texts to retrieve from the database. By choosing only the parts of the text relevant to the question, the amount of text the LLM needs to process is significantly reduced.


**LangChain Processing**

LangChain is a framework for LLMs that allows us to provide it with tools, memory and context. We use Langchain in order to allow our LLM to access the vector database, of which the embeddings of the specified PDF are loaded. Based on the user query, LangChain selects the top-N most relevant embeddings that may answer the question.  These embeddings are passed to the LLM after being translated to text, and marked as context supplemented to the question. As such, the question is answered using the chunks of text provided as additional context. Finally, the output answer is returned to the user. 

**Memory**

Memory allows the chatbot to remember the context of previous messages. This is a core component of a chatbot, as it allows for exchange of conversation rather than linear question and response forms. 

The main challenge of implementing memory is a cost/effectiveness tradeoff. Memory can be stored as plaintext, and appended to the LLM with every query. This method, although retaining the full context of the entire conversation, is highly unfeasible as the token cost for sending the entire length of the conversation with every question spirals rapidly. 

As a result, there are 2 main solutions to this issue: *a sliding context window and summarization*.

The first  keeps a list of the interactions of the conversation over time, but  only uses the last K interactions, to ensure the chatbot has access to recent messages, discarding the older ones. 

The second uses the same LLM to summarise the conversation history, trading off a level of detail for a large reduction in tokens.  

We use a combination of these methodologies with ConversationSummaryBufferMemory,  keeping a buffer of recent interactions in memory, but rather than just completely flushing old interactions it compiles them into a summary and uses both. This allows us to utilise the advantages of both while keeping costs down. 

