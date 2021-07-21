try {
    const OpenBrowser = require('./cfeScraping/index.js');

    'use strict';
    // we're gonna use strict  mode in all

    console.log('Hello Message');
    OpenBrowser.OpenBrowser();

} catch (err) {
    console.error('An error have been occurred:', err);
}