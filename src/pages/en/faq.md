---
title: FAQ
description: Frequently asked questions
layout: ../../layouts/MainLayout.astro
---
## 1. Where do I store my files?

In general, the use of `/home` should be reduced to minimum, as storage there is limited. 
It's recommended to use either `/media/storage` on compute nodes or `/nfs/` storage

Each user has access to 2 private directories:
* `/home/<user>` - Separate on each node
* `/nfs/users/<user>` - Shared between nodes

By default, you should keep any files that do not need to be shared between nodes in your home folder on each node.

If you need to share files between nodes, then using `nfs` is the right way to go.

## 2. Where do I back up my files? Where can I store them when I no longer need them?

Since storage on `/home` partition of all nodes is limited, data should not be stored there long-term.

The proper solution for storage is to use one of:
* `/media/storage` for keeping files locally on compute nodes (`hpc[1-3]`)
* `/media/storage` on storage node for long-term storage and backups
* `/nfs/storage` for keeping files shared between all nodes

## 3. Installing `conda` and `mamba`

To install `conda` on any of the servers, run:

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh
```

For convenience, you can install `conda` somewhere in your `/nfs/users/<user>` directory, so that you have access to your environments from all nodes.

To learn more about `conda`, visit [official documentation](https://docs.conda.io/en/latest/) or [conda cheat sheet](https://docs.conda.io/projects/conda/en/latest/user-guide/cheatsheet.html).

It's also recommended to install `mamba` for faster package resolving:

```bash
conda install mamba -n base -c conda-forge
```

After that, you can replace almost any `conda` command with `mamba` to speed up the process.

## 4. Running `jupyter` notebooks on the server

To run `jupyter` notebooks on the server, you need to install `jupyter` and `jupyterlab`:

```bash
pip3 install jupyter jupyterlab
```

Then, you can run `jupyter` notebooks with the following command:

```bash
jupyter notebook --no-browser --port=<PORT>
```

where `<PORT>` is the port number you want to use. For example, `3434`.

To access the notebook, you need to create a SSH tunnel to the server:

```bash
ssh -N -f -L localhost:<PORT>:localhost:<PORT> <USER>@<SERVER>
```

where `<PORT>` is the port number you used in the previous command, `<USER>` is your username on the server, and `<SERVER>` is the server address.

After that, you can access the notebook at `localhost:<PORT>` in your browser.

## 5. Accesing data on the server locally

You can make use of `sshfs` to mount the server's file system locally. To do that, run the following command:

```bash
sshfs <USER>@<SERVER>:<PATH> <MOUNT_POINT>
```

where `<USER>` is your username on the server, `<SERVER>` is the server address, `<PATH>` is the path to the directory you want to mount, and `<MOUNT_POINT>` is the path to the directory where you want to mount the server's file system.

For example, to mount the user's home directory to the local directory `~/server`, run:

```bash
sshfs <USER>@<SERVER>:/home/<USER> ~/server
```

## 