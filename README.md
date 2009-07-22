Slim
====
Slim is a module for Axiom Stack that can automatically create minified, concatentated copies of your client-side javascript and css.   You can switch back and forth between the minified copies and development copies with a single config option.

To Use
======
1. Put slim in modules/slim under your Axiom root install.
2. Add slim to your modules in your application's app.properties: `modules = slim`
3. In your application's init method, use slim.add to create named sets of static resources to be compressed. For example:
    
        slim.add('main', {prefix: '/apps/myapp/static/',
                       css: {src: ['main.css',
                                   'section.css'],
                             target: 'all.css'},
                       js: {src: ['jquery/jquery.js',
                                  'mysite.js',
                                  'overrides.js'],
                            target: 'all.js'}
                      });
At startup, `/apps/myapp/static/main.css` and `/apps/myapp/static/section.css` will be combined, minified and written to `/apps/myapp/static/all.css`.  Same pattern for the js files.
4. Where before you would add each js or css file into your page's head element, use slim.js and slim.css instead:
<pre>
    <link tal:replace="slim.css('main')" />
    <script tal:replace="slim.js('main')" />
</pre>
If your app.properties has `slim.compress = true`, then those elements will be replaced with just the combined, minified copies.  Otherwise, each of the individual files will be used.
        

