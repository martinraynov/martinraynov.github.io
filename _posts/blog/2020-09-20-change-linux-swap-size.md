---
layout: post
title: "Change Linux swap size"
date: 2020-09-20
---

When you already have a swap partition installed and configured but you want to add a few Gigs you can do it without having to reinstall your Linux by following these simple steps.

First before starting with the configuration part check if you have swap enabled by using the following command :

    sudo swapon --show

The output will be some information about your current swap configuration 

    NAME      TYPE      SIZE USED PRIO/dev/dm-1 partition 980M   0B   -2

**Important. All the commands must be run as a sudo user !**

### 1. Create swap file

    sudo dd if=/dev/zero of=/swapfile bs=1024 count=1048576

for more information about dd use (dd --help)

### 2. Set correct permission on the swap 

    sudo chmod 600 /swapfile

### 3. Use the mkswap tool to set up a Linux swap area on the file:

    sudo mkswap /swapfile

### 4. Enable the swap file

    sudo swapon /swapfile

### 5. Make the changes permanent

Sometimes the swapfile must be added to the fstab to make the change permanent. On the Ubuntu 20.04 it seems to be unnecessary.

Open the /etc/fstab file 

    sudo vi /etc/fstab

and add the line :

    /swapfile swap swap defaults 0 0

### 6. Check the swap modification

You can use some of the following commands :

    free -hsudo swapon --show
