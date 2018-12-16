# Gather Canvassing
### WHY
<p>&nbsp&nbspGather is a project that was developed as project during my time at DevMountain Web Development Bootcamp. </p>

### WHAT
<p>&nbsp&nbspGather is a canvassing tool used to gather and analyze data from door to door interactions. If you find yourself losing hard copies of survey results or struggling to make sense of out of your multiple spreadsheets let Gather help you. This tool is designed to be accessable even for small companies, organizations, or individuals. With it's simple to use interface and mobile-responsive design, this tool can change the way you do canvassing.</p>


### GLOSSARY

-   **Survey**  - create a survey specifying a name, the unqiue data you want collected, and a goal
-   **Campaign**  - a particular advance of the survey. could by a particular day or place
-   **Canvasser**  - the people that will be gathering and inputting the data
-   **Profile**  - the individual data collected i.e. people, businesses, etc.
-   **Pin Number**  - this is a unique number for every Campaign that Canvassers can use to join a Campaign

### Web Stack Used

#### Front-End
- React.js
- CSS
- HTML
#### Back-end
- Node
- PostgresQL
- Express
#### DB Schema:

### HOW
-   Creating a Survey.

	-   Click on Create New Survey.
	-   Follow prompts to setup new Survey
	-   Set a goal of number of Profiles to gather.
	-   Name three custom fields for Survey. (NOTE: the three field types are text, integer, true or false. These cannot be changed.)

-   Adding a Campaign

	-   Click on a Survey and go to the Campaign tab.
	-   Create a new Campaign.

-   Viewing/Adding Canvassers.

	-   Manage Canvassers via the My Canvassers tab.

-   Sending pin number to Canvassers.

	-   In the Campaign tab click on the Campaign you would like to canvass for.
	-   Then click on the Send Text Message button.
	-   Next, select canvassers you would like to send Campaign Pin Number to.
	-   Edit message as needed and press Send.

-   Entering data as a Canvasser
	-   On the home page click on Join Campaign.
	-   Enter Pin Number received via text message.
	-   Next, enter name and phone number.
	-   You are then able to input data and view your recently added Profiles.

-   Finishing Campaign

	-   When finished gathering data for a particular Campaign you have the option to finish Campaign
	-   This can be done by click Finish Campaign on Campaign tab.
	-   Finishing a Campaign will make the Pin Number associated with it no longer work.
