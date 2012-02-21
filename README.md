# ICT Access in Trinidad and Tobago

ICT Coverage in Trinidad and Tobago

## What does it do?

<img src="http://www.muruca.org/wp-content/uploads/2010/10/rdf_200.png">



### Features include:

####Show the map with the following  ICT criteria 
* In “Community” view, the application must display, on a country map, all communities which are currently unserved by Internet service providers, as outlined in Telecommunications Authority of Trinidad and Tobago’s, TATT’s, Universality Framework (http://www.tatt.org.tt/LinkClick.aspx?fileticket=MVVTg3jB2Xs%3d&tabid=94), pages 89 - 91.
* In “Block” view, the application must display the 12 blocks of contiguous unserved communities defined by TATT
* In “Basket” view, the 6 universality baskets, each comprising 2 unserved blocks, must be displayed. 

# How do I install ictAccessTT? #
## Install on dev machine

```bash
$ git clone https://github.com/OPowerd/ictAccessTT.git
```
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
 * Download ictAccessTT by cloning this repository:

```bash
$ git clone https://github.com/OPowerd/ictAccessTT.git
```
* As above

Or download the ictAccessTT zip file - (https://github.com/OPowerd/ictAccessTT/zipball/master).

