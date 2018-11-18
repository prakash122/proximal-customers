# Nearer Customers

This is a simple application for finding points in a circle.

## Setup
This is written in Javascript and requires NodeJS, a JS runtime that can be installed following the instuctions from [here](https://nodejs.org/).

You can clone the repository and install the dependencies with `npm install`

## Running the application
You can run the application using `npm start`.
There are two files in the `data` directory of the repository which will be used as default input files unless you want to pass a custom input. 


### Input format
In case, you want to run the application with custom input  

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



## Distance calculation

Formula for the calculation used

![Formula](https://res.cloudinary.com/common/image/upload/c_scale,w_500/v1542477000/c3159d773b79d31c3f5ff176a6262fabd20cdbc9_ay4gl6.png)