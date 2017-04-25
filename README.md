# Editor
A simple WYSIWYG RichText editor Javascript library.
- [Demo](https://dphans.github.io/Editor/demo/)
- This is part of [TekTalk community](https://www.facebook.com/tektalkcommunity/).


## Features
- Customize editor toolbar items.
- Inline styles: Bold, Italic, Underline, StrikeThrough, Code, Highlight Text.
- Format line styles: Section (H2), Sub-section (H3), BlockQuotes, BlockCode, List Ordered/Bullet, Indenting, Text Alignment.
- Support formating code, can using with highlightjs and color styles.


## Getting started
Get familiar with the basic setup and overview of Editor.

**Installation**

*Install via **bower**:*

```bash
bower install --save V2Editor
```

*Custom build using **grunt***
```bash
git clone https://github.com/dphans/Editor.git Editor
cd Editor
grunt
grunt connect
```
Open localhost with port `5000` for testing editor. Or using `grunt watch` to view updates while editing source code. **Don't forgot help me to fix bugs and improve Editor 🤗**

**HTML markup**
```html
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <!-- Editor using font-awesome to display default icons into toolbar items -->
        <!-- You can remove font-awesome and declare your own toolbar items with other icons style if needed -->
        <link rel="stylesheet" type="text/css" href="path/to/css/font-awesome.min.css">
        
        <!-- Editor don't requires using jQuery, you can remove jQuery if needed -->
        <script type="text/javascript" src="path/to/js/jquery.min.js"></script>
        
        <!-- Editor don't requires using highlightjs, but it's recommended -->
        <!-- Editor will detect highlightjs in webpage and render coding syntax style inside code-block automatically -->
        <link rel="stylesheet" type="text/css" href="path/to/highlightjs/css/styles/xcode.min.css">
        <script type="text/javascript" src="path/to/highlightjs/js/highlight.min.js"></script>
        
        <link rel="stylesheet" type="text/css" href="/dist/css/vue2-wysiwyg.min.css">
        <script type="text/javascript" src="/dist/js/vue2-wysiwyg.min.js"></script>
    </head>
    <body>
        <div id="YourEditorPlaceId"></div>
        <script type="text/javascript">
            $(function() {
                new Editor('YourEditorPlaceId', {});
            })
        </script>
    </body>
</html>
```

**For UIkit users?**
Just import UIkit framework into your html document. Editor will detect and auto create UIkit (supported UIkit 3 and above) classes and scripts to fix your site :)


## Browser support
Editor will work on pretty much any modern browser: IE 10+, Safari 7+, Edge, Firefox, Chrome, Opera.

## Contact support
Questions are welcome! Any questions or issues I will try to fix it and reply your requests by tags, before opening a new issue, please double-check that someone hasn't asked before.

For quick support, please contact me via:
- [Facebook](http://facebook.com/dinophanhk)
- Email: baophan94@icloud.com

