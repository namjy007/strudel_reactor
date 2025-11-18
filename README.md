# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# About the App 
This app is a part of the COMPLETE assignment Part A AND Part B. The application basically lets you convert code into music but also edit the instruments in real time. 

# How to use: 
1. The play and pause button lets you play the music from the strudel directly 
2. The Restore button is supposed to lose all the settings currently imposed ( Doesnt work in this version) 
3. The Edit button is the main component here: it can let you increase the volume or decrease, Adds echo, and many other stuff to the instruments. ( The cancel button doesnt work in this version since it is only working as going back button will work perfectly in final draft) 
4. The Save button writes on to json and saves the settings and doesnt reset everytime you open the edit panel.
5. We have a Day and NIght button which lets you toggle and turn it dark and white in the background.
6. We have a Table that lets you Mute and Unmute intruments easily without having to go to the Sound Editor. 
7. The info button shows you the basic  info about the app.
8. The app can let users add echo, room, and speed to their instruments.
9. Users can also export and import their settings loaded into the music 

# UI and Controls
The application is Strudel which lets you play music and edit instruments the  way you like.

Theme: The app is a gray/black themed app which suits some poples liking to dark visuals. 
I have also a night toggle which turns the bakcgroung behind the components a darker gray.

Left Side:
This side is my Preprocessing text box area and the Strudel Mirror and the D3.

Right side:
Here are my main panels. The Control panel and the Sound Editor Panel.

Control Panel: 
1. PlayPauseButton: Toggles music playback.
2. Restore Button (red, currently not functional): Intended to reset settings.
3. Edit Button (brown): Opens the Sound Editor component.
4. Info Button: Opens The info panel
5. The Mute Table: Lets users mute and Unmute easily. 
1. 
Sound Editor: 
1. Allows per-instrument editing of volume, echo, reverse, room, and speed.
2. Each instrument has a navigation bar with "Previous", "Next", and direct buttons to switch instruments.
3. Uses accordion-style controls to expand/collapse each setting for a clean layout.
4. Sliders for numeric values (volume, room, speed) and checkboxes for boolean effects (echo, reverse).
5. Settings are saved in localStorage in JSON format to persist across sessions.

# Bootsrap
1. Buttons
2. Icons
3. Accordion 
4. Pagination
5. Checkboxes
6. Range Slider
And many more...

# Referemces:
I have refered some of the websites in my previous commit when i implemented them initially.
1. Paggination on Sound Editor panel 'Bootstrap. (n.d.). Pagination · Bootstrap (v4.0 documentation). https://getbootstrap.com/docs/4.0/components/pagination/' ( just a reference but imposed uising css styling )
2. Accordion added in SoundEditor panel 'Bootstrap. (n.d.). Accordion · Bootstrap (v5.3 documentation). Retrieved August 7, 2025, from https://getbootstrap.com/docs/5.3/components/accordion' 

# Feature: 
1. I have JSON handling implemented in my SoundEditor.js from line 33 to 75.  
2. Handling JSON import and export. 

# Additional Comments:
1. I have worked really hard on this, Covered evry single aspect i could.
2. I couldn't work on the D3 but i have attempted. I tried getting waveforms and also bars but none worked. I felt it was better to have a blank d3 and show i have attempted than to apply Marks (Course Cooridnator)
3. Json is done well, the layout is followed as to David's Recomendation of colors. ( I wanted to go with black shades) 
4. I have left the Main Arp to be left playing just in case it easier to differentiate between whats playing and whats not. 
5. Sorry if there is not much difference betwee partA and part B, i had a overload this semester hence couldnt catch up with working on the part B but i have still implemented everything according to the requirements. 


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
