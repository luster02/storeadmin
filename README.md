# Ecommerce admin panel skipForce  

### Introduction
skipForce is an alternative to build a functional ecommerce in a simple way.

### Quick Start
#### Prerequisites

* Nodejs >=10.13.0
* skipforce core (backend) running

##### Clone this repository then install dependencies

        npm install

##### Config endpoints 
in file global/endpoints.js setup graphql path and rest path.

```
export const heroku_graph = 'your-server-host/graphql'
export const heroku_rest = 'your-server-host'
```
##### Start server 
      
    npm start 