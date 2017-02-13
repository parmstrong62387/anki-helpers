var exportProgram = {
	'downloadAudio': true, //Set to true to download the associated audio files
	'downloadExportFile': false, //Set to true to download a file containing the export in ANKI format
	'index': 0, //Do not modify
	'$els': null, //Do not modify
	'startTime': null, //Do not modify
	'initialized': false, //Do not modify
	'prompts': [
		{
			'title': 'Download Audio?',
			'key': 'downloadAudio'
		},
		{
			'title': 'Download Export File?',
			'key': 'downloadExportFile'
		}
	],
	'$console': null,
	'$normalFlashcards': null,
	'$reverseFlashcards': null,

	'runProgram': function() {
		if (!exportProgram.initialized) {
			$('head').append('<link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css">');
			for (var i = 0; i < exportProgram.prompts.length; i++) {
				exportProgram.initPromptDialog(i);
			}
			exportProgram.initResultsDialog();
			exportProgram.initialized = true;
		}

		console.clear();
		exportProgram.index = 0;
		exportProgram.$els = $('table.vocab-table:has(input[type=checkbox]:checked)');

		if (exportProgram.$els.length === 0) {
			console.warn('No vocabulary selected.');
		} else {
			exportProgram.openPromptDialog(0);
		}
	},

	'beginExport': function() {
		exportProgram.startTime = new Date();
		exportProgram.openResultsDialog();
		$(document).bind("ajaxSuccess", exportProgram.expandNextVocabularyWord);
		exportProgram.expandNextVocabularyWord();
	},

	'initPromptDialog': function(index) {
		var title = exportProgram.prompts[index].title;
		var key = exportProgram.prompts[index].key;
		var id = 'dialog-' + key;
		$('body').append('<div data-index="' + index + '" id="' + id + '" title="' + title + '"></div>');
		$('#' + id).dialog({
			'autoOpen': false,
			'buttons' : {
				'Yes' : function() {
					exportProgram[key] = true;
					$(this).dialog("close");
					var index = Number($(this).data('index'));
					exportProgram.openPromptDialog(index+1);
				},
				'No' : function() {
					exportProgram[key] = false;
					$(this).dialog("close");
					var index = Number($(this).data('index'));
					exportProgram.openPromptDialog(index+1);
				}
			}
		});
	},

	'openPromptDialog': function(index) {
		if (index < exportProgram.prompts.length) {
			$('#dialog-' + exportProgram.prompts[index].key).dialog('open');
		} else {
			exportProgram.beginExport();
		}
	},

	'initResultsDialog': function() {
		var resultsDialogMarkup = '<div id="results-dialog" title="Export Program">';
		resultsDialogMarkup += '<h4>Console</h4>';
		resultsDialogMarkup += '<textarea class="ui-widget ui-state-default ui-corner-all" id="console" style="resize: none; width: 100%; height: 150px; margin-bottom: 20px" readonly></textarea>';
		resultsDialogMarkup += '<h4>Normal Flashcards</h4>';
		resultsDialogMarkup += '<textarea class="ui-widget ui-state-default ui-corner-all" id="normal-flashcards" style="resize: none; width: 100%; height: 150px; margin-bottom: 20px" readonly></textarea>';
		resultsDialogMarkup += '<h4>Reverse Flashcards</h4>';
		resultsDialogMarkup += '<textarea class="ui-widget ui-state-default ui-corner-all" id="reverse-flashcards" style="resize: none; width: 100%; height: 150px; margin-bottom: 20px" readonly></textarea>';
		resultsDialogMarkup += '</div>';
		$('body').append(resultsDialogMarkup);
		exportProgram.$console = $('#results-dialog #console');
		exportProgram.$normalFlashcards = $('#results-dialog #normal-flashcards');
		exportProgram.$reverseFlashcards = $('#results-dialog #reverse-flashcards');
		$('#results-dialog').dialog({
			'autoOpen': false,
			'width': 600,
			'height': 800,
			'buttons' : {
				'Copy Normal Flashcards' : function() {
					
				},
				'Copy Reverse Flashcards' : function() {
					
				}
			}
		});
	},

	'openResultsDialog': function() {
		var $dialog = $('#results-dialog');
		$dialog.find('textarea').val('');
		$dialog.dialog('open');
	},

	'appendTextarea': function($textarea, message) {
		var val = $textarea.val();
		if (val.trim().length > 0) {
			val = val + '\n' + message;
		} else {
			val = message;
		}
		$textarea.val(val);
	},

	'expandNextVocabularyWord': function() {
		var $els = exportProgram.$els;
		var index = exportProgram.index;

		if (index < $els.length) {
			exportProgram.appendTextarea(exportProgram.$console, 'Expanding ' + (index+1) + ' out of ' + $els.length + '...');
			var $el = $els.eq(index);
			exportProgram.index++;

			if ($el.find('span.fa-expand').length > 0) {
				$el.find('span.fa-expand').click();
			} else {
				exportProgram.expandNextVocabularyWord();
			}
			
		} else {
			$(document).unbind("ajaxSuccess", exportProgram.expandNextVocabularyWord);
			exportProgram.performExport();
		}
	},

	'saveContent': function(url, fileName)
	{
	    var link = document.createElement('a');
	    link.href = url;
	    if (fileName) {
	    	link.download = fileName;
	    } else {
	    	link.download = url;
	    }
	    link.click();
	},

	'checkAllInRange': function(startIndex, endIndex) {
		startIndex = startIndex || 0;
		endIndex = endIndex || 100;
		$('table.vocab-table input[type=checkbox]').slice(startIndex, endIndex).attr('checked', true);
	},

	'performExport': function() {
		var exportContents = '';
		var reverseContents = '';

		$('table.vocab-table:has(span.fa-compress)').each(function (){
			var $wordTable = $(this);
			var $embed = $wordTable.next().next().find('embed');

			var character = $wordTable.find('td:eq(1)').text().trim();
			var pinyin = $wordTable.find('td:eq(2)').text().trim();
			var definition = $wordTable.find('td:eq(3)').text().trim();
			
			var exportLine = character + '\t' + definition + ' (' + pinyin + ')';
			var reverseLine = definition + ' (' + pinyin + ')';

			if ($embed.length > 0) {
				var url = /url=(.*?\.mp3)/.exec($embed.attr('flashvars'))[1];
				var fileName = url.substring(url.lastIndexOf('/')+1);
				exportLine += '[sound:' + fileName +']';
				reverseLine += '[sound:' + fileName +']';

				if (exportProgram.downloadAudio) {
					exportProgram.saveContent(url);
				}
			}

			reverseLine += '\t' + character;

			exportProgram.appendTextarea(exportProgram.$normalFlashcards, exportLine);
			exportProgram.appendTextarea(exportProgram.$reverseFlashcards, reverseLine);

			if (exportContents.length > 0) {
				exportContents += '\n';
				reverseContents += '\n';
			}

			exportContents += exportLine;
			reverseContents += reverseLine;
		});

		var timeTaken = (new Date() - exportProgram.startTime) / 1000.0;
		exportProgram.appendTextarea(exportProgram.$console, 'Export completed. Downloaded ' + exportProgram.$els.length + ' words in ' + timeTaken + ' seconds.');

		if (exportProgram.downloadExportFile) {
			exportProgram.saveContent('data:,' + exportContents, 'export.txt');
		}
	}
};

exportProgram.runProgram();