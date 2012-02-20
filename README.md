# ICT Access in Trinidad and Tobago

ICT Coverage in Trinidad and Tobago

## What does it do?

<img src="http://www.muruca.org/wp-content/uploads/2010/10/rdf_200.png">



### Features include:

####Show the map with the following  ICT criteria 
* In “Community” view, the application must display, on a country map, all communities which are currently unserved by Internet service providers, as outlined in Telecommunications Authority of Trinidad and Tobago’s, TATT’s, Universality Framework (http://www.tatt.org.tt/LinkClick.aspx?fileticket=MVVTg3jB2Xs%3d&tabid=94), pages 89 - 91.
* In “Block” view, the application must display the 12 blocks of contiguous unserved communities defined by TATT
* In “Basket” view, the 6 universality baskets, each comprising 2 unserved blocks, must be displayed. 
* For each view, clicking in any of the unserved regions (community, block or basket, respectively) must return the following data for that region:
1. Its area, in km^2
2. Its number of households. In the case of the Block view, clicking on each of the regions (12 blocks), the application must additionally display:
3. Its characterization as rural, suburban or urban, where rural comprise less than 5,000 households; suburban comprises between 5,000 and 15,000 households; and urban comprises more than 15,000 households.
In addition to the graphical view of communities, blocks and baskets, the application must display a comparative account of the (i) total area (ii) total number of households and (iii) classification of each constituent block, across the 6 baskets to demonstrate equivalence/ equitability.

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

