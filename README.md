# react_app
This program is a project for Mechanical Engineers here at Stevens and so I wanted to see how quickly, knowing what I know, could I complete this project. The goal is to create a ReactJS app with three tabs. One is a calculator, one is a Google Maps API, and the last one is whatever you want. I decided my last tab should be a rotating image of a cat. Lets go over each of the tabs and how they work

# Calculator 

Instead of creating a native calculator in React JS or simply going through Python eval(), I thought I would try and implement what I know and what I can find online (with some help from ChatGPT) to create my own basic eval() function for Go since one is not implemented. The react interface was not created by me, it was made by this gentleman here and implemented into my program: 
https://www.sitepoint.com/react-tutorial-build-calculator-app/

Using this base interface I sent the expression to http://localhost:5001/api/calculate which is where my Go program would pick it up. The go program works by first tokenizing the expression and then further seperating these tokens into Operators and Values. This way I could easily apply the left most operator with the highest numerical value (Either 1 for +/- or 2 for *//) to the values between each other. To be honest I am still learning a lot of Go as this project was made so past the basic iteration and tokenizing ChatGPT was quite useful in cleaning up the ideas. Once this expression was evaluated, it was sent back as a float64 back to localhost:3000 to be displayed on the calculator. 

# Map

This was much faster then trying to figure out Go for the calculator since Google Maps graciously posts some very nice JS for their API. The key here is that well you need an API key to use. This is why to start this program it is ESSENTIAL you follow this format: 

set REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here && npm start

Or else the map won't really work. This enviorment variable is just to make sure I don't get my API key stolen. Past that most of this code was just finding ways to turn it into React JS and get it to fit

# Cat

Super basic rotating cat program in JS using onClick

# App

Brings it all together integrating tabs for each of these components and easily displaying each of them. 


# Conclusion

I think this project took me 2 days of working on and off and was fun. Wish I could have figured out more of the Go programming but it was interesting trying to interact with React JS for the first time and compare it with my previous JS expereience. Next time I would like to spend less time on debugging and instead most time understanding the basis of the program and getting it to work the first time. Overall a fun project to see what I could create given some constraints! 
