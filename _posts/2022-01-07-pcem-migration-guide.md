---
layout: post
title: "PCem Migration Guide"
description: "Learn how to migrate your setups from PCem to 86Box."
authors: ["richardg867"]
image: "/assets/images/pcem-migration/hero.png"
---

{% include imageheading.html url="/assets/images/pcem-migration/hero.png" separator=" " %}

PCem users sometimes ask us about migrating their emulated setups to 86Box. While it is true that 86Box started out as a fork of PCem, we have since rewritten many components and made many additions, outgrowing our "fork" status. This post details all the differences between the two emulators that you have to keep in mind when migrating your setups to 86Box.

---

## Performance will be different

One aspect commonly used to compare PCem and 86Box is the emulation performance. There is indeed such a difference, but not everything is as black and white as it seems.

### The New Recompiler

PCem v15 introduced a rewritten dynamic recompiler, which was primarily aimed at improving emulation performance in games; however, it also caused minor to severe performance regressions in other applications. One example of a regressed application is the (ironically related to a game) **MapEdit** level editor for Wolfenstein 3D, which we measured to lose as much as **85%** emulation speed with the new recompiler on a relatively sensible Pentium 75 setup.

86Box uses the **previous recompiler** from PCem versions before v15, with optimizations performed by us, as we have determined that the new one causes too many regressions to be adopted as a sensible default. There is a way for you to try out the new recompiler on 86Box, though: go to our [Jenkins](https://ci.86box.net/job/86Box/), find whatever build number you're using ([here's 3400](https://ci.86box.net/job/86Box/3400/), the release build for v3.1) and download the **New Recompiler (beta)** variant that's right for your host operating system and CPU architecture.

### Accuracy is slow

PCem's emulation of some core system components, such as the Programmable Interval Timer (PIT), takes a few shortcuts to improve performance. These shortcuts are perfectly fine for games, which is what PCem targets; although, they have caused issues with the software preservation side of things, as we found out with **Microsoft Word 1.0**, the **MR BIOS** and other old pieces of software.

In addition to taking fewer shortcuts, 86Box also tries to follow the specifications of these components, rather than implement the minimum viable feature set, which is - once again - good enough for games, but not good enough for some other applications. Generally speaking, the more accurate a component's emulation is made, the more host CPU horsepower it will require. There are certain limits to what's attainable to emulate (as an example, we don't do CPU caches, as that is too complex [even for other non-PC emulators](https://dolphin-emu.org/blog/2017/02/01/dolphin-progress-report-january-2017/#50-2204-hack-to-protect-lower-mem1-from-malicious-game-code-by-booto "Our issues involved cache test errors on some BIOSes")\), but we try to follow what's possible.
{: #cache}

---

## Bring your own manager

PCem has a built-in manager, which allows you to keep and run multiple emulated machine configurations from one place. 86Box does not have such a manager, though one is planned for the future. For now, you can use our [**86Box Manager**](https://github.com/86Box/86BoxManager) application, which provides basic configuration management; or, even better, use the community-developed [**WinBox for 86Box**](https://github.com/86Box/WinBox-for-86Box), which has an user-friendly interface resembling PC virtualizers, as well as presets, screenshot and printed document management, and other cool features.

There is **no migration path** for configuration files, as the format is too different. You will have to reconfigure your emulated machine on 86Box, but that's a nice opportunity to double-check your configuration while also checking out our features. More on the differences between PCem and 86Box in the configuration department later.

---

## Machine list

86Box has most of the machines PCem emulates, though we have removed, renamed and/or recategorized some of them for various reasons. The table below (make sure to scroll down) provides a reference for **v4.0**.

<div class="scroll td2nowrap" markdown="block">

| PCem name | 86Box category and name | Notes |
|-----------|-------------------------|-------|
| [8088] AMI XT clone | 8088:<br />[8088] AMI XT clone | |
| [8088] Atari PC3 | - | Not implemented due to its undocumented Atari ST-based bus mouse. |
| [8088] Compaq Portable Plus | 8088:<br />[8088] Compaq Portable | |
| [8088] DTK XT clone | 8088:<br />[8088] DTK PIM-TB10-Z | |
| [8088] Generic XT clone | 8088:<br />[8088] Generic XT clone | |
| [8088] IBM PC | 8088:<br />[8088] IBM PC (1981/1982) | [See here](http://minuszerodegrees.net/5150/bios/5150_bios_revisions.htm) for differences between the 1981 and 1982 BIOS revisions. |
| [8088] IBM PCjr | 8088:<br />[8088] IBM PCjr | |
| [8088] IBM XT | 8088:<br />[8088] IBM XT (1982/1986) | [See here](http://minuszerodegrees.net/5160/bios/5160_bios_revisions.htm) for differences between the 1982 and 1986 BIOS revisions. |
| [8088] Juko XT clone | 8088:<br />[8088] Juko ST | |
| [8088] Leading Edge Model M | - | Not implemented yet. |
| [8088] NCR PC4i | 8088:<br />[8088] NCR PC4i | 86Box emulates the NCR Graphics Adapter (NGA) that went with this machine. |
| [8088] Phoenix XT clone | 8088:<br />[8088] Phoenix XT clone | |
| [8088] Schneider EuroPC | 8088:<br />[8088] Schneider EuroPC | |
| [8088] Tandy 1000 | 8088:<br />[8088] Tandy 1000 | |
| [8088] Tandy 1000 HX | 8088:<br />[8088] Tandy 1000 HX | |
| [8088] Thomson TO16 PC | - | Not implemented yet. |
| [8088] Toshiba T1000 | 8088:<br />[8088] Toshiba T1000 | |
| [8088] VTech Laser Turbo XT | - | Not implemented yet due to an unknown jumper settings mechanism. |
| [8088] Xi8088 | 8088:<br />[8088] Xi8088 | |
| [8088] Zenith Data SupersPort | 8088: [8088] Zenith Data<br />Systems SupersPort (Z-184) |
| [8086] Amstrad PC1512 | 8086:<br />[8086] Amstrad PC1512 | |
| [8086] Amstrad PC1640 | 8086:<br />[8086] Amstrad PC1640 | |
| [8086] Amstrad PC2086 | 8086:<br />[8086] Amstrad PC2086 | |
| [8086] Amstrad PC3086 | 8086:<br />[8086] Amstrad PC3086 | |
| [8086] Amstrad PC5086 | - | Not implemented yet. |
| [8086] Amstrad PPC512/640 | 8086:<br />[8086] Amstrad PPC512/640 | |
| [8086] Compaq Deskpro | 8086:<br />[8086] Compaq Deskpro | |
| [8086] Olivetti M24 | 8086:<br />[8086] Olivetti M21/24/24SP | |
| [8086] Sinclair PC200 | 8086:<br />[8086] Amstrad PC20(0) | The Sinclair PC200 is a rebadged Amstrad PC20, keeping the same hardware. |
| [8086] Tandy 1000 SL/2 | 8086:<br />[8086] Tandy 1000 SL/2 | |
| [8088] Toshiba T1200 | 8086:<br />[8088] Toshiba T1200 | |
| [8086] VTech Laser XT3 | - | Not implemented yet due to an unknown jumper settings mechanism. |
| [286] AMI 286 clone | 80286:<br />[NEAT] DataExpert 286 | |
| [286] Award 286 clone | 80286:<br />[SCAT] Hyundai Solomon 286KP | |
| [286] Bull Micral 45 | - | Not implemented yet. |
| [286] Commodore PC 30 III | 80286:<br />[ISA] Commodore PC 30 III | |
| [286] Compaq Portable II | 80286:<br />[ISA] Compaq Portable II | |
| [286] DELL System 200 | - | Not implemented yet. |
| [286] Epson PC AX | - | Not implemented yet. |
| [286] Epson PC AX2e | - | Not implemented yet. |
| [286] Goldstar GDC-212M | 80286:<br />[SCAT] Goldstar GDC-212M | |
| [286] GW-286CT GEAR | 80286:<br />[SCAT] GW-286CT GEAR | |
| [286] Hyundai Super-286TR | 80286:<br />[SCAT] Hyundai Super-286TR | |
| [286] IBM AT | 80286:<br />[ISA] IBM AT | |
| [286] IBM PS/1 model 2011 | 80286:<br />[ISA] IBM PS/1 model 2011 | |
| [286] IBM PS/2 Model 30-286 | 80286:<br />[ISA] IBM PS/2 model 30-286 | |
| [286] IBM PS/2 Model 50 | 80286:<br />[MCA] IBM PS/2 model 50 | |
| [286] IBM XT Model 286 | 80286:<br />[ISA] IBM XT Model 286 | |
| [286] Samsung SPC-4200P | 80286:<br />[SCAT] Samsung SPC-4200P | |
| [286] Samsung SPC-4216P | 80286:<br />[SCAT] Samsung SPC-4216P | |
| [286] Samsung SPC-4620P | 80286:<br />[SCAT] Samsung SPC-4620P | |
| [286] Toshiba T3100e | 80286:<br />[ISA] Toshiba T3100e | |
| [286] Trigem 286M | 80286:<br />[GC103] TriGem 286M | |
| [286] Tulip AT Compact | - | Not implemented yet. |
| [386SX] Acer 386SX25/N | - | BIOS is undumped, preventing us from implementing and validating this machine. |
| [386SX] AMA-932J | i386SX:<br />[HT18] AMA-932J | |
| [386SX] AMI 386SX clone | - | Removed due to bugs and a lack of identification. |
| [386SX] Amstrad MegaPC | i386SX:<br />[WD76C10] Amstrad MegaPC | As with PCem, the integrated Mega Drive is not emulated. |
| [386SX] Commodore SL386SX-25 | i386SX:<br />[SCAMP] Commodore SL386SX-25 | |
| [386SX] DTK 386SX clone | i386SX:<br />[NEAT] DTK 386SX clone | |
| [386SX] Epson PC AX3 | - | Not implemented yet. |
| [386SX] IBM PS/1 model 2121 | i386SX:<br />[ISA] IBM PS/1 model 2121 | |
| [386SX] IBM PS/2 Model 55SX | i386SX:<br />[MCA] IBM PS/2 model 55SX | |
| [386SX] KMX-C-02 | i386SX:<br />[SCAT] KMX-C-02 | |
| [386SX] Packard Bell Legend 300SX | - | Not implemented yet. |
| [386SX] Samsung SPC-6033P | i386SX:<br />[SCAMP] Samsung SPC-6033P | |
| [386DX] AMI 386DX clone | i386DX/i486:<br />[OPTi 495] DataExpert SX495 | 486 CPUs are also supported, like on the real motherboard. |
| [386DX] Compaq Deskpro 386 | i386DX:<br />Not implemented yet. | |
| [386DX] ECS 386/32 | i386DX:<br />[C&T 386] ECS 386/32 | |
| [386DX] IBM PS/2 Model 70 (type 3) | i386DX: [MCA] IBM PS/2<br />model 70 (type 3) | |
| [386DX] IBM PS/2 Model 80 | i386DX: [MCA] IBM PS/2<br />model 80 (type 2) | The Type 3 is also available. |
| [386DX] MR 386DX clone | i386DX/i486: [OPTi 495]<br />DataExpert SX495 (MR BIOS) | 486 CPUs are also supported, like on the real motherboard. |
| [386DX] Samsung SPC-6000A | i386DX:<br />[C&T 386] Samsung SPC-6000A | |
| [486] AMI 486 clone | i486 (Socket 168 and 1):<br />[ALi M1429] Olystar LIL1429 | |
| [486] AMI WinBIOS 486 | i486 (Socket 2):<br />[ALi M1429G] Kaimei SA-486 | |
| [486] Award SiS 496/497 | i486 (Socket 3):<br />[SiS 496] Rise Computer R418 | Not an exact match. The R418 is closest in chipset, BIOS and feature set. |
| [486] Elonex PC-425X | - | BIOS is undumped, preventing us from implementing and validating this machine. |
| [486] IBM PS/1 Model 2133 (EMEA 451) | - | Removed due to [cache abuse](#cache) by the BIOS diagnostics. |
| [486] IBM PS/2 Model 70 (type 4) | i486 (Socket 168 and 1):<br />[MCA] IBM PS/2 model 70 (type 4) | |
| [486] Packard Bell PB410A | i486 (Socket 2):<br />[ACC 2168] Packard Bell PB410A | | 
| [Socket 4] Intel Premiere/PCI | Socket 4:<br />[i430LX] Intel Premiere/PCI | |
| [Socket 4] Packard Bell PB520R | Socket 4:<br />[i430LX] Packard Bell PB520R | |
| [Socket 5] Intel Advanced/EV | Socket 7 (Single Voltage):<br />[i430FX] Intel Advanced/EV | |
| [Socket 5] Intel Advanced/ZP | Socket 5:<br />[i430FX] Intel Advanced/ZP | |
| [Socket 5] Itautec Infoway Multimidia | - | OEM version of the Intel Advanced/ZP above, with an undumped BIOS. |
| [Socket 5] Packard Bell PB570 | - | Inaccurate spec sheets (430NX vs. 430FX) being investigated as of writing. |
| [Socket 7] ASUS P/I-P55TVP4 | Socket 7 (Dual Voltage):<br />[i430VX] ASUS P/I-P55TVP4 | See [PIIX southbridge mismatch](#piix-southbridge-mismatch). |
| [Socket 7] ASUS P/I-P55T2P4 | Socket 7 (Dual Voltage):<br />[i430HX] ASUS P/I-P55T2P4 | See [PIIX southbridge mismatch](#piix-southbridge-mismatch). |
| [Socket 7] Epox P55-VA | Socket 7 (Dual Voltage):<br />[i430VX] Epox P55-VA | See [PIIX southbridge mismatch](#piix-southbridge-mismatch). |
| [Socket 7] Shuttle HOT-557 | Socket 7 (Dual Voltage):<br />[i430VX] Shuttle HOT-557 | See [PIIX southbridge mismatch](#piix-southbridge-mismatch). |
| [Super 7] FIC VA-503+ | Super Socket 7:<br />[VIA MVP3] FIC VA-503+ | Not to be confused with the FIC VA-503**A**, which has a different southbridge. |
| [Socket 8] Intel VS440FX | Socket 8:<br />[i440FX] Intel VS440FX | See [PIIX southbridge mismatch](#piix-southbridge-mismatch). |
| [Slot 1] Gigabyte GA-686BX | Slot 1:<br />[i440BX] Gigabyte GA-686BX | |

</div>

<div>&nbsp;</div>

### CMOS and Flash

While it's easier and recommended to just redo the CMOS settings from scratch, you can migrate them (along with Flash ROM data if applicable) from PCem by following these steps:

1. Configure your machine on 86Box, and let it boot into the BIOS once.
2. Exit 86Box. An `nvr` folder should appear inside the emulated machine's folder, containing a `.nvr` file with the machine's internal name, and also a `.bin` file with the same name if the machine is equipped with Flash ROM.
3. Copy the `<configuration name>.<PCem machine name>.nvr` file from PCem's `nvr` folder to the 86Box machine's `nvr` folder, **using the same name** as the `.nvr` file created by 86Box.
4. If the machine is equipped with Flash ROM, copy the `flash.bin` file from PCem's `roms` folder for the machine you're emulating to the 86Box machine's `nvr` folder, **using the same name** as the `.bin` file created by 86Box.

### PIIX southbridge mismatch

PCem's implementation of the Intel 430HX, 430VX and 440FX chipsets uses the **PIIX** southbridge, while real motherboards and 86Box use the **PIIX3**. Some operating systems, such as Windows NT/2000/XP, will fail to boot after a PIIX to PIIX3 transition (and vice-versa) due to the IDE controller's new PCI ID.

If you run into this issue, one option is to reinstall the operating system. Another option is to boot the operating system on PCem, uninstall the PIIX IDE driver (on Windows 2000/XP, use **Device Manager** to replace the 82371FB IDE controller driver with the Standard Dual Channel one), then switch to 86Box.

---

## Settings differences

The 86Box settings interface is designed to be easy to navigate, though you should keep the main differences in relation to PCem in mind:

### Machine

* The machine list is split into **categories**, with the [tag] before a machine's name denoting its chipset instead of its category. The [table above](#machine-list) can help you locate PCem's machines on 86Box.
* The CPU list is split into **families** instead of manufacturers.
* Only CPUs that are **actually compatible** with the selected machine will be listed. There are some pitfalls, such as not all Super Socket 7 motherboards supporting the original Pentium without MMX.
* Time synchronization has two options: **Local time** behaves like PCem and is ideal for running DOS and Windows, while **UTC time** is ideal for running Linux and other OSes which store time that way.

### Display

* Video cards are categorized by their bus (such as ISA or PCI). Any given card might be available on different buses and/or with different manufacturer video BIOS variants.
* The **Speed** option is not available. 86Box automatically tunes video timings to be accurate to the speed of the card's bus.

### Sound

* There are regular and PnP variants of the **Sound Blaster 16** and **AWE32** cards. You should stick to the regular variants with manual settings, unless you feel like messing with ISA Plug and ~~Pray~~ Play.
* The **Sound Blaster PCI 128** card is not listed, as it's an identical copy of the **Ensoniq AudioPCI (ES1371)**, so use that instead.
* The **MIDI out device** option is sound card independent; it's located right below the sound card selection box. 86Box also supports MIDI input.
* The **OPL emulator** option is not available. 86Box uses **NukedOPL** exclusively.
* The **LPT device** option is in the **Ports (COM & LPT)** page, as 86Box supports more devices (such as printers) connected to up to 4 parallel ports.

### Drives

* Drives are configured through individual settings pages:
  * Floppy drives in the **Floppy & CD-ROM drives** page;
  * Hard drives in the **Hard disks** page;
  * CD-ROM drives in the **Floppy & CD-ROM drives** page;
  * Iomega Zip drives (86Box adds Zip 250 support) in the **Other removable devices** page;
  * 86Box adds magneto-optical drives also in the **Other removable devices** page.
* IDE drives are represented by a channel:device index, instead of a drive index or location like "Primary Master". See [our documentation](https://86box.readthedocs.io/en/v3.0/settings/hdd.html#adding-a-new-disk) for more information.
  * IDE channels 2 and 3 correspond to [tertiary and quaternary IDE controllers](https://86box.readthedocs.io/en/v3.0/hardware/ideterqua.html), which can be added through the **Storage controllers** page. PnP Sound Blaster cards also claim the tertiary channel.
* 86Box supports using IDE and SCSI simultaneously. IDE is automatically enabled on machines with it, and up to 4 SCSI controllers can be installed through the **Storage controllers** page.
* The **CD Model** option is not available, as 86Box emulates a single universal CD-ROM drive model.
* The **CD Speed** option is configurable for each individual drive in the **Floppy & CD-ROM drives** page.

### Input

* 86Box can emulate serial and PS/2 mice with **three buttons** or a **scroll wheel**. This functionality can be enabled through the **Configure** button next to the mouse selection box.
* The **4-axis 4-button** joystick allows for a more modern control scheme (if supported by the emulated software), which takes advantage of all 4 axes and 4 buttons that the game port provides.

### Network

* 86Box supports two networking modes: **PCap** allows for a bridged connection to a wired Ethernet adapter on the host through `pcap` libraries (such as [Npcap](https://nmap.org/npcap/) on Windows), while **SLiRP** behaves just like PCem's private network, with **port forwarding** available as an added advanced feature. See [our documentation](https://86box.readthedocs.io/en/v3.0/hardware/network.html) for more information.

---

## User interface

The 86Box user interface should look familiar to PCem users, with two main differences: the menu layout and the status bar. The [menu bar](https://86box.readthedocs.io/en/v3.0/usage/menubar.html) had some options moved to the **Settings** window, and media controls moved to the **Media menu**. The [status bar](https://86box.readthedocs.io/en/v3.0/usage/statusbar.html) contains activity indicators, with the same controls as the Media menu also being accessible by clicking the icons. While we don't have the **Machine** window, most of what it provides on PCem is accessible through the title bar, menu bar and status bar on 86Box.

{% include image.html url="/assets/images/pcem-migration/media.png" description="Media controls through the Media menu and status bar." %}

Note that the key combination to release mouse capture on 86Box is **F8+F12**, as we've found PCem's Ctrl+End to conflict with some applications. You can also use the middle mouse button to release capture, unless a [three-button or wheel mouse](#input) is configured.

---

## Media

86Box is quite a bit different in the media department as well. More disk image formats are supported, including our own [**86F**](https://86box.readthedocs.io/en/v3.0/dev/formats/86f.html) format for floppy bitstream images. Unlimited hard drives (the controllers are the limit) and up to 4 removable drives of **each type** (floppy, CD-ROM, Zip, MO) can be installed, with each removable drive getting its own entry on the **Media menu** and **status bar**.

### No host CD-ROM passthrough

Using a host CD-ROM drive is **not supported** by 86Box. We have experimented with that in the past, but it resulted in really dodgy platform-specific code, which performed poorly and didn't work with some discs and the copy protection on some games. On top of that, optical disc drives are becoming a rare item on the modern computers you'd want to run 86Box on anyway.

We recommend ripping your discs to `.cue` + `.bin` before using them in 86Box, as that format preserves the sector mode, audio tracks and other information that `.iso` doesn't. Note that `.cue` images with `.wav`, `.mp3` or other compressed/encapsulated audio tracks are not supported by neither PCem nor 86Box.

### Zip 250 and MO

86Box supports **Iomega Zip 250** disks, which require Zip 250 support to be enabled at a drive level in the **Other removable devices** settings page. **Magneto-optical** (MO) is also supported, as another removable medium which provides more storage than Zip disks: up to 1.3 GB per cartridge.

### Cassette formats

PCem's IBM cassette emulation uses the `.pzx` format, originally designed for ZX Spectrum tapes. 86Box supports the `.cas` format developed as part of [PCE/ibmpc](http://www.hampa.ch/pce/), as well as audio recordings in `.wav` or `.pcm` format. The `pzx2wav` tool in [PZX tools](http://zxds.raxoft.cz/pzx.html) can potentially convert `.pzx` tapes to `.wav` for 86Box, though we haven't tested that.

---

## Conclusion

We hope this post helped you understand the differences between PCem and 86Box. We've come a long way ever since we forked PCem, but we acknowledge our roots and strive to make things reasonably easy for users coming from PCem. If you have any questions about the migration process or 86Box as a whole, feel free to reach out through [Discord or IRC](/#social), and we'll be glad to help.
