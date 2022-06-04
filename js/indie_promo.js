// Constants
const sheetId = '1wCVnYRoT55Y6B_1My3oSpqS_jXfXdYTgKYkD8wJpaPo';

const tC = {
    sheetURL: 'https://docs.google.com/spreadsheets/d/' + sheetId + '/export?format=csv',
    imgUri: 'https://drive.google.com/uc?id=',
    today: new Date(),
    imgWrapper: document.getElementById('img-wrapper')
}

// Variables
let tV = {
    tempData: [],
    canvasEl: document.getElementById('my-canvas'),
}

let ctx = tV.canvasEl.getContext('2d');

// Sheet data
$.ajax({
    url: tC.sheetURL,
    async: false,
    success: function(data){
        $.each(data.split('\r\n'), function(i, row){
            if( i > 0 ){
                const tempArr = row.split(',');
                let eventDate = new Date( tempArr[0] );

                if( eventDate > tC.today ){
                    tV.tempData.push({
                        'Date': tempArr[0],
                        'Date Text': tempArr[1],
                        'Headliner': tempArr[2],
                        'Feature': tempArr[3],
                        'Image': tempArr[4]
                    });
                }
            }
        });
    }
});

const appData = tV.tempData;
tV.tempData = [];

console.log(appData);

/*
    -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
    * Function Declarations
    -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
*/
function buildHeader(){
    const logo = document.getElementById('logo-img');

    let bg = ctx.createLinearGradient(0, 0, 200, 0);
    bg.addColorStop(0, '#242021');
    bg.addColorStop(1, '#242021');

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1440, 900);

    ctx.drawImage(logo, 670, 40, 610, 101);

    ctx.fillStyle = '#fff';
    ctx.font = "55px Chivo";
    ctx.fillText("Coming Soon To", 140, 115);
}

function addImagesToPage(){
    // $.each(appData, function(i, obj){
    //     if( i > 0 ){
    //         $('#img-wrapper').append('<img src="' + tC.imgUri + obj['Image'] + '" class="img-copy">');
    //     }
    // });
}

function addImagesToCanvas(){
    let grd = ctx.createLinearGradient(0, 0, 200, 0);
    
    let vertPos = 200;
    let horPos = 80;

    let printBool = true;

    for( let i = 0; i < 8; i++ ){
        if( appData[i] != undefined ){
            grd.addColorStop(0, 'red');
            grd.addColorStop(1, 'red');

            ctx.fillStyle = grd;
            ctx.fillRect(horPos, vertPos, 240, 135);

            vertPos += 170;
            
            if( i == 3 ){
                vertPos = 200;
                horPos = 750;
            }
        }
    }

    // const images = document.querySelectorAll('.img-copy');
    // let topPos = 0;
    // let bottomPos = 0;
    
    // images.forEach(function(el){
    //     ctx.drawImage(el, topPos, bottomPos);

    //     topPos += 10;
    //     bottomPos += 10;
    // });

    addDates();
    addHeadliner();
    addFeature();
}

function addDates(){
    let vertPos = 230;
    let horPos = 335;

    for( let i = 0; i < 8; i++ ){
        if( appData[i] != undefined ){
            ctx.fillStyle = '#CCBF2B';
            ctx.font = "30px Montserrat";
            ctx.fillText(appData[i]['Date Text'], horPos, vertPos);
    
            vertPos += 170;
    
            if( i == 3 ){
                vertPos = 230;
                horPos += 670;
            }
        }
    }
}

function addHeadliner(){
    let vertPos = 290;
    let horPos = 335;

    for( let i = 0; i < 8; i++ ){
        if( appData[i] != undefined ){
            ctx.fillStyle = '#fff';
            ctx.font = "45px Chivo";
            ctx.fillText(appData[i]['Headliner'], horPos, vertPos, 355);
    
            vertPos += 170;
    
            if( i == 3 ){
                vertPos = 290;
                horPos += 670;
            }
        }
    }
}

function addFeature(){
    let vertPos = 325;
    let horPos = 335;

    for( let i = 0; i < 8; i++ ){

        if( appData[i] != undefined ){
            if( appData[i]['Feature'] != '' ){
                ctx.fillStyle = '#fff';
                ctx.font = "25px Inter";
                ctx.fillText("ft. " + appData[i]['Feature'], horPos, vertPos, 355);
            }
    
            vertPos += 170;
    
            if( i == 3 ){
                vertPos = 325;
                horPos += 670;
            }
        }
    }
}

/*
    -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
    * Listeners
    -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
*/
// document.addEventListener('load', addImagesToCanvas, false);

$('#download').on('click', function(){
    let img = tV.canvasEl.toDataURL("image/png");

    let download = document.createElement("a");
    download.href = img;
    download.download = 'upcoming_shows_' + tC.today.getFullYear('YYYY') + '-' + ( tC.today.getMonth() + 1 ) + '-' + tC.today.getDate("dd") + '.png';

    download.click();

    // document.write('<img src=' + img + '">');
});

/*
    -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
    * Function Declarations
    -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
*/
buildHeader();
addImagesToPage();
addImagesToCanvas();