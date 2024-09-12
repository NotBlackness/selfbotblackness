@echo off
echo.

:: Set the cmd window color to green (2)
color 2

:: Check if node_modules folder exists
IF NOT EXIST node_modules (
    :: Install dependencies only if node_modules folder doesn't exist
    npm install
)

:: Run the node . command
node .

pause
