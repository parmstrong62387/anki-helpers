var exportProgram = {
	index: 0,
	$els: null,
	downloadAudio: true,
	downloadExportFile: false,
};

function runProgram() {
	console.clear();
	exportProgram.index = 0;
	exportProgram.$els = $('table.vocab-table:has(input[type=checkbox]:checked)');

	if (exportProgram.$els.length === 0) {
		console.warn('No vocabulary selected.');
	} else {
		$(document).bind("ajaxSuccess", clickAudio);
		clickAudio();
	}
}

function clickAudio() {
	var $els = exportProgram.$els;
	var index = exportProgram.index;

	if (index < $els.length) {
		console.info('Clicking ' + (index+1) + ' out of ' + $els.length + '...');
		$els.eq(index).find('span.fa-expand').click();

		exportProgram.index++;
	} else {
		$(document).unbind("ajaxSuccess", clickAudio);
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

	if (exportProgram.downloadExportFile) {
		saveContent('data:,' + exportContents, 'export.txt');
	}
}

runProgram();