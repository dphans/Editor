# V2Editor
A javascript library for editing RichText

## How to use?

1. Import css and js files

```html
<link rel="stylesheet" type="text/css" href="path/to/css/vue2-wysiwyg.min.css">
<script type="text/javascript" src="path/to/js/vue2-wysiwyg.js"></script>
```

Editor using *fontawesome* to display icons into toolbar, so you need to import fontawesome in header

```html
<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
```

2. Create element and implement just one line of code

```html
<div id="MyEditor"></div>
```

```javascript
new Editor('MyEditor', {});
```

3. Highlight syntax (option)
Import highlightjs, Editor will detect highlightjs and render automatically

```html
<!-- xcode syntax highlight theme -->
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.21/css/uikit.min.css">
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/highlight.min.js"></script>
```


## For UIkit users?
Just import UIkit framework into your html document. Editor will auto create UIkit classes and scripts to fix your site
