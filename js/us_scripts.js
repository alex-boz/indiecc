// Constants
const sheetId = '1wCVnYRoT55Y6B_1My3oSpqS_jXfXdYTgKYkD8wJpaPo';
const sheetBase = 'https://docs.google.com/spreadsheets/d/' + sheetId + '/export?format=csv';
const imageBase = 'https://drive.google.com/uc?id=';
const todayDate = new Date();

let tempData = [];
let firstCol = [];
let secondCol = [];

$.ajax({
    url: sheetBase,
    async: false,
    success: function(data){
        $.each(data.split('\r\n'), function(i, row){
            if( i != 0 ){
                const tempArr = row.split(',');

                tempData.push({
                    'Date': tempArr[0],
                    'Date Text': tempArr[1],
                    'Headliner': tempArr[2],
                    'Feature': tempArr[3],
                    'Image': tempArr[4]
                });
            }
        });
    }
});

const appData = tempData;
tempData = [];

/*
    -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
    * FUNCTION DECLARATIONS
    -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
*/

function breakUpColumns(){
    let tempCounter = 0;

    $.each(appData, function(i, event){
        const tempDate = new Date(event['Date']);

        if( tempDate >= todayDate && tempCounter < 4 ){
            firstCol.push(event);
            tempCounter++;
        }
        else if( tempDate >= todayDate && tempCounter > 3 && tempCounter < 8 ){
            secondCol.push(event);
            tempCounter++;
        }
        else{
            // Do nothing
        }
    });

    buildEvents();
}

function buildEvents(){
    let headlinerWrap = '';
    let featureWrap = '';
    let eventInfoWrap = '';
    let imageWrap = '';
    let infoWrap = '';
    let dateWrap = '';
    let eventWrap = '';

    let headlinerWrap2 = '';
    let featureWrap2 = '';
    let eventInfoWrap2 = '';
    let imageWrap2 = '';
    let infoWrap2 = '';
    let dateWrap2 = '';
    let eventWrap2 = '';

    for( let i=0; i < 4; i++ ){
        headlinerWrap = '<div class="headliner">' + firstCol[i]['Headliner'] + '</div>';
        headlinerWrap2 = '<div class="headliner">' + secondCol[i]['Headliner'] + '</div>';

        if( firstCol[i]['Feature'] != '' || firstCol[i]['Feature'] == undefined ){
            featureWrap = '<div class="feature">FT. ' + firstCol[i]['Feature'] + '</div>';
        }
        
        if( secondCol[i]['Feature'] != '' || secondCol[i]['Feature'] == undefined ){
            featureWrap2 = '<div class="feature">FT. ' + secondCol[i]['Feature'] + '</div>';
        }

        eventInfoWrap = '<div class="event-info">' + headlinerWrap + featureWrap + '</div>';
        eventInfoWrap2 = '<div class="event-info">' + headlinerWrap2 + featureWrap2 + '</div>';

        imageWrap = '<div class="thumb"><img src="' + imageBase + firstCol[i]['Image'] + '"></div>';
        imageWrap2 = '<div class="thumb"><img src="' + imageBase + secondCol[i]['Image'] + '"></div>';

        infoWrap = '<div class="info">' + imageWrap + eventInfoWrap + '</div>';
        infoWrap2 = '<div class="info">' + imageWrap2 + eventInfoWrap2 + '</div>';

        dateWrap = '<div class="date">' + firstCol[i]['Date Text'] + '</div>';
        dateWrap2 = '<div class="date">' + secondCol[i]['Date Text'] + '</div>';

        eventWrap = '<div class="event-wrapper">' + dateWrap + infoWrap + '</div>';
        eventWrap2 = '<div class="event-wrapper">' + dateWrap2 + infoWrap2 + '</div>';

        $('#events').append('<div class="two-col">' + eventWrap + eventWrap2 + '</div>');
    }
}

/*
    -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
    * INVOKED FUNCTION
    -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
*/

breakUpColumns();