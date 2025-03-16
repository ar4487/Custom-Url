@echo off
echo Installing dependencies...
call npm cache clean --force
call npm install -g npm@latest
call npm install
echo Installation complete!
pause 