# Organization Relationships

RESTful service that stores organisations with relations
(parent to child relation). Organization name is unique. One organisation may have multiple
parents and daughters. All relations and organisations are inserted with one request (endpoint
1).
API has a feature to retrieve all relations of one organization (endpoint 2). This endpoint
response includes all parents, daughters and sisters of a given organization.

### Steps made:

- [x] Implement endpoint 1
  - [x] Create DB connection
  - [x] Create DB model
  - [x] Create DB insertion
    - [x] Create recursive function to insert nested objects
    - [x] Create parser from the recived object
- [x] Implement endpoint 2
  - [x] Create DB queries
  - [x] Parse to desired output
  - [x] Add pagination support

### Run application by:

```
$npm install
$npm run start
```

### Design options

This application was developed using Node.js and MySql (due to task requirements).
