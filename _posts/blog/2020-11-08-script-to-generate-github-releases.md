---
layout: post
title: "Script to generate Github Releases"
date: 2020-11-08
description: # Add description
img:  # Add image post (optional)
tags: [github] # add tag
---

**Github Release** is a higher concept based on the git tags. A Release is created from an existing tag and can contain additional information like software package, release notes and links to binary files, for other people to use.

If you can easily manipulate Git elements using the git commands, for the Github objects like **Releases** we must pass via the Github API ([https://docs.github.com/v3/](https://docs.github.com/v3/)).

Here is a script that allows you to generate **Github Releases** easily : [https://github.com/martinraynov/gh\_release\_generator](https://github.com/martinraynov/gh_release_generator)

Personally I use this script in a Jenkins pipeline job. Once the build of my application is done and all the tests have passed successfully the job generates automatically the new **Github Release**.
