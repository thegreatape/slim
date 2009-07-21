AutoCompress = {
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
     compress_js: function(file, env){
	importPackage(com.yahoo.platform.yui.compressor);
	var compressor = new JavaScriptCompressor(new java.io.InputStreamReader(new java.io.FileInputStream(file), "UTF-8"));
	var out = new java.io.ByteArrayOutputStream();
	return compressor.compress(new java.io.OutputStreamWriter(out), -1, true, false, false, false);
    },
    extract_files: function(filename){
	var xml = new XMLList(axiom.SystemFile.readFromFile(filename));
	var tal = new Namespace("tal", "http://axiomstack.com/tale");
	return [n.toString().match(/getStaticMountpoint\(\'([^\']*)\'\)/)[1] for each(n in xml..script.@tal::attr)];
    },
    compress_all: function (){
	app.log([ AutoCompress.compress_js("/Users/thomasmayfield/Code/cuervo/apps/seoversite-console/static/"+file) for each(file in AutoCompress.fileset.js.src)].join(''));
    },
    fileset: {    }
};