---
layout: post
title: "Switching between Python versions (LINUX)"
date: 2021-11-17
description: # Add description
img: posts/switching-between-python-versions_1.png # Add image post (optional)
tags: [python] # add tag
---

When you install a new version of python it won't always update your basic **python** and **python3** commands. To configure your environment to use the latest version you have to make some configuration.

Install the latest version of python :

    apt install python3.X

You must then define the default version that will be executed with the **python** and **python3** commands. You can always use the command that calls the specific version of the binary you want to execute :

    python3.X .....

But to be able to use the default **python** and **python3** commands you need to create a list of update alternatives.

#### Alternatives for python

    sudo update-alternatives --install /usr/bin/python python /usr/bin/python[old-version] 1
    sudo update-alternatives --install /usr/bin/python python /usr/bin/python[new-version] 2

#### Alternatives for python3

    sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python[old-version] 1
    sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python[new-version] 2

#### Setting priority status of the versions

Once the alternatives are set you must configure the priority of each version. Normally the weight (last character in the previous command) will be taken into account for the **auto mode**. But you can still check that the value is correctly set and change it by doing :

    sudo update-alternatives --config python
    sudo update-alternatives --config python3
