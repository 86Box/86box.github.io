---
layout: index
title: "Emulator of retro x86-based machines"
---

**86Box** is an IBM PC system emulator that specializes in running old operating systems and software designed for IBM PC systems and compatibles from 1981 through fairly recent system designs based on the PCI bus.

Licensing
---------
86Box is released under the [GNU General Public License, version 2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html).

Features
--------
* Easy to use interface
* Cycle-accurate low level emulation of 8086-based processors up to the Pentium II
* Great range of customizability of emulated machines
* Many available systems, such as the very first IBM PC 5150 from 1981, or the more obscure IBM PS/2 line of systems based on the Micro Channel Architecture
* Lots of supported peripherals including video adapters, sound cards, network adapters, hard disk controllers, and SCSI adapters
* MIDI output to Windows built-in MIDI support, FluidSynth, or emulated Roland synthesizers
* Supports running MS-DOS, older Windows versions, OS/2, many Linux distributions, or vintage systems such as BeOS or NEXTSTEP, and applications for these systems

<a name="downloads" />Downloads
-------------------------------
The latest stable version of 86Box is **v3.1**, which was released on December 23, 2021, and is available from our [GitHub repository](https://github.com/86Box/86Box/releases/tag/v3.1).

We also offer [nightly builds](https://github.com/86Box/86Box#automatic-builds), which are built from the latest source code, but may not be as stable and/or optimized as stable builds.

System requirements and recommendations
---------------------------------------
* Intel Core 2 or AMD Athlon 64 processor
* Windows 7 Service Pack 1, Windows 8.1 or Windows 10
* 4 GB of RAM

Performance may vary depending on both host and guest configuration. Most emulation logic is executed in a single thread; therefore, systems with better IPC (instructions per clock) generally should be able to emulate higher clock speeds.

It is also recommended to use a manager application with 86Box for easier handling of multiple virtual machines.
* [WinBox for 86Box](https://github.com/86Box/WinBox-for-86Box) by Laci bá'
  * The new manager with improved new user experience; installer, automatic updates of emulator files and more.
* [86Box Manager](https://github.com/86Box/86BoxManager) by [daviunic](https://github.com/daviunic) (Overdoze)
  * The traditional 86Box manager with a simple interface.

It is also possible to use 86Box on its own with the `--vmpath`/`-P` command line option.

Getting started
---------------
If you're a new user, click [here](https://86box.readthedocs.io/en/latest/) to see our documentation about the emulator's features and user interface.

Help
----
See [frequently asked questions](faq) for solutions to common problems with 86Box or join our IRC or Discord for assistance.

<a name="social" />Get in touch
-------------------------------
You can reach us on our IRC channel, Discord server or Twitter to discuss anything related to retro computing and, of course, 86Box. We look forward to hearing from you!

<div id="socialnew" markdown="block">

[![Visit our IRC channel](https://kiwiirc.com/buttons/irc.ringoflightning.net/86Box.png)](https://kiwiirc.com/client/irc.ringoflightning.net/?nick=website?#86Box)

[![Visit our Discord server](https://discordapp.com/api/guilds/262614059009048590/embed.png)](https://discord.gg/v5fCgFw)

</div><div id="socialold" markdown="block">

[Visit our IRC channel](irc://irc.ringoflightning.net/#86Box) (requires an IRC client)

</div>

[Twitter: @86BoxEmulator](https://twitter.com/86BoxEmulator)

YouTube
-------
Our [YouTube channel](https://youtube.com/c/86Box) contains detailed 86Box tutorials and videos about various related topics.
###### The YouTube channel and Twitter account are managed by staff member [DDX](https://ddxofficial.com).

Donations
---------
We do not charge you for the emulator but donations are still welcome: [https://paypal.me/86Box](https://paypal.me/86Box)

You can also support the project on Patreon: [https://www.patreon.com/86box](https://www.patreon.com/86box)
