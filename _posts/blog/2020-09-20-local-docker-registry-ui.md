---
layout: post
title: "Configure a local Docker registry UI"
date: 2020-09-20
description: # Add description
img:  # Add image post (optional)
tags: [docker] # add tag
---

Dockerhub is a very practical and useful website where you can find all the information about docker images and versions. But if you have a private registry configured, normally you can only access it using the [docker APIs](https://docs.docker.com/registry/spec/api/). There are some docker UI solutions that can be used to display locally all the images informations without having to use manually the APIs.

If you want an UI that can be used globally by your company I can suggest to use [Portus](http://port.us.org/). Portus can also connect to your company Active Directory and is very powerfull.

If you want to be able to check locally without having to make a bunch of configurations we can use a more basic tool called [Joxit](https://github.com/Joxit/docker-registry-ui)

In this tutorial I will show you how to use Joxit as a docker container (with docker-compose) behind a working instance of [Traefik](https://mraynov.blogspot.com/2020/09/traefik.html). You can also go to the github page and clone the code : [docker\_registryui](https://github.com/martinraynov/docker_registryui)

### 1. Configure your docker-compose file

    version: '3.7'
    
    networks:
      default:
        external: true
        name: lb-common
    
    services:
      registry-web:
        image: joxit/docker-registry-ui:static
        environment:
            - DELETE_IMAGES=true
            - REGISTRY_TITLE=${REGISTRY_DOMAIN}
            - REGISTRY_URL=${REGISTRY_DOMAIN}
        networks:
          default: 
            aliases: 
              - ${LOCAL_DOMAIN}
        deploy:
            replicas: "1"
            labels:
                traefik.backend: 'registryui-local'            traefik.frontend.rule: 'Host: ${LOCAL_DOMAIN}'
                traefik.enable: 'true'
                traefik.port: 80

### 2. Configuring your hosts file

Add into your **/etc/hosts** file a new line with the information about your new local url

  

    127.0.0.1    registryui.mraynov.local

### 3. Starting a new instance of Joxit

I personally use a bash script or Makefile (available in the github repo) to be able to restart it when I have to. 

  

    export REGISTRY_DOMAIN="https://docker-registry.mraynov.com" // URL OF THE REGISTRY
    export LOCAL_DOMAIN="registryui.mraynov.local" // LOCAL DOMAIN OF YOUR REGISTRY
    
    docker-compose -f docker-compose.yml up -d 
    

### 4. Checking if the instance is working

* You can check first if the docker container is runnning by using 

    docker ps

Normally you will have something like this : 

    CONTAINER ID        IMAGE                             COMMAND                  CREATED             STATUS              PORTS               NAMES
    84cd3f04d6d0        joxit/docker-registry-ui:static   "/bin/sh -c entrypoi…"   15 seconds ago      Up 13 seconds       80/tcp              registryui-tmp_registry-web.1.wkwa6e8amnoy8yc01jo9l7hh0
    

* You can also check your local Traefik UI (normally [http://127.0.0.1:8081/dashboard/](http://127.0.0.1:8081/dashboard/)) to see if you have the new instance loaded.

* Finally if everything is OK you can go to the local url that you have specified previously (LOCAL\_DOMAIN in my case [http://registryui.mraynov.local](http://registryui.mraynov.local)) and you will see a nice UI that displays everything that you have on your private registry.