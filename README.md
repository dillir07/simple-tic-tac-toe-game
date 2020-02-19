
#  A simple tic-tac-toe game using Javascript

## Note: This is simple tic-tac-toe game not using techniques like Minmax algorithm.

I created this to understand and brainstorm the basic principles of the game on my own, before going to those.

The game goes like this...
We have 6 Straight lines in the game as follows.
<ul>
<li> 3 Rows </li>
<li> 3 Columns </li>
<li> 2 Diagonals </li>
<ul>

Let's call them as Lines, and each Line has 3 cells.
If all 3 cells have same symbol (X or O) in any line, then it's a win.

The game is just bunch of if/else conditions that goes as follows.
1. If you have 2 cells filled with your symbol, fill the third and that's a guaranteed win. If not go to step 2.
2. If your opponent has 2 cells filled with their symbol, put your symbol in the 3rd cell. If not go to step 3. (To prevent them from winning.)
3. Pick a cell randomly and proceed. (Isn't ideal way to select random cell.)
