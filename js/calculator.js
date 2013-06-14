$(function(){

var weekdays = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
var month_en = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
var ruWeekDays = [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ];
var ruMonths = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ];

// по умол. англ.
var lang = "eng";

// выбор языка
$(':input[name=lng]').click(function(){

	lang = $(this).attr("value");
	
	switch (lang)
	{
	
		case "eng" : $('#wDay').text( weekdays[ $('#dWeek').slider("value") ] ); 
					 $('#cMonth').text( month_en[ $('#sMonth').slider("value") ] );
					 $('#jez').text("en");
					 $('#valuta').text("у.е.");
			break;
			
		case "rus" : $('#wDay').text( ruWeekDays[ $('#dWeek').slider("value") ] ); 
					 $('#cMonth').text( ruMonths[ $('#sMonth').slider("value") ] );
					 $('#jez').text("ru");
					 $('#valuta').text("руб.");
			break;
	
	}

	countAll();
	
});

var cdate = new Date();

// установим день недели
$('#wDay').text( (lang=="eng") ? weekdays[cdate.getDay()] : ruWeekDays[cdate.getDay()] );

	// день недели
	$('#dWeek').slider({
	
		min: 0,
		max: 6,
		value: cdate.getDay(),
		slide: function( event, ui ) {
		
			countAll();
			
			$('#wDay').text( (lang=="eng") ? weekdays[ui.value] : ruWeekDays[ui.value] );
			
			
		}
	
	});
	
// установим текущее число	
$('#cDay').text( cdate.getDate() );

// найдем макс день текущего месяца
// @param int dYear (год)
// @param int dMonth (месяц)
// @return int MaxDay
function getMaxDay(dYear,dMonth){

	switch (dMonth){
	
		case 0:  MaxDay = 31; break; // january
		case 1:  MaxDay = ( ( dYear % 4 ) == 0) ? 29 : 28 ;    break; // february
		case 2:  MaxDay = 31; break; // march
		case 3:  MaxDay = 30; break; // april
		case 4:  MaxDay = 31; break; // may
		case 5:  MaxDay = 30; break; // june
		case 6:  MaxDay = 31; break; // july
		case 7:  MaxDay = 31; break; // august
		case 8:  MaxDay = 30; break; // september
		case 9:  MaxDay = 31; break; // october
		case 10: MaxDay = 30; break; // november
		case 11: MaxDay = 31; break; // december
	
	}

	return MaxDay;
}


// глобальное макс число месяца
var glMaxDay = getMaxDay(cdate.getFullYear,cdate.getMonth());

// глоб. год
var glYear = cdate.getFullYear();
	
	// число
	$('#sDay').slider({
	
		min: 1,
		max: glMaxDay,
		value: cdate.getDate(),
		slide: function( event, ui ) {
		
			$('#cDay').text( ui.value );
			
			countAll();
	
		}
	
	});
	
	
// установим текущий месяц
$('#cMonth').text( ( lang == "eng" ) ? month_en[ cdate.getMonth() ] : ruMonth[ cdate.getMonth() ] );

	// Месяц
	$('#sMonth').slider({
	
		min: 0,
		max: 11,
		value: cdate.getMonth(),
		slide: function( event, ui ) {
		
			$('#cMonth').text( ( lang == "eng" ) ? month_en[ ui.value ] : ruMonths[ ui.value ] );
			
			glMaxDay = getMaxDay(glYear, ui.value );
						
			$('#sDay').slider({
			
				max: glMaxDay
							
			});
			
			if ( $('#cDay').text() > $('#sDay').text() ) {  $('#cDay').text( $('#sDay').slider("value") ) ;  }
			
			countAll();
		}
	
	});
	
	
// установим текущий год
$('#cYear').text( glYear );

	// год
	$('#sYear').slider({
	
		min: 1964,
		max: 2050,
		value: cdate.getFullYear(),
		slide: function( event, ui ) {
		
			glYear = ui.value;
			
			$('#cYear').text( ui.value );
			
			mMax = getMaxDay( glYear, $('#sMonth').slider("value") );
			
			
			$('#sDay').slider({
			
				max: mMax
			
			});
		
			countAll();
		
		}
	
	});

	
// установим текущее время
$('#cHour').text( (cdate.getHours < 10 ) ? "0"+cdate.getHours() : cdate.getHours() );

	// время
	$('#sHour').slider({
	
		min: 0,
		max: 23,
		value: cdate.getHours(),
		slide: function( event, ui ) {
		
			$('#cHour').text( (ui.value < 10 ) ? "0" + ui.value : ui.value );
		
			countAll();
		}
	
	});
	
	
// установим минуты
$('#cMin').text( (cdate.getMinutes() < 10 ) ? "0"+cdate.getMinutes() : cdate.getMinutes() );

	// минуты
	$('#sMin').slider({
	
		min: 0,
		max: 59,
		value: cdate.getHours(),
		slide: function( event, ui ) {
		
			$('#cMin').text( (ui.value < 10 ) ? "0"+ui.value : ui.value );
		
			countAll();
		}
	
	});
	
	
	
	
	
// countAll
function countAll(){

	// constants 
	var MON = (lang == "eng") ? 2 : 20.30;
		TUE = (lang == "eng") ? 1.5 : 15.40;
		WED = (lang == "eng") ? 3.5 : 9;
		THU = (lang == "eng") ? 1.5 : 6;
		FRI = (lang == "eng") ? 15.5 : 76.23;
		SAT = (lang == "eng") ? 1 : 10;
		SUN = (lang == "eng") ? 1.5 : 19.10;
		
		// за каждое число
		EACH_DAY = ( lang == "eng" ) ? 0.25 : 2;
		
		// за каждый месяц
		EACH_MONTH = ( lang == "eng" ) ? 3 : 4.99;
		
		// за каждый год
		EACH_YEAR = ( lang == "eng" ) ? 10 : 50;
		
		// за каждый час
		EACH_HOUR = ( lang == "eng" ) ? 0.1 : 100;
		
		// за каждую минуту
		EACH_MIN = ( lang == "eng" ) ? 0.25 : 10;


		
	// total wDays
	var twDays;
	
	switch ($('#dWeek').slider("value"))
	{
	
		case 0: twDays = SUN; break;
		case 1: twDays = MON; break;
		case 2: twDays = TUE; break;
		case 3: twDays = WED; break;
		case 4: twDays = THU; break;
		case 5: twDays = FRI; break;
		case 6: twDays = SAT; break;
	
	}
	
	
	// tDays
	var tDays = $('#sDay').slider("value") * EACH_DAY;
	
	// tMonths
	var tMonths = $('#sMonth').slider("value") * EACH_MONTH;
	
	// tYears
	var tYears = ( $('#sYear').slider("value") / 1000 ) * EACH_YEAR;
	
	// tHours
	var tHours = $('#sHour').slider("value") * EACH_HOUR;
	
	// tMins
	var tMins = $('#sMin').slider("value") * EACH_MIN;
	
	// total
	total = twDays + tDays + tMonths + tYears + tHours + tMins;
	
	
	$('#total').text(total.toFixed(2));

}
	
// start
countAll();
	
});