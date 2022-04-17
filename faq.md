---
layout: page
---

Frequently asked questions
==========================

_Please note that this page is a work in progress._
> ### How is 86Box different from applications like VirtualBox or Virtual PC?

VirtualBox, Virtual PC and similar applications are _hypervisors_. They merely monitor the running virtual machines and only step in whenever it is required to enforce the separation of a virtual machine from the rest of the system. They also implement peripherals that are custom designed to let the guest take full potential of the virtualizer as long as appropriate drivers, which are distributed with the provided _additions_, are installed. This is great for modern operating systems and software that does not target a specific hardware target, but rather an abstraction interface such as DirectX, however, running older applications and games will often lead to a suboptimal experience, as hypervisors don't tend to be designed with this usecase in mind. 

On the other hand, 86Box is an _emulator_. It implements a whole system in software, which includes the CPU, chipset and additional cards, if any. Furthermore, it interprets every single instruction running in the virtual machine, and while that comes with the obvious tradeoff of emulation being more CPU intensive than virtualization, it also makes it possible to simulate authentic behavior of the original hardware, including its speed. This in turn allows running countless games and demos that wouldn't have ran in a hypervisor before, as they simply run too fast or fail to make use of various hardware quirks that don't exist in modern processors. In addition, the large variety of peripherals emulated by 86Box also makes it possible to use existing software, games and drivers that had been specifically designed for such. However, this obviously means that the emulator is also stuck with the limitations of the original hardware, and therefore it is not possible to offer advanced features such as mouse pointer integration.

[< Go back](index)
