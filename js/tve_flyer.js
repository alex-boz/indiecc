// Constants
const sheetId = '1sUHyT7fok4Y3ueCAeVR-QWCDnkmviqd-CgZvskBjyiI';

const tC = {
    sheetURL: 'https://docs.google.com/spreadsheets/d/' + sheetId + '/export?format=tsv',
    imgUri: window.location.href.split('/')[0] + '/indiecc/images/',
    today: new Date(),
    address: "2320 CANIFF AVE, HAMTRAMCK, MI"
}

// Variables
let tV = {
    tempData: [],
    canvasEl: document.getElementById('tve-canvas'),
    counter: 0,
    dateChange: '',
    namePairs: []
}

let ctx = tV.canvasEl.getContext('2d');

// Sheet data
$.ajax({
    url: tC.sheetURL,
    async: false,
    success: function(data){
        const tempRows = data.split('\r\n');

        $.each(tempRows, function(i, row){
            if( i > 0 ){
                const tempRowSplit = row.split('\t');

                tV.tempData[tempRowSplit[0]] = {
                    lineup: tempRowSplit[1],
                    host: tempRowSplit[2]
                }
            }
        });
    }
});

const toolData = tV.tempData;
tV.tempData = {};

/*
    -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
    * FUNCTION DECLARATIONS
    -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
*/
function buildDropdown(){
    const dropValues = Object.keys(toolData);

    $.map(dropValues, function(date){
        const tempDate = new Date(date);

        if( tempDate >= tC.today ){
            $('#dates').append('<option value="' + date + '">' + date + '</option>');
        }
    });

    $('#dates').select2({
        minimumResultsForSearch: -1,
        width: '50%',
        placeholder: '- Select a Date -'
    });
}

function drawBG(){
    let bg = ctx.createLinearGradient(0, 0, 200, 0);
    bg.addColorStop(0, '#010101');
    bg.addColorStop(1, '#010101');

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1920);
}

function drawLogo(){
    const logo = document.getElementById('tve-logo');
    const iccLogo = document.getElementById('indie-logo');

    const centeredWidth = (1095 - 700) / 2;
    const centeredWidth2 = (1080 - 500) / 2;

    ctx.drawImage(logo, centeredWidth, -70, 700, 700);
    ctx.drawImage(iccLogo, centeredWidth2, 1270, 500, 209);
}

function drawText(){
    const tempDate = new Date( tV.dateChange );
    let vertSpace = 820;

    ctx.fillStyle = '#F8E261';
    ctx.font = '78px Bebas Neue';
    ctx.textAlign = 'center';
    ctx.fillText('Free Stand-up Showcase', 540, 600);

    const month = tempDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const date = tempDate.getDate();

    dateTime = month + ' ' + ' ' + ' ' + date + ordinal(date) + ' ' + ' ' + ' ' + '10PM';

    ctx.fillStyle = '#fff';
    ctx.font= '70px Abel';
    ctx.textAlign = 'center';
    ctx.fillText(dateTime, 540, 690);

    namePairs(toolData[tV.dateChange]['lineup']);

    $.each(tV.namePairs, function(i, lineArr){
        let lineArrText = '';

        $.each(lineArr, function(i, name){
            if( i == 0 ){
                lineArrText = lineArrText + name.toUpperCase() + ' ' + ' ' + ' ';
            }
            else{
                lineArrText = lineArrText + name.toUpperCase();
            }
        });

        ctx.fillStyle = '#F8E261';
        ctx.font = '55px Abel';
        ctx.textAlign = 'center';
        ctx.fillText(lineArrText, 540, vertSpace);

        vertSpace = vertSpace + 70;


    });

    tV.namePairs = [];

    ctx.fillStyle = '#fff';
    ctx.font = '70px Bebas Neue';
    ctx.textAlign = 'center';
    ctx.fillText('HOSTED BY: ' + toolData[tV.dateChange]['host'].toUpperCase(), 540, 1100);

    ctx.fillStyle = '#fff';
    ctx.font = '70px Bebas Neue';
    ctx.textAlign = 'center';
    ctx.fillText('LOTTERY SPOTS AVAILABLE', 540, 1190);

    ctx.fillStyle = '#fff';
    ctx.font = '60px Abel';
    ctx.textAlign = 'center';
    ctx.fillText(tC.address, 540, 1600);
}

function drawImage(){
    ctx.clearRect(0, 0, tV.canvasEl.width, tV.canvasEl.height);

    drawBG();
    drawLogo();
    drawText();
}

function namePairs(lineupText){
    const lineupArr = lineupText.split(', ');
    let counter = 0;

    for( let i = 0; i < lineupArr.length; i+=2 ){
        if( tV.namePairs[counter] == undefined ){
            tV.namePairs[counter] = [];
        }

        tV.namePairs[counter].push(lineupArr[i]);

        if( lineupArr[i + 1] != undefined ){
            tV.namePairs[counter].push(lineupArr[i + 1]);
        }

        counter++;
    }

    console.log(tV.namePairs);
}

function ordinal(date) {
    if(date > 20 || date < 10) {
      switch(date%10) {
        case 1:
          return "ST";
        case 2:
          return "ND";
        case 3:
          return "RD";
      }
    }
    return "TH";
}

/*
    -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
    * LISTENERS
    -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
*/
$('#dates').on('change', function(){
    $('#app-wrapper').show();
    tV.dateChange = $(this).val();

    drawImage();
});

$('#download').on('click', function(){
    let img = tV.canvasEl.toDataURL("image/png");

    let download = document.createElement("a");
    download.href = img;
    download.download = 'tve_flyer_' + tC.today.getFullYear('YYYY') + '-' + ( tC.today.getMonth() + 1 ) + '-' + tC.today.getDate("dd") + '.png';

    download.click();

    // document.write('<img src=' + img + '">');
});

/*
    -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
    * INITIALIZATIONS
    -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
*/

buildDropdown();