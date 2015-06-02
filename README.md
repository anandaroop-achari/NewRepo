<strong>Ticketing System POC</strong>

This application runs AngularJS on frontEnd and nodeJS on the back-end. MongoDB is used for storing data.

<strong>Steps To Deploy</strong>
<ol>
<li>Pull the project in local system. System must have node, npm, curl and mongodb installed</li>
<li>Start mongoDB server with "mongod --dbpath [Project path]/nodeServer/data"</li>
<li>Navigate to the folder 'nodeServer' and run 'npm start'</li>
<li>From the 'complainClient' folder, start mongoose web server</li>
<li>Go to mongoose Home page, Try Logging in with any user credentials, The server will create the user, if not present
<li>Check admin to create Admin user, admin can assign staffs to ticket entries(drag-drop), and also change the status of the tickets</li>
<li>Non-Admin users can create ticket, update them when they are not closed and update their credentials</li>
</ol>

