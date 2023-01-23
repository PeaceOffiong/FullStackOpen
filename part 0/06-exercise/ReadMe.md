sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: reponds with a status code 201 that the request has been fulfilled
    deactivate server
    
    Note right of browser: The server does not instruct the browser to reload the notes with a redirect
    
    
    
  
