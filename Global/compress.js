/**
 * Slim	
 * Author: Thomas Mayfield <Thomas.Mayfield@gmail.com
 * Copyright (c) 2009 Thomas Mayfield All rights reserved.
 * Code licensed under the BSD License:
 *     http://www.opensource.org/licenses/bsd-license.php
 */
slim = {
    write_to_file: function (str, target){
	var writer;
	try{
	    writer = new java.io.PrintWriter(new java.io.BufferedWriter(new java.io.FileWriter(target)));
	    writer.print(str);
	} catch(e){
	    this.report(e);
	}finally{
	    if(writer)
		writer.close();
	    writer = null;
	}
    },
    compress_css: function(str){
	importPackage(com.yahoo.platform.yui.compressor);
	var compressor = new CssCompressor(new java.io.StringReader(str));
	return compressor.compress(/* linebreak column*/ -1);
    },
    compress_js: function(str){
	importPackage(com.yahoo.platform.yui.compressor);
	var compressor = new JavaScriptCompressor(new java.io.StringReader(str));
	return compressor.compress(/* linebreak column */ -1,
				   /* munge */ true,
				   /* verbose */ false,
				   /* preserve semicolons */ false,
				   /* disable optimizations */ false);
    },
    compress_all: function (){
	for each(set in slim.fileset){
	    for each(type in ['js', 'css']){
		app.log("compressing "+set[type].src.length+ " "+type+" files to "+app.serverDir + set.prefix + set[type].target);
		var all = [axiom.SystemFile.readFromFile(app.serverDir + set.prefix + file) for each(file in set[type].src)].join('\n');
		var compressed = slim['compress_'+type](all);
		app.log("... done, compressed size is "+((compressed.length / all.length) * 100)+"% of original");
		slim.write_to_file(compressed, app.serverDir + set.prefix + set[type].target);
	    }
	}
    },
    css: function(name){
	var list;
	if(app.properties['slim.compress'] == 'true'){
	    list = [slim.fileset[name].css.target];
	} else {
	    list = slim.fileset[name].css.src;
	}
	return TAL(<head xmlns:tal="http://axiomstack.com/tale">
		        <link rel="stylesheet" type="text/css" tal:repeat="item: list" tal:attr="href: app.getStaticMountpoint(item)" />
		   </head>,
		   {list: list}).link;
    },
    js: function(name){
	var list;
	if(app.properties['slim.compress'] == 'true'){
	    list = [slim.fileset[name].js.target];
	} else {
	    list = slim.fileset[name].js.src;
	}
	return TAL(<head xmlns:tal="http://axiomstack.com/tale">
	                <script type="text/javascript" tal:repeat="item: list" tal:attr="src: app.getStaticMountpoint(item)"/>
		   </head>,
		   {list: list}).script;
    },
    add: function(name, set){
	slim.fileset[name] = set;
    },
    fileset: {}
};