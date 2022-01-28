/**
 * In this file you can find some constants that are used during he
 * execution to provide the user and developer messages that can help to
 * know which part of the process is executing the scrapper.
 * To use it, it is needed that you import the file in where you want to use it.
 */

const GENERAL = {
  ERROR: 'Error: ',
  ERROR_EXECUTION: 'Error in the execution...',
  ERROR_EXECUTION_COMMAND: 'Error trying to execute that command.',
};
const BOT_REPLIES = {
  NEEDS_PARAMETER: 'The command needs a searching parameter.',
  LOADING: 'Loading data ',
  DATA_COMPLETED: 'That is all the data I found.',
  // eslint-disable-next-line quotes
  NO_DATA_WITH: "There's no data available with ",
  NEEDS_EXECUTE_SCRAPPER:
    'It is needed to execute the scrapper to collect the data, executing...',
  NO_NEEDS_EXECUTE_SCRAPPER:
    // eslint-disable-next-line max-len
    'It is not needed to execute the scrapper, the last execution was in the last 20 hours.',
};
const CONSOLE_REPLIES = {
  EXPECT_DATA: 'Expected data: ',
  GETTING_DATA: 'Getting data...',
  OPENING_BROWSER: 'Opening a new browser...',
  OPENING_TAB: 'Opening a new tab...',
  OPEN_PAGE_CORRECTLY: ' has been opened successfully.',
  FILL_CORRECTLY: 'Fields filled correctly',
  SEARCHING: 'Searching...',
  SEARCH_CORRECT: 'Search successful',
  NO_DATA: 'There is no data available.',
  BROWSER_CLOSED: 'Browser closed successfully',
  GET_DATA: 'Obtained data: ',
  SAVING_DATA: 'Saving data...',
  SAVED_IN: 'Data saved in: ',
  READY: 'The bot is ready for work.',
};

module.exports = {
  GENERAL,
  BOT_REPLIES,
  CONSOLE_REPLIES,
};
