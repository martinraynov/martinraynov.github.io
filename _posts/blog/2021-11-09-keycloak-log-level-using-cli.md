---
layout: post
title: "Keycloak : How to set log level via command line"
date: 2021-11-09
---

Keycloak is an open source identity and access management solution (SSO). It's a pretty complete solution but like all complexe application is difficult to debug.

By default the log level of Keycloak is set to **INFO** but you have different approaches to change it : 

* config file (if you are using an installed instance) 
* environment parameters (if you use docker)
* via the jboss command line

In this post we will explain how to do it by using the command line. The big difference between the first two and the **cli** is that you don't need to restart the application !

#### Connect to your application in SSH 

    ssh username@servername

#### Go to your Keycloak the installation folder in the **bin** folder

In my case it is l.ocated in the folder **/srv/keycloak/bin**

#### Run the jboss command line file

    ./jboss-cli.sh

#### Connect to your local instance of Keycloak

    connect

#### Set the new log level

    /subsystem=logging/logger=org.keycloak.services.resources:add(level=DEBUG)

The log levels available are : 

* ALL
* DEBUG
* ERROR
* FATAL
* INFO
* OFF
* TRACE
* WARN
