# Utils

In here, there are some functions and constants that are needed during the execution of the scrapper, this is the space where you can find the way to use those functions.

---

### [files.js](#files.js)

**Description**

This function uses fs to work correctly, it will tell you if a file was created in the period of time that you specify by a parameter.
First, it will get the time when the file was created and the current date. Then, it get the difference of time between those two dates and depending of the answer it will return a boolean.

**Parameters**

- _hours_
  Time in hours of last update that you want to verify, it is a number.

- _path_
  It is the route or path of the file that you want to validate.

**Returns**

It returns true in case the difference of hours is les than the hours that are specified in the parameter. In the other hand, it will return false.

---

### getRows.js

**Description**

This function is just to get the quantity of rows in a table.
To achieve it, the function just get a text from a HTML site, where is located the number.

**Parameters**

- _selector_
  This is the HTML selector that tell the system where is located the number, it can be a identifier.

**Returns**

It returns a number, it can be a string or a integer.

---

### replyMessages.js

**Description**

In this file you can find some constants that are used during he execution to provide the user and developer messages that can help to know which part of the process is executing the scrapper.
To use it, it is needed that you import the file in where you want to use it.

---

### sendTableMessage.js

**Description**

This file help us to create a embed message to be sended by Discord. This function uses fs and MessageEmbed from Discord.
First it will read the information from the path provided in the parameter, and it will pass it to string.
Then, for each element it will obtain the key and its value and save that information in an array with the format we want.
At this point, we have an array with the information that will be setting in the embed message, to create it, we use another loop for each element of the previous array, using the function createEmbed, which receives the element, create the embed message and returns it to be saved in an array that will be returned.

**Paramters**

- _ROUTE_
  This is the location from the file that we want to use, it is important to use a JSON file that contains an array, with the structure: [{...},{...},...,{...}]

**Returns**

It returns an array of embed messages.

### tableToArray.js

**Description**

This function is to get the information of a table, to do this, first, with a querySelector, we obtain the elements of the table as an array, then, for each one of those elements (the row), we obtain its children (each cell), with that children, we push its information to a new array, if it is a empty cell, it will push some hyphens just to indicate that there is not information in that place.
Finally, it is returned an array with the data organized in arrays.

**Paramters**

- _selector_
  The HTML selector to identify the table, it is important to not add the 'tr' because it is added automatically by the function. It can be a identifier.

**Returns**

A tri-dimensional array with information of the table indicated in the parameter.

### validator.js

**Description**

This function uses the function of [files.js](#files.js) to get the validation, sending the first parameter, the hours.
It will verify if the file exists, if it exists, it will execute the function of files and return it. In the other case, it will return false.

**Paramters**

- _path_
  It is the route where is located the file to verify.

- _hours_
  This parameter is initialized in here and its default value is 20.

**Returns**

It can return the execution of the function [files.js](#files.js) or return false.
