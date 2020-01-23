# A to Z Backend

Backend for A to Z build week project

# Deployed Backend

[https://atoz-backend.herokuapp.com]

# Technologies

###### Production

- [Express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js
- [Bcryptjs](https://www.npmjs.com/package/body-parser): Allows you to store passwords securely in your database
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Generate and verify json web tokens to maintain a stateless api
- [Knex](https://www.npmjs.com/package/knex): Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use
- [Sqlite3](https://www.npmjs.com/package/sqlite3): Asynchronous, non-blocking SQLite3 bindings for Node.js.
- [Morgan](https://www.npmjs.com/package/morgan): `HTTP request logger middleware for Node.js`
- [Cors](https://www.npmjs.com/package/cors): CORS is a Node.js package for providing a Connect/Express middleware that can be used to enable CORS
- [Helmet](https://www.npmjs.com/package/helmet): Helmet helps you secure your Express apps by setting various HTTP headers
- [Dotenv](https://www.npmjs.com/package/dotenv): Dotenv is a zero-dependency module that loads environment variables from a .env file

###### Developer

- [Nodemon](https://www.npmjs.com/package/nodemon): nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected

# Setup

(# <--- signifies comment)
In your terminal run:

```
# Install dependencies
npm install

# Starts express server using nodemon
npm run server
```

# Table of Contents

- [Auth Routes](#auth-routes)

  - [Register User](#register)
  - [Login User](#login)

- [User Routes](#user-routes)

  - [Get User](#get-user)
  - [Get User by Id](#get-user-by-id)
  - [Update User](#update-user)
  - [Delete User](#delete-user)
  - [Get Experiences Users Attending](#get-experiences-users-attending)
  - [RSVP User to Experience](#rsvp-user-to-experience)
  - [Delete Experience Users Attending](#delete-experience-users-attending)

- [Experience Routes](#experience-routes)
  - [Get Experiences](#get-experiences)
  - [Get Experiences by Id](#get-experiences-by-id)
  - [Get Experience Added by Host User](#get-experience-added-by-host-user)
  - [Add Experience](#add-experience)
  - [Update Experience](#update-experience)
  - [Delete Experience](#delete-experience)

# AUTH ROUTES

## **REGISTER**

### **Registers a user**

_Method Url:_ `/api/register`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name         | type   | required | description    |
| ------------ | ------ | -------- | -------------- |
| `username`   | String | Yes      | Must be unique |
| `password`   | String | Yes      |                |
| `first_name` | String | Yes      |                |
| `last_name`  | String | Yes      |                |
| `email`      | String | No       |                |
| `city`       | String | No       |                |

_example:_

```

{
  "username": "username"
  "password": "password123",
  "first_name": "First Name",
  "last_name": "Last Name",
  "email": "Email@email.com",
  "city": "NYC",
}

```

#### Response

##### 201 (Created)

> If you successfully register a user the endpoint will return an HTTP response with a status code `201`,message, and a token as below.

_example:_

```
{
  "message": "Welcome user! You have been successfully registered!"
},
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI3IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MzM1NjUxLCJleHAiOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xFXoX"
}

```

##### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while registering"
}

```

---

## **LOGIN**

### **Logs a user in**

_Method Url:_ `/api/login`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type   | required | description                                                        |
| ---------- | ------ | -------- | ------------------------------------------------------------------ |
| `username` | String | Yes      | Must match a username in the database                              |
| `password` | String | Yes      | Must match a password in the database corresponding to email above |

_example:_

```
{
  "message": "Welcome, user!"
},
{
  "username": "username"
  "password": "password123",
}

```

#### Response

##### 200 (OK)

> If you successfully login, the endpoint will return an HTTP response with a status code `200`, message, and a token as below.

_example:_

```

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MDwiaWF0IjoxNTQ0MzM1NjUxLCJleHAuOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xGXnE",
}

```

##### 401 (Unauthorized)

> If you fail to login, the endpoint will return an HTTP response with a status code `401` which indicates the username and/or password entered is not valid.

_example:_

```

{
  message: "Wrong username or password. Try again."
}

```

##### 500 (Bad Request)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while logging in"
}

```

# USERS ROUTES

## **GET USER**

### **Get all users**

_Method Url:_ `/api/users`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> The endpoint will return an HTTP response with a status code 200 and a body as below.

_example:_

```

{
  "id": 1,
  "username": "username"
  "first_name": "First Name",
  "last_name": "Last Name",
  "email": "Email@email.com",
  "city": "NYC"
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Error getting users"
}

```

## **GET USER BY ID**

### **Get user profile by user id**

_Method Url:_ `/api/users/:id`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | No       | JSON Web Token           |

#### Response

##### 200 (OK)

> If the user profile is found in the database, the endpoint will return an HTTP response with a status code 200 and a body as below.

_example:_

```

{
  "id": 1,
  "username": "username"
  "first_name": "First Name",
  "last_name": "Last Name",
  "email": "Email@email.com",
  "city": "NYC"
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while getting that user profile"
}

```

## **UPDATE USER**

### **Update a user by user id**

_Method Url:_ `/api/users/:id`

_HTTP method:_ **[PUT]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description             |
| ---- | ------- | -------- | ----------------------- |
| id   | Integer | Yes      | ID of a specific seeker |

#### Body

| name         | type   | required | description |
| ------------ | ------ | -------- | ----------- |
| `username`   | String | No       |             |
| `first_name` | String | No       |             |
| `last_name`  | String | No       |             |
| `email`      | String | No       |             |
| `city`       | String | No       |             |

_example:_

```

{
  "username": "username",
  "name": "First Last",
  "first_name": "First Name",
  "last_name": "Last Name",
  "email": "Email@email.com",
  "city": "NYC"
}

```

#### Response

##### 200 (OK)

> If a seeker with the specified ID in the URL parameters is updated successfully in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

{
  "message": `Your profile has been successfully updated`
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while updating that profile"
}

```

## **DELETE USER**

### **Delete a USER by user id**

_Method Url:_ `/api/users/:id`

_HTTP method:_ **[DELETE]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description             |
| ---- | ------- | -------- | ----------------------- |
| id   | Integer | Yes      | ID of a specific seeker |

#### Response

##### 200 (OK)

> If a seeker with the specified ID in the URL parameters is deleted successfully in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

{
  "message": "1 user was successfully deleted"
}

```

#### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while deleting that user"
}

```

## **GET EXPERIENCES USERS ATTENDING**

### **Get the experiences your user has RSVPed for and will be attending**

The user_id is reserved for the user who created the experience

_Method Url:_ `/api/users/:id/experiences_attending`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If the users experiences are found in the database, the endpoint will return an HTTP response with a status code 200 and a body as below.

_example:_

```

{
  "user_id": 18,
  "experience_id": 1,
  "id": 1,
  "title": "Arts",
  "date": "date",
  "location": "location",
  "price": "$20",
  "description": "Art lessons for all ages"
}


```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Error getting users attending experiences"
}

```

## **RSVP USER TO EXPERIENCE**

### **RSVP to the experiences your user would like to attend**

The user_id is reserved for the user who created the experience

_Method Url:_ `/api/experiences/attend`

_HTTP method:_ **[POST]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Body

| name            | type   | required | description    |
| --------------- | ------ | -------- | -------------- |
| `user_id`       | String | Yes      | Must be unique |
| `experience_id` | String | Yes      |                |

_example:_

```

{
  "user_id": 18,
  "experience_id": 1
}

```

#### Response

##### 200 (OK)

> If the user is RSVPed for experience, the endpoint will return an HTTP response with a status code 200 and a body as below.

_example:_

```

{
    "message": "You have successfully registered for this experience! See you there!"
}



```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, there was an error registering for the experience"
}

```

## **DELETE EXPERIENCE USERS ATTENDING **

### ** Un-RSVPs user from an experience they are attending **

\*STILL BUGGY!\*

_Method Url:_ `/api/users/:id/experiences_attending`

_HTTP method:_ **[DELETE]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description             |
| ---- | ------- | -------- | ----------------------- |
| id   | Integer | Yes      | ID of a specific seeker |

#### Response

##### 200 (OK)

> If a user with the specified ID in the URL parameters is deleted successfully in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

{
  "message": "You are no longer attending this experience"
}

```

#### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while deleting that experience."
}
```

# EXPERIENCE ROUTES

## **GET EXPERIENCES**

### **Get all experiences**

_Method Url:_ `/api/experiences`

_HTTP method:_ **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Response

##### 200 (OK)

> The endpoint will return an HTTP response with a status code 200 and a body as below.

_example:_

```

{
  "experiences": [
        {
            "id": 1,
            "user_id": 1,
            "title": "Arts & crafts",
            "date": "9/2/19",
            "location": "Brooklyn, NY",
            "price": "$20",
            "description": "Art lessons for all ages"
        }
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, Theres been an error getting experiences"
}

```

## **GET EXPERIENCE BY ID**

### **Get experience by experience id**

_Method Url:_ `/api/experiences/:id`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | No       | JSON Web Token           |

#### Response

##### 200 (OK)

> If the experience is found in the database, the endpoint will return an HTTP response with a status code 200 and a body as below.

_example:_

```

{
   "id": 1,
    "user_id": 1,
    "title": "Arts & crafts",
    "date": "9/2/19",
    "location": "Brooklyn, NY",
    "price": "$20",
    "description": "Art lessons for all ages"
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while getting that experience"
}

```

## **GET EXPERIENCE ADDED BY HOST USER**

### **Get all experiences added by a particular host user**

_Method Url:_ `/api/users/:id/host_experiences`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> The endpoint will return an HTTP response with a status code 200 and a body as below.

_example:_

```

{
  "id": 1,
  "username": "new",
  "first_name": "First Name",
  "last_name": "Last Name",
  "email": "Email@email.com",
  "city": "NYC"
  "experiences": [
    {
        "id": 1,
        "user_id": 1,
        "title": "Arts & crafts",
        "date": "9/2/19",
        "location": "Brooklyn, NY",
        "price": "$20",
        "description": "Art lessons for all ages"
    }
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while getting that hosts experiences"
}

```

## **ADD EXPERIENCE**

### **Adds new experiences**

_Method Url:_ `/api/experiences`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name          | type   | required | description    |
| ------------- | ------ | -------- | -------------- |
| `user_id`     | Int    | No       |                |
| `title`       | String | Yes      | Must be unique |
| `date`        | String | Yes      |                |
| `location`    | String | Yes      |                |
| `price`       | String | No       |                |
| `description` | String | No       |                |

_example:_

```

{
  "user_id": 1,
  "title": "Arts & crafts",
  "date": "9/2/19",
  "location": "Brooklyn, NY",
  "price": "$20",
  "description": "Art lessons for all ages"
}

```

#### Response

##### 201 (Created)

> If you successfully post an experience the endpoint will return an HTTP response with a status code `201` and a body as below.

_example:_

```
{
  "id": 1,
  "user_id": 1,
  "title": "Arts & crafts",
  "date": "9/2/19",
  "location": "Brooklyn, NY",
  "price": "$20",
  "description": "Art lessons for all ages"
}

```

#### 404 (Not Found)

> If the user has not provided a title, date, or location, the endpoint will return an HTTP response with a status code `404` and a body as below.

_example:_

```

{
  "message": "Sorry, all new experiences require a title, date, and location."
}

```

##### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while added the experience"
}

```

## **UPDATE EXPERIENCE**

### **Update an experience by experience id**

_Method Url:_ `/api/experiences/:id`

_HTTP method:_ **[PUT]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description             |
| ---- | ------- | -------- | ----------------------- |
| id   | Integer | Yes      | ID of a specific seeker |

#### Body

| name          | type   | required | description    |
| ------------- | ------ | -------- | -------------- |
| `user_id`     | Int    | No       |                |
| `title`       | String | No       | Must be unique |
| `date`        | String | No       |                |
| `location`    | String | No       |                |
| `price`       | String | No       |                |
| `description` | String | No       |                |

_example:_

```

{
  "user_id": 1,
  "title": "Arts & crafts",
  "date": "9/2/19",
  "location": "Brooklyn, NY",
  "price": "$20",
  "description": "Art lessons for all ages"
}

```

#### Response

##### 200 (OK)

> If an experience with the specified ID in the URL parameters is updated successfully in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```
{ message: "Your experience has been successfully update" }
{
  "user_id": 1,
  "title": "Arts & crafts",
  "date": "9/2/19",
  "location": "Brooklyn, NY",
  "price": "$20",
  "description": "Art lessons for all ages"
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while updating that experience"
}

```

## **DELETE EXPERIENCE**

### **Delete a experience by experience id**

_Method Url:_ `/api/experiences/:id`

_HTTP method:_ **[DELETE]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description             |
| ---- | ------- | -------- | ----------------------- |
| id   | Integer | Yes      | ID of a specific seeker |

#### Response

##### 200 (OK)

> If an experience with the specified ID in the URL parameters is deleted successfully in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

{
  "message": "1 experience was successfully deleted"
}

```

#### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while deleting that experience"
}

```
