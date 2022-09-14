---
title: FAQ
description: Frequently asked questions
layout: ../../layouts/MainLayout.astro
---

## 1. Installing `conda` and `mamba`

To install `conda` on any of the servers, run:

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh
```

To learn more about `conda`, visit [official documentation](https://docs.conda.io/en/latest/) or [conda cheat sheet](https://docs.conda.io/projects/conda/en/latest/user-guide/cheatsheet.html).

It's also recommended to install `mamba` for faster package resolving:

```bash
conda install mamba -n base -c conda-forge
```

After that, you can replace almost any `conda` command with `mamba` to speed up the process.

## 2. Running `jupyter` notebooks on the server

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

## 3. Accesing data on the server locally

You can make use of `sshfs` to mount the server's file system locally. To do that, run the following command:

```bash
sshfs <USER>@<SERVER>:<PATH> <MOUNT_POINT>
```

where `<USER>` is your username on the server, `<SERVER>` is the server address, `<PATH>` is the path to the directory you want to mount, and `<MOUNT_POINT>` is the path to the directory where you want to mount the server's file system.

For example, to mount the user's home directory to the local directory `~/server`, run:

```bash
sshfs <USER>@<SERVER>:/home/<USER> ~/server
```

## 4. Running long jobs on the server

To run long jobs on the server, you can use `tmux`. To install `tmux`, run:

```bash
sudo apt install tmux
```

To start a new `tmux` session, run:

```bash
tmux new -t <SESSION_NAME>
```

where `<SESSION_NAME>` is the name of the session you want to create. For example, `my_session`.

Then, you can run your job in the session. To detach from the session, press `Ctrl + B` and then `D`. Detaching from the session will not stop the job.

To reattach to the session, run:

```bash
tmux a -t <SESSION_NAME>
```

where `<SESSION_NAME>` is the name of the session you want to attach to.

TIP: You can use `tmux ls` to list all running sessions.

To exit the session, press `Ctrl + B` and then `X`. Exiting the session will stop any running processes.

To learn more about `tmux`, visit [tmux wiki](https://github.com/tmux/tmux/wiki).