# Avoid API
1. Use Web Feed, Embed, or Social Plugin to save time to acheive the business goal

# Steps to audit an API
1. Ensure the API solves our business case
	* Select the best API method
	* Verify the API method by *"static"* previewing in browser
	* Verify the API method by *"dynamic"* previewing in browser tab or API console/explorer
		* Username or context should be used
1. Understand authentication
	* Create an app for the API key
	* Store secret and tokens in server file
	* Use a library or driver to aid with authenication steps

# Update server to consume API
1. New route
	* `src/api-teacher.js` is where API routes are defined for the server
