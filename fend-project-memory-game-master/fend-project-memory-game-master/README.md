# Memory Game Project

### Description:
* This project is a single page web application to play a matching game of cards.
* Once loaded the html content of cards is added to the web page in hidden way.
* User can start the game by clicking play button.
* Only one event is added on click to make sure user can start only one session of game at a time.
* Button is disabled once the game starts, to understand visual effect of button disabled.
* Once button is clicked, timer starts and user can click on the different cards and start playing memory game.
* User can notice number of moves, and depending on that the stars will be updated.
* When user completes matching of all cards, page displays a modular pop up with calculated score, 
number of stars achieved and total time in min:sec format.

### Table of Contents -_Functional details:_
* Creates html content of cards and adds initial stars to page.
* Updates timer in the format ```min:sec```: _Timer is defined using ```setIntevral()``` method to update on every second interval and update a minute after 60 seconds_
* Shuffles the cards and refreshes the card deck with shuffled one.
* Adds function to display and check cards matching status as a event listener to click event on each card. On matching sets the cards as matched. On mis-match hides the cards again.
* Once all cards matched, stops the timer and displays result message
with score, time taken and number of stars achieved i.e. performance meausre.
* Game score is calculated using a formula ``` precisionRound(500000 / (totalTime * (moveCounter-8)),-2) ```
_where moveCounter is number of moves and totalTime is toatl time taken in seconds_
_Total time is calculated using ```performance.now()```_

* Restarting game is also available upon clicking **restart** button.

### Installation: 
To install this Game, click on index.html of the source folder.
Or direct location of index.html inside your pc's directory and open the path in the browser.

### Dependencies:
_Include below dependencies inside head element of index html:_
* [Bootstrap library](https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css) used for css styling. 
* [Google fonts](https://fonts.googleapis.com/css?family=Coda) used to style the fonts of score panel.
* [Google fonts](https://fonts.googleapis.com/css?family=Orbitron) used to style the digital fonts of timer

### Usage: 
On successful web page loading, start the game by clicking start the Game button.
Then Timer will start and cards will be enabled for click and to check matching subsequently.

### Credits: _Triveni Vikrant Londhe._

### License: 
MIT License
Copyright (c) [2018] [Triveni Vikrant Londhe]
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

