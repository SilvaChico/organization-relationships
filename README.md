# Organization Relationships

RESTful service that stores organisations with relations
(parent to child relation). Organization name is unique. One organisation may have multiple
parents and daughters. All relations and organisations are inserted with one request (endpoint
1).
API has a feature to retrieve all relations of one organization (endpoint 2). This endpoint
response includes all parents, daughters and sisters of a given organization.

### Steps made:

- [ ] Implement endpoint 1
  - [ ] Create DB model
  - [ ] Create DB insertion
    - [ ] Create recursive function to insert nested objects
- [ ] Implement endpoint 2
  - [ ] Create DB query
  - [ ] Parse to desired output

### Run application by:

```
$npm install
$npm run start
```

### Design options

This application was developed using Node.js and MySql (due to task requirements).
