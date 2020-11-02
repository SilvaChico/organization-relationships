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

### Run application:


Plase create a .env file with the following constants:
```
PORT=

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```
Run the application by:
```
$npm install
$npm run start
```

### Deployment
The API is deployed at https://org-relationships.herokuapp.com/

### Endpoints:

#### Endpoint 1 /insertOrgs (POST)
Recives a JSON for example:
```JSON
{
            "org_name": "Paradise Island",
            "daughters": [{
                "org_name": "Banana tree",
                "daughters": [{
                    "org_name": "Yellow Banana"
                }, {
                    "org_name": "Brown Banana"
                }, {
                    "org_name": "Black Banana"
                }]
            }, {
                "org_name": "Big Banana tree",
                "daughters": [{
                    "org_name": "Yellow Banana"
                }, {
                    "org_name": "Brown Banana"
                }, {
                    "org_name": "Green Banana"
                }, {
                    "org_name": "Black Banana",
                    "daughters": [{
                        "org_name": "Phoneutria Spider"
                    }]
                }]
            }]
}
```


#### Endpoint 2 /getRelatedOrgs (GET)
Gets related organizations with a max o 100 orgs per page.
Example: /getRelatedOrgs/Black Banana?page=1

### Design options

This application was developed using Node.js and MySql (due to task requirements).
