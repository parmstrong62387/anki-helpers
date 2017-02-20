# Chinese POD to ANKI Export

This is a plugin which can be used to export vocabulary from Chinese pod to ANKI. Chinese pod already provides this service, but their export doesn't include the associated audio files, and this one does.

## Installing the plugin
The plugin can be installed as a bookmarklet. This basically is a bookmark in your browser which executes JavaScript.

Create a new bookmark in your browser. The title can be whatever you want, and the URL should be the contents of this file: [export.scriplet.js](./export.scriplet.js)

## Using the plugin
The plugin will export all vocabulary items which are checked on the vocabulary section of Chinese pod. If no items are checked, the program will prompt you to select a range of items.
![Selecting a range](https://goo.gl/photos/Jj72sYUh5rR1h66U6)

If items are checked, running the program will export the vocabulary items. First, the program will prompt you if you want to download audio, and a file containing the contents of the export.

When the export starts a dialog will pop up which shows the progress of the export. It will also print a message when it's done.
![Showing progress](https://goo.gl/photos/FVyDy32LnzU6k79F7)

After the export is complete, if you chose to download audio, the downloaded audio files will need to be copied to your ANKI home directory. The audio files should be downloaded into your local Downloads folder. The ANKI target directory is \<ANKI HOME\>/\<USER\>/collection.media.

The program creates Chinese to English flashcards as well as English to Chinese flashcards (for character writing practice). To import to ANKI, save the contents of the export to a text file. The contents can be copied by clicking the buttons at the bottom of the dialog.
![Copying contents](https://goo.gl/photos/g6zbu2b5j2fBcFbF9)

Save the exported vocabulary in a text file, then use ANKI's import feature.
PUT IMAGE HERE
