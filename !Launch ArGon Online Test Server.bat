@echo off
echo Argon Online - All rights to Nexon
echo Make sure WZ folder is named 'wz' inside property folder
echo Set up IP address in property - setting - serversettings.properties
@title [ARGON ONLINE] - Ver 1.2.1029 REV2
set CLASSPATH=.;Dist\*
java -Xms1G -Djavax.net.ssl.keyStore=filename.keystore -Djavax.net.ssl.keyStorePassword=passwd -Djavax.net.ssl.trustStore=filename.keystore -Djavax.net.ssl.trustStorePassword=passwd launch.Start
pause