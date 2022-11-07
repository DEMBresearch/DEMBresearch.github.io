---
title: Available resources
description: DEMB servers and their resources
layout: ../../layouts/MainLayout.astro
---

## Available servers
* [Dexter](#dexter)
* [MRV](#mrv)
* [Deedee](#deedee)

## Server configuration

### Dexter

| Component          | Specification                              |
|--------------------|--------------------------------------------|
| CPU                | 2 x Intel Xeon E5-2630 v3 8C/16T @ 2.40GHz |
| RAM                | 128 GB                                     |
| Storage            | 1 x 2 TB HDD at `/`                        |
| Storage            | 2 x 4 TB HDD (RAID 1) at `/media/data`     |
| Storage            | 2 x 10 TB HDD (RAID 1) at `/media/data2`   |
| Network            | 1 Gbps                                     |
| OS                 | Ubuntu 20.04 LTS                           |
| GPU                | nVidia GM107GL [Quadro K620]               |
| RAID controller    | Intel C600/X79                             |
| Network controller | Intel I210                                 |

### MRV

| Component          | Specification                           |
|--------------------|-----------------------------------------|
| CPU                | AMD EPYC 7551P 32C/64T @ 2.0GHz         |
| RAM                | 512 GB                                  |
| Storage            | 1 x 1 TB NVMe SSD at `/`                |
| Storage            | 2 x 10 TB HDD (RAID 1) at `/media/data` |
| Network            | 1 Gbps                                  |
| OS                 | Ubuntu 18.04 LTS                        |
| GPU                | ---                                     |
| RAID controller    | ---                                     |
| Network controller | Intel I210                              |

### Deedee

| Component          | Specification                               |
|--------------------|---------------------------------------------|
| CPU                | Intel Xeon CPU E5-2630 v4 10C/20T @ 2.20GHz |
| RAM                | 512 GB                                      |
| Storage            | 2 x 12 TB HDD (RAID 1) at `/`               |
| Network            | 1 Gbps                                      |
| OS                 | Ubuntu 20.04 LTS                            |
| GPU                | ---                                         |
| RAID controller    | Intel C610/X99                              |
| Network controller | Intel I210                                  |
