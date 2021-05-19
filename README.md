# RESTful API example 

This is an example of a RESTful API written in:
- Node js
- Typescript js

It also uses:
- SQLite3
- Prisma 
- express-validator
- mocha & chai & supertest

## Install dependencies

    npm install

## Run the app

    npm start

## Run the tests

    npm test

# REST API

The REST API to the example app is described below.

## Create user

### Request

`POST /user`

{
	email: "test@test.com",
	firstName= "first name",
	lastName= "last name",
	password="password1"
}

### Response

    HTTP/1.1 200 OK 
{
	id:1,
	email: "test@test.com",
	firstName= "first name",
	lastName= "last name".
	password="password1"
}

## Login

### Request

`POST /session`

{
	email: "test@test.com",
	password="password1"
}

### Response

    HTTP/1.1 200 OK  
{
	token:"tokendata...",
	user: userData
}

## Get movies by keyWOrd

### Request

`GET /movie?keyWord=keyWord1`


### Response
Returns list of movies filtered by keyWord

    HTTP/1.1 200 OK 
[
	{
		"id": 635302,
	    "adult": false, 
	    "original_language": "ja"
	    ...
	    ..
	},
	{
		...
	}
]

## Add movie to favourites

### Request

`GET user/userId1/movie/movieId1`

### Response 
    HTTP/1.1 200 OK 

## Get favourites user movies

### Request

`GET user/userId1/movie`

### Response 
    HTTP/1.1 200 OK 
Returns list of movies filtered by keyWord

    HTTP/1.1 200 OK 
[
	{
		"id": 635302,
	    "adult": false, 
	    "original_language": "ja"
	    ...
	    ..
	},
	{
		...
	}
]
