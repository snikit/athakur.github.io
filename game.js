var tileWidth = 100; //=$(".hexagon").css("width");
var emptySpace =0;

var swap = function(piece1,piece2)
	{ 
		var bgpo1 = $('.hexagonContainer:eq('+piece1+')').find('.hexagon-in2').css("background-position");
		var bgpo2 = $('.hexagonContainer:eq('+piece2+')').find('.hexagon-in2').css("background-position");
		$('.hexagonContainer:eq('+piece1+')').find('.hexagon-in2').css('background-position',bgpo2);
		$('.hexagonContainer:eq('+piece2+')').find('.hexagon-in2').css('background-position',bgpo1);
		
	}
var checkMove = function()
		{
		var temp=$(".hexagonContainer").index(this);
		
		if ( (temp!=emptySpace) && neighborCheck(temp,emptySpace)) 
			{
			swap(temp,emptySpace);
			emptySpace = temp;
			}
		};
var neighborCheck = function(piece1,piece2)
		{
		var neighbor=false;
		var x1=$('.hexagonContainer:eq('+piece1+')').css("left").replace(/[^-\d\.]/g, '');
		var x2=$('.hexagonContainer:eq('+piece2+')').css("left").replace(/[^-\d\.]/g, '');
		if (tileWidth >=Math.abs(x1-x2) ) 
			{
			 var y1=$('.hexagonContainer:eq('+piece1+')').css("top").replace(/[^-\d\.]/g, '');
			 var y2=$('.hexagonContainer:eq('+piece2+')').css("top").replace(/[^-\d\.]/g, '');
			 if (tileWidth >=Math.abs(y1-y2) ) 
			 	{	
				neighbor=true;
				}
			} 
		return neighbor;
		
		};
var scramble = function(){
		resetBoard();
		var randIndex=0;
		$(".hexagonContainer").each(function( index )
			{
	    randIndex = Math.floor(Math.random() * 15);
		swap(randIndex,index);
			});
			emptySpace = randIndex;
		
	
		
	};	
var resetBoard = function() 
		{
		$(".hexagonContainer").each(function() 
			{
			var left=$(this).css("left");
			var top=$(this).css("top");
			//alert (left+" "+ top);
			$(this).find('.hexagon-in2').css('background-position',"-"+left+" -"+top);
			});
		$(".hexagonContainer").last().find('.hexagon-in2').css('background-position', tileWidth+"px 0px");
		emptySpace =15;
		}
var init = 	function()
{
$(".hexagonContainer").clone().prependTo(".board");
$(".hexagonContainer").clone().prependTo(".board");
$(".hexagonContainer").clone().prependTo(".board");
$(".hexagonContainer").clone().prependTo(".board");
$(".hexagonContainer").each(function( index ) 
	{
	var xlocation=(index%4)*tileWidth ;
	var ylocation=Math.floor(index/4)*(tileWidth*0.86);
	if (index%8>3) 
		{
		xlocation=xlocation+(tileWidth*0.5);
		}
	$(this).css("left", xlocation ).css("top",ylocation ) ;
	$(this).on('click', checkMove);
	});
resetBoard();
scramble();
}
init();