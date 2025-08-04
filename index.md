---
layout: index
title: "Emulator of retro x86-based machines"
---

**86Box** is a low level x86 emulator that runs older operating systems and software designed for IBM PC systems and compatibles from 1981 through fairly recent system designs based on the PCI bus.

Features
--------

* Easy to use interface inspired by mainstream hypervisor software
* Low level emulation of 8086-based processors up to the Pentium with focus on accuracy
* Great range of customizability of virtual machines
* Many available systems, such as the very first IBM PC 5150 from 1981, or the more obscure IBM PS/2 line of systems based on the Micro Channel Architecture
* Lots of supported peripherals including video adapters, sound cards, network adapters, hard disk controllers, and SCSI adapters
* MIDI output to Windows built-in MIDI support, FluidSynth, or emulated Roland synthesizers
* Supports running MS-DOS, older Windows versions, OS/2, many Linux distributions, or vintage systems such as BeOS or NEXTSTEP, and applications for these systems

Downloads
---------

The latest stable version of 86Box is **v4.2.1**, which was released on September 1, 2024, and is available from our [GitHub repository](https://github.com/86Box/86Box/releases/latest).

We also offer [experimental builds](/builds), which are built from the latest source code, but may not be as stable and/or performant as release builds.

Minimum system requirements and recommendations
-----------------------------------------------

* Intel Core 2 or AMD Athlon 64 processor
* 4 GB of RAM
* **Windows version:** Windows 7 Service Pack 1, Windows 8.1 or Windows 10
* **macOS version:** macOS High Sierra 10.13
* **Linux version:** Ubuntu 16.04, Debian 9.0 or other distributions from 2016 onwards

Performance may vary depending on both host and guest configuration. Most emulation logic is executed in a single thread; therefore, systems with better IPC (instructions per clock) generally should be able to emulate higher clock speeds.

It is also recommended to use a manager application with 86Box for easier handling of multiple virtual machines.

* [Avalonia 86](https://github.com/notBald/Avalonia86) by [notBald](https://github.com/notBald) (Windows and Linux)
* [86Box Manager](https://github.com/86Box/86BoxManager) by [Overdoze](https://github.com/daviunic) (Windows only)
* [MacBox](https://github.com/Moonif/MacBox) by [Silvermoon](https://github.com/Moonif) (macOS only)
* [sl86](https://github.com/DDXofficial/sl86) by [DDX](https://github.com/DDXofficial) (command-line manager, Python 3.x required - Windows, macOS and Linux)

It is also possible to use 86Box on its own with the `--vmpath`/`-P` command line option.

Getting started
---------------

See [our documentation](https://86box.readthedocs.io/en/latest/index.html) for an overview of the emulator's features and user interface.

<a name="social" />Get in touch
-------------------------------

You can reach us on our IRC channel, Discord server or Twitter to discuss anything related to retro computing and, of course, 86Box. We look forward to hearing from you!

<div id="socialnew" markdown="block">

[![Visit our IRC channel](https://kiwiirc.com/buttons/irc.86box.net/86Box.png)](https://kiwiirc.com/client/irc.86box.net/?nick=website?#86Box)

[![Visit our Discord server](https://discordapp.com/api/guilds/262614059009048590/embed.png)](https://discord.gg/v5fCgFw)

</div><div id="socialold" markdown="block">

Visit our IRC channel with an [installed IRC client](irc://irc.86box.net/#86Box) or the [CGI:IRC web client](http://irc.86box.net).

</div>

[Twitter: @86BoxEmulator](https://twitter.com/86BoxEmulator)

[YouTube: 86Box](https://youtube.com/c/86Box)

Licensing
---------

86Box is released under the [GNU General Public License, version 2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html) or later. For more information, see the `COPYING` file in the root of the repository.

The emulator can also optionally make use of [munt](https://github.com/munt/munt), [FluidSynth](https://www.fluidsynth.org/), [Ghostscript](https://www.ghostscript.com/) and [Discord Game SDK](https://discord.com/developers/docs/game-sdk/sdk-starter-guide), which are distributed under their respective licenses.

Donations
---------

We do not charge you for the emulator but [donations](https://paypal.me/86Box) are still welcome. You can also support the project on [Patreon](https://www.patreon.com/86box).
