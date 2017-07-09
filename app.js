var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId:'d35272b5-365e-44d9-869b-0ec5e1497514',
    appPassword: 'OAiOQN8qc9fEKkhpQ5XXJDu'
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

const developer = 'Developer';
const recruiter = '  Recruiter';
const yes='YES';
const no='NO';
const More='MORE';
const Meh='MEH';
// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.send("Hi There");
        session.sendTyping();
        setTimeout(function () {
        session.send("My name is Mr Hack and I help developers enhance their skills and get them hired by enterprises. I even help recruiters to find the best developer that suits their needs within three simple steps.");
    }, 5000);
        setTimeout(function () {
        session.beginDialog('askDev');
        }, 6000);
    },
    function (session, results) {
        switch (results.response.entity) {
                case recruiter:
                    session.send('This functionality is not yet implemented! Try resetting your password.');
                    session.reset();
                    break;
                case developer:
                    session.send('Cool ! Hope to see you build some great products for great enterprises');
                    session.send('Well ! At Cleverhires, we believe that resumes can never validate the amount of skills and potential that a developer has ');
                    builder.Prompts.choice(session,'Do you Agree?',[yes,no],{ listStyle: builder.ListStyle.button });
                    
                    break;
            }
    },
    function (session, results) {
        switch (results.response.entity) {
                case no:
                    session.send('Okey, May be ! Let me continue, we have created a gamified version for rating skills and performances for developers like you.');
                    builder.Prompts.choice(session,'Isn’t that interesting ?',[yes,no],{ listStyle: builder.ListStyle.button});
                    break;
                case yes:
                    session.send('You are one of our kind ! Hahaha ! Well, so for which we have created a gamified version for rating skills and performances for developers like you');
                    builder.Prompts.choice(session,'Isn’t that interesting ?',[yes,no],{ listStyle: builder.ListStyle.button});
                    
                    
                    break;
            }
    },
    function (session, results) {
        switch (results.response.entity) {
                case no:
                    session.send('Okey ! Anyways let me give you an idea about how this works ! So this platform will contain 42 levels. Each level will have some main as well as sub missions. Reminds you of GTA ! hehe..');
                    builder.Prompts.text(session,'Sorry, Can I know your name please ?');
                    break;
                case yes:
                    session.send('Woah ! So this platform will contain 42 levels. Each level will have some main as well as sub missions. Reminds you of GTA ! hehe..');
                    builder.Prompts.text(session,'Sorry, Can I know your name please ?');
                    
                    break;
            }
    },
    function (session, results) {
        session.send("Great "+results.response);
        session.sendTyping();
        setTimeout(function () {
        session.send('Let’s continue, as you complete each mission your ratings in the game will be increasing based on how you manage to complete the level.');
    }, 5000);
        session.sendTyping();
        setTimeout(function () {
        session.send('You will be developing projects related to C, C++, Web and many more as you progress');
    }, 6000);
        setTimeout(function () {
        session.send('This progress will also allow you to unlock jobs ');
        session.send('Theres even more exciting things up here ');
        builder.Prompts.choice(session,'',[More,Meh],{ listStyle: builder.ListStyle.button});
    }, 7000);
    setTimeout(function () {
    session.say('This is the text that Cortana displays', 'This is the text that is spoken by Cortana.');
    }, 8000);
    
                    
    }
]);

bot.dialog('askDev', [
    function (session) {
        builder.Prompts.choice(session,'Great! So are you a developer or a recruiter ?',[developer,recruiter],{ listStyle: builder.ListStyle.button });
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);
 
