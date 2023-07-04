---
layout: post
title: "Generate a global git commit hook"
date: 2023-07-04
description: # Add description
img: posts/git.jpg # Add image post (optional)
tags: [git, github, docker, terraform] # add tag
---

**Git Hooks** are scripts that Git can execute automatically when certain events occur, such as before or after a commit, push, or merge. There are several types of Git Hooks, each with a specific purpose. Pre-commit hooks, for example, can be used to enforce code formatting or run tests before a commit is made.

In this post we will set a global git hook that can be used in every local repository that we use. We will use a pre-commit hook that triggers a docker container to checks different terraform elements of our code.

#### Install Git

We suppose that git is allready installed but if needed here is the command to install it : 

    sudo apt install git-all

And you can check the version of the installed git using the command : 

    git --version

#### Configuring the global git hook 

First let's enable the git template that will contain all ours base hooks : 

    mkdir -p ~/.git-templates/hooks
    git config --global init.templatedir '~/.git-templates'

Next create a file that will contain our **pre-commit** script and make it executable : 

    touch ~/.git-templates/hooks/pre-commit
    chmod a+x ~/.git-templates/hooks/pre-commit

We will use a script that will execute a docker container to check the terraform code 

    #!/bin/bash
    docker run -e "USERID=$(id -u):$(id -g)" \
    --volume "${HOME}/.cache/pre-commit-terraform:/.cache" \
    -v $(pwd):/lint \
    -w /lint ghcr.io/antonbabenko/pre-commit-terraform:latest run \
    -a

#### Installing the hooks in a repository

Go to the repository in which you want to install the hooks and simply do : 
    
    git init

After that in you check the **.git/hooks** folder you will see the **pre-commit** hook installed.

And you're done ! The hook will be executed every time you commit a code inside the current repo.

#### Removing the hooks from the repository

To remove the hooks there is no git command available. You will simply have to remove the **.git/hooks** folder with the command :

    rm -rf .git/hooks
