---
layout: page
title: "Blog"
---

# The 86Box Blog

{% for post in site.posts %}
<div>
	{% include postheader.html post=post %}
	<p>{{ post.description }}</p>
{% if forloop.last %}
{% else %}
	<hr/>
{% endif %}
</div>
{% endfor %}
