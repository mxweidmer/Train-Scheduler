# Train-Scheduler

[Deployed Link](https://mxweidmer.github.io/Train-Scheduler/)

## Description
### This is a page used to display and add train schedules. The page displays the name of the train, the destination, the frequency in minutes, the time of next arrival, and the minutes till next arrival. The user also has the option to add more trains using the input form. If any of the fields are left blank, or if the time is not entered in military format, the form will not submit and the page will alert the user that there is an issue. If the form is filled out correctly, the train will be added straight away and the form will clear itself. The train data is stored in a firebase database for persistence across both page reloads and different browsers and computers. Every version of the page opened in different browsers will update in real time.

## Screenshots

The page |
:------------------:
![Page](https://github.com/mxweidmer/Train-Scheduler/blob/master/assets/images/main.JPG) |

Adding train data |
:------------------:
![Page update](https://github.com/mxweidmer/Train-Scheduler/blob/master/assets/images/add.gif) |

Input validation catching an error |
:------------------:
![Input validation](https://github.com/mxweidmer/Train-Scheduler/blob/master/assets/images/error.gif) |

Persistent data even when page is reloaded |
:------------------:
![Data persistence](https://github.com/mxweidmer/Train-Scheduler/blob/master/assets/images/reload.gif) |

## Code Details

Input validation |
:------------------:
![Input validation](https://github.com/mxweidmer/Train-Scheduler/blob/master/assets/images/input.JPG) |

Pushing data to database |
:------------------:
![Push to database](https://github.com/mxweidmer/Train-Scheduler/blob/master/assets/images/database.JPG) |

Time manipulation using Moment.js |
:------------------:
![Moment.js](https://github.com/mxweidmer/Train-Scheduler/blob/master/assets/images/time.JPG) |

### The styling for the page was made using bootstrap. A jumbotron for the header, and two different card bodies. One contains a table, the other a form.

## Technologies Used
* HTML
* Javascript
* JQuery
* Bootstrap
* Firebase
* Moment.js