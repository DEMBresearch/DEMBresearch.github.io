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

Then, to restore the internet on `mrv`, connect to the machine and run (with `sudo` privillages):
```
sudo netplan apply
```

## Can't connect to `mrv`

1. Use `lshw` to check if **both** network interfaces are enabled
    ```
    sudo lshw -C network
    ---
    *-network
           description: Ethernet interface
           product: Ethernet Connection (2) I218-LM
           ....
           logical name: eno1
           ....
      *-network
           description: Ethernet interface
           product: I210 Gigabit Network Connection
           ....
           logical name: ens8191
           ....
    ```

    Note the logical name of `I210` network card - `ens8191`.

    If any of the devices are `DISABLED` - enable them with:
    ```
    ip link set <LOGICAL NAME> up
    ```

2. Ensure that the correct name is used for `netplan` configs

    ```
    root@dexter:/# cat /etc/netplan/01-netcfg.yaml
    ---
    network:
        ethernets:
            eno1:
                dhcp4: no
                dhcp6: no
                addresses:
                - 212.87.9.193/29
                gateway4: 212.87.9.198
                nameservers:
                    addresses:
                    - 212.87.2.57
                    - 193.0.71.130
                    - 212.87.0.72
            ens8191:
                dhcp4: false
                dhcp6: false
                addresses:
                - 192.168.100.2/16
                nameservers:
                    addresses:
                    - 8.8.8.8
                    - 8.8.4.4
        version: 2
    ```
    ```
    root@dexter:~# cat /etc/netplan/50-cloud-init.yaml
    ---
    # This file is generated from information provided by
    # the datasource.  Changes to it will not persist across an instance.
    # To disable cloud-init's network configuration capabilities, write a file
    # /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg with the following:
    # network: {config: disabled}
    network:
        ethernets:
            eno1:
                dhcp4: no
                dhcp6: no
                addresses: [212.87.9.193/29]
                gateway4: 212.87.9.198
                nameservers:
                    addresses: [212.87.2.57,193.0.71.130,212.87.0.72]
            ens8191:
                dhcp4: true
                dhcp6: true
                addresses: [192.168.100.2/24]
        version: 2
    ```

    Make sure that the name of the network interface (`ens8191`) is the same as the logical name of the `I210` device. If they are different, change them (be sure to make a backup of all modified configs first).

    You may also need to change names in `commands_for_server_and_nat` for internet connectivity, as iptables can sometimes change between reboots.

## No internet access on `HPC[1-3]` after reboot

The first thing you should do is apply commands for iptables and routing, as described above in [No internet after `dexter` reboot](#No internet after `dexter` reboot)

Secondly, check if the stub DNS was properly loaded by `systemd-resolved` service. To do so, check the output of `resolvectl status` command.

It should look like this:
```shell
Global
       Protocols: -LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported
       resolv.conf mode: stub
...
```

If the configuration is different, especially when any DNS servers are listed in the **Globa** section or the mode is different than "stub", try rebooting the machine.
