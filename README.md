# ICT Access in Trinidad and Tobago

How the ICT Coverage in Trinidad and Tobago

## What does it do?

<img src="http://www.muruca.org/wp-content/uploads/2010/10/rdf_200.png">



### Features include:

* Show the map with various ICT criteria 

## Install on dev machine
* git clone https://github.com/OPowerd/ictAccessTT
* cd myproject
* npm install
* vi siteConfig.js # update config for your use case
* node server.js

## Install on no.de
* First on node machine
	* ssh node@yourname.no.de
	* pkgin update; pkgin install redis
	* svccfg import /opt/local/share/smf/manifest/redis.xml
	* svcadm enable redis

* Then on local machine
	* git clone [https://github.com/OPowerd/ictAccessTT](https://github.com/OPowerd/ictAccessTT) myproject
	* cd myproject
	* cp siteConfig.sample.js siteConfig.js
	* edit siteConfig.js settings
	* scp siteConfig.js node@yourname.no.de:~
	* git remote add joyent node@yourname.no.de:repo
	* git push joyent master
	* open http://yourname.no.de
