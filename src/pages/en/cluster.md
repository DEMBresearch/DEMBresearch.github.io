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

Currently, the DEMB cluster is composed of 4 nodes:

* 3 compute nodes named HPC[1-3]
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

---

Obtaining an allocation through `salloc` and `srun`

```shell
salloc -n 10 --mem 20GB -w hpc1 srun --pty /bin/bash -l
```

Running this command will result in an interactive allocation being granted on node `hpc1`, with 10 cores and 20GB of RAM assigned.

If you are planning to use this session longer, remember to launch `salloc` inside a `screen` or `tmux` - logging out will terminate the allocation.

Remember to free the allocation after you are done! You can do so by calling `exit` or simply loggin out of the session.

### Example

Here is an example of metagenomic assembly using megahit on the DEMB cluster. It utilises all 3 compute nodes, and assembles the metagenomes in parallel.
This specific script was used to assemble >100 metagenomes from Illumina sequencing. The task took ~12h to complete

```shell
#!/bin/bash

# Set the directory containing the fastq.gz files
fastq_dir=/path/to/fastq/files

# Set the output directory
output_dir=/path/to/output

# Loop through the fastq.gz files in the directory - modify the pattern to match your files
for file in ${fastq_dir}/*_R1.fastq.gz
do
  # Get the base name of the file
  base=$(basename ${file} _R1.fastq.gz)

  # Submit the MEGAHIT job
  sbatch <<EOT
#!/bin/bash
#SBATCH --job-name=${base}_megahit
#SBATCH --output=${base}_megahit.out
#SBATCH --error=${base}_megahit.err
#SBATCH --nodes=1
#SBATCH --cpus-per-task=20
#SBATCH --mem=60G
#SBATCH --time=24:00:00

# Load the MEGAHIT module
source /nfs/users/<user>/miniconda3/bin/activate megahit

# Run MEGAHIT
megahit -1 ${fastq_dir}/${base}_R1.fastq.gz -2 ${fastq_dir}/${base}_R2.fastq.gz -o ${output_dir}/${base} --num-cpu-threads 20
EOT
done
```

**Important to remember:**
* For the script to be able to utilise all nodes, both input and output directories have to be accessible from all nodes, i.e. somewhere on the `nfs` share.
* The script assumes that the `megahit` module is available on all nodes. This can be achieved by either installing the module on all nodes, or by using a shared conda environment (which is what I did in this case).
* stdout and stderr are redirected to separate files for each job. They can be found in the directory from which the script was launched.
* The `--nodes` directive dictates how many nodes are used per job, not in total
* In this case, I am using 20 cores per job and 60GB of RAM, meaning I am able to run 2 job per node, or 6 in total, at the same time.
