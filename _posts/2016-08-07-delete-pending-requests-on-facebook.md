---
layout: post
title: "Delete your pending friend's requests on Facebook"
description: A short HowTo tutorial to execute a script to delete all pending friend's requests at once.
lang: en-US
date: 2016-08-07
---

_[This tutorial has its own repository](https://github.com/dorianbayart/delete-pending-requests-on-facebook)_

> A tutorial to show you how to execute a small script, to delete all your pending friend's requests at once.

This script works well with the _Google Chrome_ webbrowser.

#### Bug with Firefox
There is a bug with Firefox.
Only half requests are deleted with that script.

#### English langage required !
This script works only if your Facebook is displayed in english !  
To change the langage, set the display langage setting to `english` here : [https://www.facebook.com/settings?tab=language](https://www.facebook.com/settings?tab=language)

### Steps
1. **Go to the Friend's requests page**  
You'll find that page here : [https://www.facebook.com/friends/requests/?fcref=jwl](https://www.facebook.com/friends/requests/?fcref=jwl)  
Then scroll down a bit and click on the `Show more requests` link until there is no more requests to display (it depends on how much pending requests you have).

2. Open the Javascript Console  
_It may ask you to type some words to allow you to execute a script command.
This is to prevent you to execute bad scripts (viruses, malwares, etc.)._
  1. **Chrome users**  
Press : `Ctrl` + `Shift` + `J` (Windows) / `Cmd` + `Opt` + `J` (Mac)
  2. **Firefox users**  
Press : `Ctrl` + `F4`

3. Execute the script  
{% highlight javascript %}inputs=document.getElementsByTagName('button'); for(i in inputs){if(inputs[i].innerHTML == 'Delete Request' && inputs[i].id != "") {inputs[i].click();}}{% endhighlight %}
  1. Copy this script
  2. Paste it to your Javascript Console
  3. Execute it by pressing Enter


### Result
You should see all the "Delete Request" buttons turning into "Mark as Spam" buttons.  
**Done.**  
