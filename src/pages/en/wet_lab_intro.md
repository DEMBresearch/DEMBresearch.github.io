---
title: 
description: ELI5 - slurm
layout: ../../layouts/MainLayout.astro
author: Haelmorn
---
<style type="text/css" rel="stylesheet">
th { font-size: 1.5rem }
td { font-size: 1rem }
</style>

# A Simple Guide to SLURM: Explained with Microbiology Analogies

Imagine a laboratory full of microbiologists working together to carry out a series of experiments. These experiments require various resources, such as lab equipment and materials, to be completed successfully. To ensure that everyone gets a fair chance to use the lab resources and that experiments are completed efficiently, we need a system to manage everything. That's where SLURM comes in!

SLURM (Simple Linux Utility for Resource Management) is like the lab manager who helps organize and schedule experiments in the lab. It's a tool used by big computers called High-Performance Computing (HPC) clusters, which are made up of many small computers (nodes) working together. When someone wants to use these big computers to run a task (a job), SLURM helps make sure everything runs smoothly and efficiently.

Here are some basic concepts you need to understand about SLURM using microbiology-related analogies:

## Job

A job is like an experiment you want to perform in the lab. It's the task you want the HPC cluster to run. You tell SLURM about your job by writing a list of instructions (a job script) that explains what you want to do and what resources you need to do it.

## Node

A node is like one of the lab benches in the HPC cluster. Just like lab benches, each node can only accommodate a limited number of experiments at once. When you submit a job, SLURM helps you find the right number of nodes to get your task done.

## Task

A task is a part of your job that can run independently, like a single step in a multi-step experiment. If your job can be broken down into smaller tasks, SLURM can help distribute them across the nodes to get things done faster.

## Partition (Queue)

A partition, or queue, is like a reservation system for different types of lab equipment. There are different queues for different types of resources, and each queue can only accommodate a certain number of experiments. SLURM helps make sure everyone gets their turn and uses the right resources for their experiments.

## Job Script

A job script is like a list of instructions you give to the lab manager (SLURM) about your experiment. It tells SLURM things like how many lab benches you need, how much time you'll need, and what kind of equipment is required. You write this list using special words and rules that SLURM can understand.

## sbatch

`sbatch` is like telling the lab manager (SLURM) that you're ready to start your experiment. You give SLURM your list of instructions (job script), and it takes care of organizing everything so you can begin your work.

## squeue

`squeue` is like asking the lab manager (SLURM) how many experiments are waiting to be carried out and what resources they're waiting for. It helps you see the status of your job and other jobs in the HPC cluster.

## scancel

`scancel` is like telling the lab manager (SLURM) that you changed your mind and don't want to proceed with your experiment anymore. You can use this command to stop your job if you need to.

Now that you know the basics, you can start using SLURM to run your jobs on big computers and have fun exploring the world of HPC!