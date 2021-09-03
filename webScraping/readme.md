# Web Scraping

**Contents**

[TOC]

## Functions

### Scrapper

---

** Description **

In here, the values needed are initialized, in this case we only need the text, a parameter which the scrapper will search.

** Parameters **

- [_text_](#text)
  It is a string that indicates what the scrapper is going to search.

### [newBrowser](#newBrowser)

---

** Description **

In here, we use the Puppeteer library to open the browser. This is the first step to do the scrap.

** Returns **

A new browser, that is to say, a instance of Puppeteer.

### [createObject](#createObject)

---

** Description **

This function create the object in JSON format, it receives the data and assigns each value to a key.

** Parameters **

- _item_
  This is an array, and each element is the item. To use it, is needed the function map().

** Returns **

A object in JSON format.

### [printPercentage](#printPercentage)

---

** Description **

This is a function which the user can edit, to his own preferences, to show the advance of the data obtained. You can choose if only print the number or add something more. This function is called from progressBar function.

** Parameters **

- _percentage_
  This is a number provided from progressBar, it means how much data has been obtained at that moment.

### [doScraping](#doScraping)

---

** Description **

This function is the **main function**, and also, it is asynchronous.
First, uses the [newBrowser](#newBrowser) function to create the instance that is going to be used along the process.
Then, is created a instance of [ScrapPage](#scrapPage) to use the functions provided.
The next step is open a new page with the [url](#url) provided.
Now, it is time to fill the form, with the fillInput function. In here, we will need the [idInput](#idInput), the text and the [waitingTime](#waitingTime).
After that, you can click the button to search it, in here, you will need the [idButton](#idButton) and also the [waitingTime](#waitingTime).
So, at this point it is time to execute the checkData function, and it needs the [tableSelector](#tableSelector), [rowSelector](#rowSelector), [nextPageBtn](#nextPageBtn), [waitingTime](#waitingTime) and a callback as parameters, the callback will be the [printPercentage](#printPercentage) function.
Next, we find a arrow function to create the data that will be saved in the file, to do it, is needed the [createObject](#createObject) function.
Once done, you can save that information with the saveFile function, you need the data and the [route](#route) where the data is going to be saved.
Finally, you need to close the browser to end the process.

## Variables

We use some variables to make the scrapper work, all those variables are used along the code. If you do not need to use some of those variables, it can be a empty string.

- **puppeteer**
  This variable is used to call the Puppeteer library to can use the functions in there.

- [**ScrapPage**](#scrapPage)
  In there, wa call the library which contains the functions that the scrapper uses to work.

- [**URLPage**](#url)
  It is the address which the page is going to redirect. It is a string.

- [**idInput**](#idInput)
  It is the identifier of the place where the text will be written. It is a string.

- [**idButton**](#idButton)
  To search the text of the idInput, we need to click a button, this is the identifier, it is a string.

- [**waitingTime**](#waitingTime)
  This is a number, that indicates how much time the page should wait to do some process.

- [**route**](#route)
  Where the file will be saved after to execute a function. This is a string.

- [**nextPageBtn**](#nextPageBtn)
  This is a string that identifies where is the button to go to next part of the table.

- [**tableSelector**](#tableSelector)
  This is a string which has the identifier o the selector of the table, how can the scrapper find it?

- [**rowSelector**](#rowSelector)
  This is the identifier of the place where is the number of the rows.

## What do I need to use those functions?

To use the functions explained before, you only need to import the library, after that, create a instance of that. Remember, you must send a parameter, a [text](#text), which is the word or sentence that the scrapper will use to search.
Finally, you only need to execute the [doScraping](#doScraping) function and wait for the results.

    const Scrapper = require('./webScraping/index');
    const text = 'example';
    const myScrap = new Scrapper(text);
    myScrap.doScraping();
