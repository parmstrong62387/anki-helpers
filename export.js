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
	]
};

function runProgram() {
	if (!exportProgram.initialized) {
		$('head').append('<link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css">');
		for (var i = 0; i < exportProgram.prompts.length; i++) {
			initDialog(i);
		}
		exportProgram.initialized = true;
	}

	console.clear();
	exportProgram.index = 0;
	exportProgram.$els = $('table.vocab-table:has(input[type=checkbox]:checked)');

	if (exportProgram.$els.length === 0) {
		console.warn('No vocabulary selected.');
	} else {
		openDialog(0);
	}
}

function beginExport() {
	exportProgram.startTime = new Date();
	$(document).bind("ajaxSuccess", expandNextVocabularyWord);
	expandNextVocabularyWord();
}

function initDialog(index) {
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
				openDialog(index+1);
			},
			'No' : function() {
				exportProgram[key] = false;
				$(this).dialog("close");
				var index = Number($(this).data('index'));
				openDialog(index+1);
			}
		}
	});
}

function openDialog(index) {
	if (index < exportProgram.prompts.length) {
		$('#dialog-' + exportProgram.prompts[index].key).dialog('open');
	} else {
		beginExport();
	}
}

function expandNextVocabularyWord() {
	var $els = exportProgram.$els;
	var index = exportProgram.index;

	if (index < $els.length) {
		console.info('Expanding ' + (index+1) + ' out of ' + $els.length + '...');
		var $el = $els.eq(index);
		exportProgram.index++;

		if ($el.find('span.fa-expand').length > 0) {
			$el.find('span.fa-expand').click();
		} else {
			expandNextVocabularyWord();
		}
		
	} else {
		$(document).unbind("ajaxSuccess", expandNextVocabularyWord);
		performExport();
	}
}

function saveContent(url, fileName)
{
    var link = document.createElement('a');
    link.href = url;
    if (fileName) {
    	link.download = fileName;
    } else {
    	link.download = url;
    }
    link.click();
}

function checkAllInRange(startIndex, endIndex) {
	startIndex = startIndex || 0;
	endIndex = endIndex || 100;
	$('table.vocab-table input[type=checkbox]').slice(startIndex, endIndex).attr('checked', true);
}

function performExport() {
	var exportContents = '';
	var reverseContents = '';

	$('table.vocab-table:has(span.fa-compress)').each(function (){
		var $wordTable = $(this);
		var $embed = $wordTable.next().next().find('embed');

		var character = $wordTable.find('td:eq(1)').text().trim();
		var pinyin = $wordTable.find('td:eq(2)').text().trim();
		var definition = $wordTable.find('td:eq(3)').text().trim();

		if (exportContents.length > 0) {
			exportContents += '\n';
			reverseContents += '\n';
		}
		exportContents += character + '\t' + definition + ' (' + pinyin + ')';
		reverseContents += definition + ' (' + pinyin + ')';

		if ($embed.length > 0) {
			var url = /url=(.*?\.mp3)/.exec($embed.attr('flashvars'))[1];
			var fileName = url.substring(url.lastIndexOf('/')+1);
			exportContents += '[sound:' + fileName +']';
			reverseContents += '[sound:' + fileName +']';

			if (exportProgram.downloadAudio) {
				saveContent(url);
			}
		}

		reverseContents += '\t' + character;
	});

	console.log('Normal: ');
	console.log(exportContents);
	console.log('\n\n\n\n');
	console.log('Reversed: ');
	console.log(reverseContents);
	console.log('\n\n\n\n');

	var timeTaken = (new Date() - exportProgram.startTime) / 1000.0;
	console.info('Export completed. Downloaded ' + exportProgram.$els.length + ' words in ' + timeTaken + ' seconds.');

	if (exportProgram.downloadExportFile) {
		saveContent('data:,' + exportContents, 'export.txt');
	}
}

runProgram();