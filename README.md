# Proximal Customers

This is a simple application for identifying customers winthin a given radius. 

## Setup
This is written in Javascript and requires NodeJS, a JS runtime that can be installed by following the instuctions from [here](https://nodejs.org/).

You can clone the repository and install the dependencies with `npm install`

## Running the application

You can run the application using `npm start`.
There are two files in the `data` directory of the repository which will be used as default input files unless you want to pass a custom input. 


### Custom Input format
In case, you want to run the application with custom input by providing the circle information and customer data. You can run the application with custom data paths like below

```
> npm start customer=./data/customers.txt circle-definition=./data/default-circle.json
```

##### Circle Info
This is not a cicle on a 2D Plane but, it is a circle placed over a Sphere. For ease of understanding I used the terminology of a circle, it's center and it's radius.

```
  {
    "center": [
      53.339428,
      -6.257664
    ],
    "radius": 100
  }
```

##### Customer Data
A single customer record will be holding his geo-location along with his name and user_id. Customer data will be a simple text file unlike the circle info as the customer data can be huge and will give us a flexibility of reading line by line where each line representing a customer record in JSON format. Customer data will be looking like

```
{"latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701"}
{"latitude": "51.92893", "user_id": 1, "name": "Alice Cahill", "longitude": "-10.27699"}
{"latitude": "51.8856167", "user_id": 2, "name": "Ian McArdle", "longitude": "-10.4240951"}

```

## Tests
Tests have been written for all the `libs` and `utils`. Main logic is in them. So, no tests are written on index.js. To check all the tests the application has run `npm test`. Code coverage can be viewed using `npm run coverage`

## Distance calculation

[Great-Circle distance](https://en.wikipedia.org/wiki/Great-circle_distance) is the formula used for calculating distance between 2 geo-locations. 

![Formula](https://res.cloudinary.com/common/image/upload/c_scale,w_500/v1542477000/c3159d773b79d31c3f5ff176a6262fabd20cdbc9_ay4gl6.png)


## Coding Thought process
I would like to walk through the thought process behind the implementation.

##### Conventions

Code organization is easily comprehensible but naming convention is something I really like and would like to talk about it. Except the file `index.js` (which is to be the main file of `src` directory) every file has it's own role and functionality. Name of a file should be coming both of these. 

The main logic is processing the customer record and checking if he/she is in proximity which is covered by `index.js`. Rest of the files are providing valuable utilities to attain this task. So, each of them is named `{domain}`.`utils`.js

##### Output
Output of the application is logged to the console along with writing to a file with a dynamic name into a folder called `output`. It will help in cross checking the outputs with different inputs. Don't worry on multiple files getting created, you can clear all of them with `npm run clean`.

##### Synchronous I/O
There are few places I used a synchronous I/O which is not right in a single threaded Event based I/O platform. But, given no input data this application is useless so I chose to go with synchronous I/O. 

##### Clustering
NodeJS uses a single core of the processor unless clustering is used. The complex computation that can be run on multiple cores is the distance calculation. 

Currently, a simple distance calculation is taking less than `1 micro second`. If this is more and we want to increase the speed of our application taking advantage of the NodeJS cluster we can push the calculation to a new process and once the distance is computed the created child process will inform the master and master will collect the nearby customers from all the processes and show the results.