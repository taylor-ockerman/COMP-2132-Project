Hello Jeff!

Just a reminder to check the timeout function I used to delay the call of the "setUpGame()" function. I did this because when setUpGame() was called after loadData(), the data wouldn't actually be loaded in time, therefore making setup game impossible. I was thinking there was a better way to do this. Thanks for any insight!