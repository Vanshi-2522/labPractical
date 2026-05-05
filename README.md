Problem 5: Authentication using Session & Cookies
Task:
Build a simple login system using Express + Session (NO JWT)
1. Dummy User (hardcoded)
username: admin
password: 1234

2. Routes
🔹/login (POST)
● Check username & password
● If correct:
○ Create session
○ Store user in session
○ Send response: "Login Successful"
● If wrong:
○ "Invalid Credentials"
🔹 /dashboard (GET)
● Protected route
● Only accessible if user is logged in (session exists)
🔹 /logout (GET)
● Destroy session
● Send "Logged out successfully"
Requirements
● Use express-session
● Use cookies (default with session)
● Create middleware to protect /dashboard
