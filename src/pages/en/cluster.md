---
title: Cluster
description: DEMB Cluster setup
layout: ../../layouts/MainLayout.astro
author: Haelmorn
---
<style type="text/css" rel="stylesheet">
th { font-size: 1.5rem }
td { font-size: 1rem }
</style>

Currently, the DEMB cluster is composed of 5 nodes:

* 3 compute nodes named HPC[1-3]
* 1 compute node named GPU1
* 1 storage node
The specification of each node can be found in the ()[Available resources] section

### Using the cluster
#### Connecting via SSH
All connections to the DEMB cluster are handled via SSH. Currently, DeeDee is used as jumphost, as shown below:

![Network graph](/public/assets/network_graph.drawio.svg)

In order to access one of the computer/storage nodes, you need to connect to the jumphost first, and to target node then:

```
LOCAL: ssh <USERNAME>@<DEEDEE_IP_ADDR>
DEEDEE: ssh <USERNAME>@<node_id>
```

Node IP’s in the local network are as follows:


| **Node** | **IP** |
|:--------:|:-----------:|
| HPC1 |	192.168.1.181 |
| HPC2 |	192.168.1.182 |
| HPC3 |	192.168.1.183 |
| GPU1 |	192.168.1.186 |
|Storage |	192.168.1.111 |

#### Making the connection easier

> You can make your life easier by setting up your ssh config with a ProxyCommand.
Here is an example entry in .ssh/config file, which utilises a ProxyCommand to skip manually connecting to the jump host
> ```
> Host demb_hpc1
>   User <user>
>   HostName 192.168.1.181
>   ForwardAgent yes
>   ProxyCommand ssh <user>@212.87.9.194 nc %h %p
> ```

### Running calculations

The DEMB cluster is configured to run jobs using slurm scheduler. There are two main modes of operation:

* Using sbatch - Non-interactive way of launching jobs. Used mostly for long, resource intensive operations.
* Using salloc - A more interactive way of obtaining resources, preferred for shorter analyses and interactive sessions

Usage examples:

---

1. Submit an assembly task to queue using sbatch. Note that paths used have to exist on target node.
`job.sh`

```
#!/bin/bash
#SBATCH -n 20                  # 20 cores
#SBATCH --mem=60GB             # 60 GB of RAM
#SBATCH -J karol_assembly_run  # name of your job
#SBATCH -w hpc3                # node hpc3

/nfs/opt/megahit_1.2.9/bin/megahit -1 SRR096387_1.fastq.gz -2 SRR096387_1.fastq.gz -o ./out
```

Running:
```
chmod +x job.sh
sbatch job.sh

```
Will launch the command specified inside `job.sh`, using 20 cores, 60GB of RAM on node `hpc3`.

Additionall useful directives:
```
#SBATCH --gres=gpu:1         # Request 1 GPU (whole)
#SBATCH --gres=shards:10     # Request 10 GPU shards (1 shard equals ~1GB of VRAM)
#SBATCH --ntasks=1           # Run 1 task
#SBATCH --qos=low            # Submit with low prioroty
```

---

Obtaining an allocation through `salloc` and `srun`

```shell
salloc -n 10 --mem 20GB -w hpc1 srun --pty /bin/bash -l
```

Running this command will result in an interactive allocation being granted on node `hpc1`, with 10 cores and 20GB of RAM assigned.

If you are planning to use this session longer, remember to launch `salloc` inside a `screen` or `tmux` - logging out will terminate the allocation.

Remember to free the allocation after you are done! You can do so by calling `exit` or simply loggin out of the session.
