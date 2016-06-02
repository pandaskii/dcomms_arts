GovCMS subtheme
===============


## Overview

This project is a GovCMS subtheme project.

## Styleguide Instructions

download and install node.js from http://nodejs.org/download

npm install

bundle install

sudo npm install gulp -g

sudo npm install bower -g

bower install

gulp watch -- This will spin up a styleguide server, go to http://localhost:8080/styleguide to view.

At this point there is an issue with markup not reloading properly, you need to manually re-run "gulp watch" until this is fixed.


## Styleguide Instructions - Javascript/CSS workflow

Dcomms front-end workflow leverages Gulp and Bower heavily to manage both external libraries and internal components.

Bower first looks at dependencies specified in the bower.json 

We use an npm module called main-bower-files to extract [main](http://stackoverflow.com/questions/20391742/what-is-the-main-property-when-doing-bower-init) bower files
from bower_components and concatenate them into JS and CSS files that are separately loaded into the styleguide and theme.

The advantage of using Bower is that we are able track specific versions on Github and we are easily able to include scripts into styleguide and theme consistently.

To add a new library:
bower install mylibrary --save-dev
Then run "gulp" to move that library along with others to respective concatenated css or js files.

## Re-installing Dcomms after govcms update

```bash
$ phing build
$ phing db-sync
```
