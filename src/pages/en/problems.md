---
title: Common problems
description: Often encountered problems 
layout: ../../layouts/MainLayout.astro
---

## No internet after `dexter` reboot

Due to current network configuration, powering off the `dexter` server will result in loss of internet connectivity. To restore it, run (with `sudo` privillages):

```
sudo su
cd
./commands_for_server_and_nat
```

Then, to restore the internet on both `mrv` and `deedee`, connect to selected machine and run (with `sudo` privillages):
```
sudo netplan apply
```