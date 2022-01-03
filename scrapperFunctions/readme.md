# Scraper functions

## Functions

In here, you can find the information about how does the library works, if it needs params, which type of value returns, etc.
It is recommended that you read this information so you can understand the operation of each function.

It uses getRows and tableToArray from other files to complete some tasks.

### ScrapPage

---

**Description**

This is the main function, where all the other functions are inherited.
Here, only the variables are initialized, those variables are needed in all the next functions.

**Parameters**

- _Browser_
  It is a instance of puppeteer, it is created in webScraping/index.js file.
  This parameter allows us to use all the functions of [Puppeteer](https://devdocs.io/puppeteer/ 'Puppeteer').

### openNewPage

---

**Description**

In this function, a new page is going to be open, and when that occurs, it is going to redirect to the specific URL which de user gives us by the parameters.
This is a asynchronous function.

**Parameters**

- _URLPage_
  It is a string that tell us to which page wants to go the user.
  It can be a string with the format of a url, like: http://www.example.com, or any string like: example. It depends of what would you like to do or search.

### closeBrowser

---

**Description**

Here, only you need to wait for the browser to close. Is a asynchronous function.
If you do not put this function at the end of you process, the browser will not close, and the process will not finish.

### fillInput

---

**Description**

fillInput is a asynchronous function, where you can be able of put data in some input, this is only to write the data, it does not search anything, to do it you should use other function.

**Parameters**

- _id_
  This parameter must be a string, it identifies the input where the text is going to be written.
  It can be an id or a selector, you can find them using the inspector of your browser.

- _text_
  In here, we find a string again, this parameter indicates what is the word or sentence that will be written in the input indicated before.

- _time_
  This parameter indicates how much time we are going to wait for the results of that search. Do not forget that number is going to be taken in milliseconds, so, for example, if I want to wait two seconds for the page finishes the charge, I need to put the number 2000.

### [clickButton](#clickButton)

---

**Description**

In this function, basically, we can find a way to click a button, this can be made with the Puppeteer library.

**Parameters**

- _id_
  This parameter receives a string, which is going to identify the button, how mentioned before, it can be an id, or a selector.

- _time_
  This is the time that the page is going to wait to charge the changes. It, also, is written in milliseconds.

### [expectedRows](#expectedRows)

---

**Description**

This function is for collect some data, in this case, the number of rows in some table, but you can get some text, or information.
It uses [getRows](#getRows) to complete the process.

**Parameters**

- _select_
  This is the selector which the function is going to use to evaluate the page to look for the coincidences. It also can be an id.

**Returns**
A string that means the number of rows in the table, or whatever the function could find with the selector.

### checkData

---

**Description**

This asynchronous function uses the other functions to bring the information needed.
First, it uses the [expectedRows](#expectedRows) to know how much data needs.
Next, it is time to use [getDataTable](#getDataTable) to get the data in the first screen.
After that, there is a validation, if the value of [expectedRows](#expectedRows) is not a number, the expected rows will be the quantity of data received in [getDataTable](#getDataTable). But, if it is a number, there is a validation that verify if the expected rows is less than the data obtained, id it is not true, the [progressBar](#progressBar) will be executed, then, [clickButton](#clickButton) to go where the table continues, and [getDataTable](#getDataTable) again.
Finally, the [progressBar](#progressBar) is executed again to print 100%.

**Parameters**

- _tableSelector_
  It is a string which indicates the table where the information is going to be taken. [getDataTable](#getDataTable) uses this parameter.

- _rowSelector_
  It indicates where can be find the number of a rows, that the table has. It is a string. [expectedRows](#expectedRows) uses this parameter.

- _nextPageButton_
  This parameter is how the page will identify the button to click to go to the next part of the table. Send a empty string if there is no more pages. [clickButton](#clickButton) uses this parameter.

- _time_
  This parameter is a number, that indicates how many seconds will wait the page to do a process. [clickButton](#clickButton) uses this parameter.

- _callback_
  [progressBar](#progressBar) uses this parameter to complete its process.

**Returns**

A two-dimensional array. It is an array which has array in there.
The two-dimensional array is the entire table. Each element (array) of the two-dimensional array is a row of the table. And each element of each one-dimensional array is a cell of the table.

### [progressBar](#progressBar)

---

**Description**

Here, it is a function which only do a Math operation, to obtain a number that means how much information has been obtained.

**Parameters**

- _data_
  Is a number that indicates the quantity of data that has been obtained at the moment.

- _expected_
  Is a number which indicates the total data that we are waiting for.

- _callback_
  This is a function that the user must write to print the number that is going to obtain with this function, for example:
  `console.log(percentage.toString(), '%');`

**Returns**

The number obtained in the Math operation.

### [getDataTable](#getDataTable)

---

**Description**

To make it work, it needs the [tableToArrays](#tableToArrays) function, we pass the selector of the table and it gives us the data. But the data has the headers, to drop it, we use shift(). This is an asynchronous function.

**Parameters**

- _select_
  Is, how can I find the table to get the information, we must send a string.

**Returns**

A two-dimensional array without the headers of the table.

### saveFile

---

**Description**

You can use this function to write a file and save it wherever you want. This function works with [File System](https://nodejs.org/api/fs.html 'File System').

**Parameters**

- _data_
  This is the information that is going to be saved in the file. It should be in JSON format.

- _route_
  This is a string that identifies where the file will be saved, do not forget the extension: '.json'.

**Returns**

A two-dimensional array that has all the data of the table.

### selectFlag

---

**Description**

In this function, first, the flag and its value are separated to work with them separately. Depending of the flag, it will enter to a switch-case and depending its value, it will select a option from the element (idSelect).
If that flag does not exist in there, it will send you a message.

**Parameters**

- _flag_
  This is a bi-dimensional array, in each uni-dimensional array, you must have the flag and its value.

- _idSelect_
  Where will you need to use the flag? For example, this flag can modify a select option element, this, is the ID that the scap needs.
