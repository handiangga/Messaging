# Messaging

App for chatting with friend

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

&nbsp;

## RESTful endpoints

- "POST /register"
- "POST /login"
- "GET /message"
- "POST /message"
- "DELETE /message/:id"
- "GET /listFriend"
- "POST /listFriend"
- "DELETE /listFriend/:friendId"

### post /register

> register user

_Request Header_

```
  not needed
```

_Request Body_

```
{
  "name": "<user name to get insert into>",
  "email": "<user email to get insert into>",
  "username": "<user username to get insert into>",
  "password": "<user password to get insert into>",
  "phoneNumber": "<user phoneNumber to get insert into>",
  "gender": "<user gender to get insert into>",
  "imageProfile": "<user imageProfile to get insert into>",
}
```

_Response (201 - Created)_

```
{
  "id": <given id by the system>,
  "email": "<user email>",
}
```

_Response (400 - Bad Request)_

```
{
  "message": "validation required"
}
```

_Response (500 - Internal server error)_

```
{
  "message": "Internal server error"
}
```

## POST /login

> login user
> _Request Header_

```
  not needed
```

_Request Body_

```
{
  "email": "<user email to log in to>",
  "password": "<user password to log in to>",
}
```

_Response (200 - Ok!)_

```
{
  "access_token": <access_token>,
}
```

_Response (401 - Invalid credentials)_

```
{
  "message": "Email/password not match"
}
```

_Response (500 - Internal server error)_

```
{
  "message": "Internal server error"
}
```

---

### GET /message

> Get all message

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
  "listMessages": [
    {
      "id": 1,
      "from": "handi angga",
      "to": 2,
      "message": "Hallooooo ded",
      "status": "unread",
      "createdAt": "Sat Nov 27 2021 23:23:10 GMT+0700 (Western Indonesia Time)"
    },
    {
      "id": 3,
      "from": "deddy co",
      "to": 1,
      "message": "Hallooooo juga broo",
      "status": "unread",
      "createdAt": "Sun Nov 28 2021 00:34:50 GMT+0700 (Western Indonesia Time)"
    }
  ]
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

### POST /message

> Create new message

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "message": "<name to get insert into>",
  "to": "<id user>"
}
```

_Response (201 - Created)_

```
{
  "message": {
      "id": 4,
      "message": "Hallooooo juga broo",
      "status": "unread",
      "updatedAt": "2021-11-29T14:50:36.578Z",
      "createdAt": "2021-11-29T14:50:36.578Z"
  },
  "userMessage": {
      "id": 4,
      "UserId": 2,
      "MessageId": 4,
      "to": 1,
      "updatedAt": "2021-11-29T14:50:36.603Z",
      "createdAt": "2021-11-29T14:50:36.603Z"
  }
}
```

_Response (400 - Bad Request)_

```
{
  "message": "Bad Request"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

## DELETE /message/:id

> Delete message by Id

_URL Params_

Required:

```
id=[integer]

```

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200-OK!)_

```
{
  "message": "Message has been deleted"
}
```

_Response (404 - Not Found)_

```
{
  "message": "Message not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### GET /listFriend

> Get all listFriend

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
  {
    "id": 2,
    "UserId": "<your User Id>",
    "friendId": "<your friend Id>"
  }
]

```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

### POST /listFriend

> Create new listFriend

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "friendId": "<your friend Id>"
}
```

_Response (201 - Created)_

```
{
  "id": 10,
  "UserId": 2,
  "friendId": 2,
  "updatedAt": "2021-11-29T15:10:00.775Z",
  "createdAt": "2021-11-29T15:10:00.775Z"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "Friend already exist"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "Sequelize ForeignKey Not Found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

## DELETE /message/:friendId

> Delete message by Id

_URL Params_

Required:

```
id=[integer]

```

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200-OK!)_

```
{
  "message": "Friend has been deleted"
}
```

_Response (404 - Not Found)_

```
{
  "message": "Message not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```
