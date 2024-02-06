---
title: Blog
headline: cloudhead's blog
super: "Thoughts on software & technology"
layout: default
permalink: /log/
teaser: thoughts on software
slug: log
---

{% for post in site.posts %}
  <div>
    <span class="subtle">{{ post.date | date: "%Y.%m.%d" }}</span>
    <a href="{{ post.url }}">{{ post.title }}</a>
  </div>
{% endfor %}
