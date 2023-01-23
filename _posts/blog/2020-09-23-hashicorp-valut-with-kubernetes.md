---
layout: post
title: "Hashicorp VAULT with Kubernetes"
date: 2020-09-23
description: # Add description
img:  # Add image post (optional)
---

If you use Kubernetes and you have multiple pods running it becomes complicated when you must update your credentials (like the credentials of your database). You can use Kubernetes secrets but still the credentials are only encoded in base64 and not encrypted.

The right way is to use a VAULT. The main advantages are : 

* Encrypted credentials
* You can rotate secrets with short TTL
* You can access secrets across namespaces (or outside your k2s cluster)
* Vault can use LDAP, OAUTH, IAM, etc as identity provider 

Here is a example of running a Hashicorp Vault with Kubernetes : [Github Vault Example](https://github.com/martinraynov/kubernetes-vault)
