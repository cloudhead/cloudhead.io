---
title: "Staying the hell out of insert mode"
date: 24.04.2010
type: post
layout: default
---

Back in the day, the first thing I learnt about [vi][1] was how to get into
insert mode. It was really quite essential, because without knowing how, you
couldn't actually type anything.

[1]: http://en.wikipedia.org/wiki/Vi

The secret was in the `i` command.  The `i` command was what made vi useable,
it was the alpha and the omega, vi's be-all end-all - and whenever the editor
would magically exit insert mode, panic would ensue and I'd frantically press
`i` to go back to insert-land.

I mean, what else would you want to do in a *text editor*, besides entering text?
It puzzled me for a long time.

The `i` key turned this rather archaic and obtuse program into a text-editor
which would respond predictably to keystrokes. I remember being asked from time
to time: "So what's the deal with vi?"; I'd answer in the lines of: "Vi? you
have to press `i` to start typing. Also, try not to press `Esc`".

But that was then, and this is now. Today, vi ([vim][2] actually) is my primary
editor. What I'd like to show you, is how to stay the hell out of insert mode.

[2]: http://en.wikipedia.org/wiki/Vim_(text_editor)

## Why stay out?

Insert mode is vi's weakest mode. In this mode, it's no better than *any other
editor*, and you may as well be using *any other editor*. Vi's true power lies
in its *Normal mode*. Yes, inserting text is *not* normal in vi-land. The
more time you spend in Normal mode, the more super-powers you will have.
Trust me, it doesn't get any *less* normal than Normal mode.

> Someone once argued that insert mode was actually vi's most powerful mode,
> because it was the only mode in which you could insert text. He obviously
> wasn't familiar with `:r`.

## How do you get the hell out?

Common knowledge states that pressing the `Esc` key will get you out of insert
mode.  This is correct. This is also not very useful. If you're going to move
in and out of insert mode all the time, you're going to want it to be as
seamless as possible. There are two other ways to get out of insert mode:

    Ctrl-[

and

    Ctrl-C

The other alternative, which I have chosen, is to map a key sequence to enter
normal mode. Vi lets you map arbitrary sequences of keys to anything you like.
For instance, you could map `jj` to normal mode. `j` is on the home row, so you
don't need to move your fingers to exit insert mode. I tried this out for a
while, as well as a couple of other alternatives. In the end, I settled on
`kj`, as it was the fastest to type. To create this mapping, add this to your
`.vimrc` file:

    inoremap kj <Esc>

So what if I actually wanted to write "jj" or "kj"? For example if I wanted to
write a blog post such as this one? Well, I'd just have to wait for the
first letter in the sequence to be inserted. The length of time vi waits for you
to complete such a sequence of characters is controlled by the `timeoutlen` setting,
which defaults to `1000ms`. You can change this as such:

    set timeoutlen=200

Another really useful trick is switching to normal mode for a single command.
You can do this with `Ctrl-O`. For instance, say you're typing away in insert
mode and you want to quickly save your work, you can type `Ctrl-O` and `:w`,
which will write the file and put you back in insert mode.

## Learning, the hard way

How do you stop yourself from spending too much time in insert mode? Well, you
could add these key mappings to your *.vimrc*:

    inoremap <Left>  <NOP>
    inoremap <Right> <NOP>
    inoremap <Up>    <NOP>
    inoremap <Down>  <NOP>

This would make sure you don't get your little fingers on the arrow keys, and
start navigating (*gasp*) in insert mode.

## During your stay

Even though staying out of insert mode is safest, knowing what you *can* do in
this mode can be useful for the duration of your stay.

- `Ctrl-Y`: insert the character right above the cursor&mdash;you can see how this can be useful...
- `Ctrl-U`: delete the current line from the cursor position.
- `Ctrl-A`: re-insert the text inserted in the previous insert session.

I hope I didn't put you off of insert mode too much. After all, as someone once
said: *it is the only mode in which you can insert*.
