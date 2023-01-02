Feature: Specify how many events are returned on the page

Scenario: When user hasn't specified a number, 32 is the default number
Given a user hasn't specified a number of events to load
When a user open the app or runs a search
Then a maximum of 32 events will appear

Scenario: User can change the number of events they want to see
Given a user has specified a number of events to load
When a user open the app or runs a search
Then the number of events the user selected will be the maximum number of events shown