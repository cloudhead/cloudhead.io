---
title: "Segfault, the mother of invention"
date: 2024-01-31
type: post
layout: default
permalink: /drafts/segfault/
draft: true
---

There is no greater joy for a programmer than to build his own tools. A few
weeks ago, I embarked on a little coding experiment: I wanted to see if it was
possible to build a 2D/3D software suite with an embedded scripting language
more or less from scratch.

This all started when I wanted to try Blender, a popular open source 3D tool.

    $ blender
    Writing: /tmp/blender.crash.txt
    zsh: segmentation fault (core dumped)  blender

The last time I tried running Blender, which was some five years ago, it worked
fine. Turns out this is likely due to an LLVM dynamic library incompatibility,
as stated by someone on the Arch Linux bug tracker:

> So, OSL is linking LLVM15, and the driver is linking LLVM16. Something is
> breaking because two different versions of LLVM are being linked concurrently
> and calling into each other, presumably because symbol versioning is disabled
> or broken.

If you're wondering why Blender depends on LLVM, one of the most sophisticated
compiler toolchains ever created, with millions of lines of code, your guess is
as good as mine. But anyway, if your reaction to the above is not *wtf?*, you
have already given up on software.

Here's a useful principle:

> **Principle**: To assess the complexity of a piece of software, its entire
> dependency tree must be considered.

Naturally, dynamic linking makes a software's dependency tree a runtime
concern, ie. mostly unpredictable. Shucks.

I tend to have very limited patience dealing with code I didn't write,
especially when it doesn't work. To avoid that, I try to keep dependencies to a
bare minimum, and pick ones that mostly get out of the way. This has worked
well for me, probably because bugs are typically corelated with code size (yes,
this includes transitive dependencies). In other words, less code equals less
things that can go wrong. Every dependency you add has a benefit and a cost,
and we tend to overestimate the benefit and underestimate the cost. Picking
dependencies is all about this cost to value ratio.

    Ratio = Benefit (time saved) ÷ Cost (dependency burden)

Naturally, when I wasn't able to run Blender, I asked myself what it would take
to write my own. I've dabbled in graphics programming before and wrote a [pixel
editor][rx] a few years ago, what would it take to add a third dimension? This
is the question I wanted to answer, and the direction I wanted to explore. I
like to constrain myself to working mostly with the standard library of a
language and a very minimal set of dependencies; mostly for the code I don't
want to write. Things like C bindings and platform-specific code are usually in
that category.

Hence, when thinking about new projects, the question of dependencies is the
first one I ask, and after doing a bunch of research, I landed on these three,
somewhat unsurprisingly, for a 2D/3D graphics application:

    [dependencies]
    glfw = { version = "0.54.0" }
    glow = { version = "0.13.0" }
    log = { version = "0.4.20" }

These are the things I don't want to have to reinvent.

[glfw][glfw] is a rock solid OpenGL context creation and input handling library
I've been using without issue for over a decade. Compared to SDL, it's a tenth
of the size, while doing everything I need. It contains lots of
platform-specific code I'm not willing nor able to write.

I chose `glfw` over [winit][winit] because I'm not interested in running
software on mobile or web, and winit's API is a compromise made to support
these platforms. For instance, `winit` doesn't give you control over your event
loop. This is a deal breaker for me. It's common to lose power and flexibility
when using APIs that try to abstract over vastly different domains.

[glow][glow] is a set of GL bindings for Rust, optimized for portability. It's
a great library that doesn't try to do too much:

> GL on Whatever: a set of bindings to run GL anywhere (Open GL, OpenGL ES, and
> WebGL) and avoid target-specific code.

The `log` crate doesn't need much of an introduction. Since I avoid async rust,
there is no need for anything more advanced in terms of logging.

I chose to build directly on OpenGL 3.3, as opposed to using something like
[wgpu][wgpu] because OpenGL is already the hardware abstraction layer that I
need to write cross-platform code, and it's not going anywhere. All I would add
is a thin wrapper around it to make it more palatable.

What about the GUI? There are dozens of libraries in Rust to choose from, but
they either depend on something like GTK, have a massive dependency tree, or
are coupled with their graphics backend. I'm a big fan of [Raph Levien's][raph]
work, such as [druid][druid] and [xilem][xilem], but these are large, and still
unfinished projects that I'd rather not take on as dependencies. However, I
think a lot of [good ideas][archi] can be borrowed from them.

There are many other promising UI library projects for Rust, but none tick
all of the boxes for me, so I decided to build my own on top of `glow`.
The goal, as usual, is to write something maintainable and as close to
dependency-free as possible. If it ends up being useful to others, great,
but it will be primarily built based on my own requirements for this project.

So far, a few weeks into the project, I have a thin, ergonomic wrapper around
`glow` inspired by [sokol-gfx][sokol], a basic 3D renderer, a scripting
language, and the beginnings of a small [retained mode][retained] GUI library.

I'm discovering a lot of interesting problems along the way and having to make
all sorts of trade-offs and decisions to keep the code size small and
manageable for one person. So far, it feels like the goal of having a usable
2D/3D software stack for my own needs is achievable. I'll be posting updates
here as I make progress.

[raph]: https://raphlinus.github.io/
[archi]: https://raphlinus.github.io/rust/gui/2022/05/07/ui-architecture.html
[xilem]: https://xilem.dev/
[rx]: https://rx.cloudhead.io
[glfw]: https://www.glfw.org/
[glow]: https://crates.io/crates/glow/
[winit]: https://crates.io/crates/winit
[wgpu]: https://wgpu.rs
[druid]: https://docs.rs/druid/latest/druid/
[sokol]: https://floooh.github.io/2017/07/29/sokol-gfx-tour.html
[retained]: https://en.wikipedia.org/wiki/Retained_mode
