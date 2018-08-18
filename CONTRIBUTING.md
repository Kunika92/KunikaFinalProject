# Setup your developer environment
* CLI
	* CLI is Command Line Interface otherwise known as Command Prompt, Powershell, Terminal, Bash, Shell
* [Node.js](http://nodejs.org/)
	* Install v8.9.x
		* Visit official website and install
	* Verify
		* Open CLI
		* Run `node -v`
		* Expect a version number
* Local dependencies (including gulp.js)
	* Install
		* Change directory to the web site root
		* Run `npm install`
	* Verify
		* Open CLI
		* Run `npm run start`

* Follow team standard with text editor
	* [Visual Studio Code](https://code.visualstudio.com/)
		* Install Extension(s)
			* EditorConfig for VS Code
			
* Avoid file conflicts
	* Instructor files end with the *teacher* suffix (i.e. tax.teacher.js)
	* In student mode, teacher files will not be added to `critical.js`
	* For node.js server files, if you want to alter my files then create and edit end with the *student* suffix
	* Update the /.gitignore file with *-student* to avoid committing your changes


# Start web server
## Visual Studio Code
1. View Integrated Terminal (Menu Bar > View > Integrated Terminal)
1. Type `npm run start` into terminal
1. Visit web server address in browser

## Windows Explorer
1. Navigate to web site root (i.e. c:/javascript/course-files)
1. Hold Shift key and Right click
1. Select `Open command window here`

## Commands
* *Ctrl + C* to kill process (Mac is *Command + C*)
* `npm run start` Start the web server
* `npm run start:student` Start your edited web server
* `npm run dev` Start the web server in developement mode watching files to lint, concat, and unit testing
* `npm run dev:student` Start your edited web server in developement mode watching files to lint, concat, and unit testing
* `npm run test` Execute JS unit test suite
* `npm run bundle` Manually prepare your JS for public
* `npm run lint` Manually lint your JS

## Bundled critical.js
1. All JavaScript files inside the `/course-files/src/js/*.js` are bundled and concatenated into `/course-files/public/js/critical.js`
1. Gulp.js has a build step that is executed with command `npm run dev` (into CLI)
	* To trigger the build, save a JavaScript file in the `src` folder
1. This file is created with the goal of decreasing the number of files downloaded by the browser; from many to one.


# File system
## Folders
* `/src/js/*` Folder for storing JavaScript source files. These files will be bundled into critical.js
* `/public/jQuery/*` jQuery course folder for storing HTML, CSS, images and other public static assets
* `/public/social-apis/*` Third-party APIs course folder for storing HTML, CSS, images and other public static assets

## Instructor provided files
* Dan will sync in-class content throughout the class duration.
* Use GitHub Desktop to get the latest files from GitHub.com to your local computer
* **Avoid** conflicts with Dan's file by applying your initials to your files such as *./math-student/sum.html* and *./math-student/sum.js*
	* Tip: Update the */.gitignore* file to include `*-student` to hide your custom files from Git
* Student may create a JavaScript file `/src/js/api-student.js` for server API routes
	* Routes cannot conflict, so rename the student route to be unique
	* Plugin name must be unique such as `exports.register.attributes = { name: 'api-student', version: '1.0.0' };`
