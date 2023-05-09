# MyChatapp

## Code Quality 
 AirBNB

## GITHUB
https://github.com/uzma981/MyChatapp 

## Draft Screen
Due to the time constraint in the screen cast, i was unable to explain the reason behind the reason as to why my solution for the draft screen was implemented
1. I have implemented the schedule message to only schedule the draft message depending on the TIME. I have left out scheduling the draft message where the user can choose to pick the date aswell due to the limitation of the server and the scope of the project.
To schedule both date and time would mean that the server would constantly run in the background. However, for this assignment, when i switch off my laptop, the server stops running. It would be unrealistic to keep my laptop on for a long set of hours to see if the message has sent at the specified future date and time.
2. The problem was first trying to implement both the DATE and TIME, which i found unrealistic. Trying to schedule a day for a future date would mean i would have to keep the server running constantly.
3. To overcome this problem i stuck to schedulling the draft message just based on TIME. This means that the user is able to schedule their message only on the same day.
For instance, if the user sets a time for 3 PM on May 8th while the current time is 2 PM on the same day, the application will automatically use the current day, which is May 8th.