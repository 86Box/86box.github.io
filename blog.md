---
layout: page
title: "Blog"
---

# The 86Box Blog

{% for post in site.posts %}
<div class="bloglist">
	{% include postheader.html post=post %}
	<p>{{ post.description }}</p>
</div>
{% if forloop.last %}
{% else %}
<hr/>
{% endif %}
{% endfor %}
