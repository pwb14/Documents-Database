// Userlist data array for filling in info box
var docListData = [];
var objectDesc = '';
var objectTrans= '';
// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    $('#docList table tbody').on('click', 'td a.linkshowdoc', showDocInfo);
    $('#descButton').on('click', showDesc);
    $('#transButton').on('click', showTrans);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/docs/doclist', function( data ) {

        docListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowdoc" rel="' + this.name + '">' + this.name + '</a></td>';
            tableContent += '<td>' + this.date + '</td>';
            tableContent += '<td>'+this.photoid+'</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#docList table tbody').html(tableContent);
    });
};

function showDocInfo(event) {



    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisDocName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = docListData.map(function(arrayItem) { return arrayItem.name; }).indexOf(thisDocName);

    // Get our User Object
    var thisDocObject = docListData[arrayPosition];

    //Populate Info Box
    $('#docName').text(thisDocObject.name);
    $('#docDate').text(thisDocObject.date);
    $('#docPhotoId').text(thisDocObject.photoid);
    $('#textBox').text(thisDocObject.desc);
    $('#docPhotoId').html(function(){
        var source = "/images/" + thisDocObject.photoid + ".jpg";
        var imageHtml = "<img src= '" + source + "'  alt='Smiley face'>"
        return imageHtml;
    });

    objectDesc = thisDocObject.desc;
    objectTrans = thisDocObject.trans;




};
function showDesc(){
    $('#textBox').text(objectDesc);
};
function showTrans(){
    $('#textBox').text(objectTrans);
};
