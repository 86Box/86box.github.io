---
layout: default
---

Frequently asked questions
==========================

_Please note that this page is a work in progress._
> ### How is 86Box different from applications like VirtualBox or Virtual PC?

VirtualBox, Virtual PC and similar applications are _virtualizers_. They monitor running virtual machines and only modify running instructions when it is required to enforce the separation of a virtual machine from the rest of the system. They also implement peripherals that are custom designed to let the guest take full potential of the virtualizer as long as appropriate drivers, which are distributed with the provided _additions_, are installed. Because of the way virtualizers work, they are tied to a specific CPU architecture.

On the other side, 86Box is an _low-level emulator_. It implements a whole system in software, which includes the CPU, chipset and additional cards, if any. Emulators interpret every single instruction running in the virtual machine, which allows them to run on incompatible CPU architectures. Furthermore, 86Box emulates peripherals that have actually existed, which makes it possible to use drivers that are already available. On the other side, these components haven't been designed to work in virtual environment, therefore it is not possible to offer advanced features such as mouse pointer integration or shared folders without custom drivers.

> ### Why does 86Box not have a Linux version like PCem does?

Even though 86Box is based on PCem, its development began before the cross-platform wxWidgets frontend was introduced to PCem. Even though we would love to provide a Linux version, we currently lack developers knowledgeable in Linux GUI apps development. See the [issue tracker](https://github.com/86Box/86Box/issues/136) for more details.

[< Go back](index)
