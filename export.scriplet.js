javascript:(function(){var exportProgram={downloadAudio:!0,downloadExportFile:!1,index:0,$els:null,startTime:null,initialized:!1,prompts:[{title:"Download Audio?",key:"downloadAudio"},{title:"Download Export File?",key:"downloadExportFile"}],$console:null,$normalFlashcards:null,$reverseFlashcards:null,runProgram:function(){if(!exportProgram.initialized){$("head").append('<link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css">');for(var a=0;a<exportProgram.prompts.length;a++)exportProgram.initPromptDialog(a);exportProgram.initResultsDialog(),exportProgram.initialized=!0}console.clear(),exportProgram.index=0,exportProgram.$els=$("table.vocab-table:has(input[type=checkbox]:checked)"),0===exportProgram.$els.length?console.warn("No vocabulary selected."):exportProgram.openPromptDialog(0)},beginExport:function(){exportProgram.startTime=new Date,exportProgram.openResultsDialog(),$(document).bind("ajaxSuccess",exportProgram.expandNextVocabularyWord),exportProgram.expandNextVocabularyWord()},initPromptDialog:function(a){var b=exportProgram.prompts[a].title,c=exportProgram.prompts[a].key,d="dialog-"+c;$("body").append('<div data-index="'+a+'" id="'+d+'" title="'+b+'"></div>'),$("#"+d).dialog({autoOpen:!1,buttons:{Yes:function(){exportProgram[c]=!0,$(this).dialog("close");var a=Number($(this).data("index"));exportProgram.openPromptDialog(a+1)},No:function(){exportProgram[c]=!1,$(this).dialog("close");var a=Number($(this).data("index"));exportProgram.openPromptDialog(a+1)}}})},openPromptDialog:function(a){a<exportProgram.prompts.length?$("#dialog-"+exportProgram.prompts[a].key).dialog("open"):exportProgram.beginExport()},initResultsDialog:function(){var a='<div id="results-dialog" title="Export Program">';a+="<h4>Console</h4>",a+='<textarea class="ui-widget ui-state-default ui-corner-all" id="console" style="resize: none; width: 100%; height: 150px; margin-bottom: 20px" readonly></textarea>',a+="<h4>Normal Flashcards</h4>",a+='<textarea class="ui-widget ui-state-default ui-corner-all" id="normal-flashcards" style="resize: none; width: 100%; height: 150px; margin-bottom: 20px" readonly></textarea>',a+="<h4>Reverse Flashcards</h4>",a+='<textarea class="ui-widget ui-state-default ui-corner-all" id="reverse-flashcards" style="resize: none; width: 100%; height: 150px; margin-bottom: 20px" readonly></textarea>',a+="</div>",$("body").append(a),exportProgram.$console=$("#results-dialog #console"),exportProgram.$normalFlashcards=$("#results-dialog #normal-flashcards"),exportProgram.$reverseFlashcards=$("#results-dialog #reverse-flashcards"),$("#results-dialog").dialog({autoOpen:!1,width:800,height:800,buttons:{"Copy Normal Flashcards":function(){exportProgram.$normalFlashcards[0].select(),document.execCommand("copy"),window.getSelection().removeAllRanges()},"Copy Reverse Flashcards":function(){exportProgram.$reverseFlashcards[0].select(),document.execCommand("copy"),window.getSelection().removeAllRanges()}}})},openResultsDialog:function(){var a=$("#results-dialog");a.find("textarea").val(""),a.dialog("open")},appendTextarea:function(a,b){var c=a.val();c=c.trim().length>0?c+"\n"+b:b,a.val(c)},expandNextVocabularyWord:function(){var a=exportProgram.$els,b=exportProgram.index;if(b<a.length){exportProgram.appendTextarea(exportProgram.$console,"Expanding "+(b+1)+" out of "+a.length+"...");var c=a.eq(b);exportProgram.index++,c.find("span.fa-expand").length>0?c.find("span.fa-expand").click():exportProgram.expandNextVocabularyWord()}else $(document).unbind("ajaxSuccess",exportProgram.expandNextVocabularyWord),exportProgram.performExport()},saveContent:function(a,b){var c=document.createElement("a");c.href=a,b?c.download=b:c.download=a,c.click()},checkAllInRange:function(a,b){a=a||0,b=b||100,$("table.vocab-table input[type=checkbox]").slice(a,b).attr("checked",!0)},performExport:function(){var a="",b="";$("table.vocab-table:has(span.fa-compress)").each(function(){var c=$(this),d=c.next().next().find("embed"),e=c.find("td:eq(1)").text().trim(),f=c.find("td:eq(2)").text().trim(),g=c.find("td:eq(3)").text().trim(),h=e+"\t"+g+" ("+f+")",i=g+" ("+f+")";if(d.length>0){var j=/url=(.*?\.mp3)/.exec(d.attr("flashvars"))[1],k=j.substring(j.lastIndexOf("/")+1);h+="[sound:"+k+"]",i+="[sound:"+k+"]",exportProgram.downloadAudio&&exportProgram.saveContent(j)}i+="\t"+e,exportProgram.appendTextarea(exportProgram.$normalFlashcards,h),exportProgram.appendTextarea(exportProgram.$reverseFlashcards,i),a.length>0&&(a+="\n",b+="\n"),a+=h,b+=i});var c=(new Date-exportProgram.startTime)/1e3;exportProgram.appendTextarea(exportProgram.$console,"Export completed. Downloaded "+exportProgram.$els.length+" words in "+c+" seconds."),exportProgram.downloadExportFile&&exportProgram.saveContent("data:,"+a,"export.txt")}};exportProgram.runProgram();})()