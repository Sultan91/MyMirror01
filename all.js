var accessToken = "your-access-token-from-api.ai";
        var baseUrl = "https://api.api.ai/v1/";
		  $(document).ready(function() {
			  //--------------------------------------- YouTube API
					
					$("#audio").hide();
			  			$(".various").fancybox({
					maxWidth	: 800,
					maxHeight	: 600,
					fitToView	: false,
					width		: '70%',
					height		: '70%',
					autoSize	: false,
					closeClick	: false,
					openEffect	: 'elastic',
					closeEffect	: 'none'
				});
				
			  //=================================== YouTube API
            var audio;
            var playlist;
            var tracks;
            var current;

            //$("#input").hide();
            function init(){
                current = 0;
                audio = $('#audio');
                playlist = $('#playlist');
                tracks = playlist.find('p a');
                len = tracks.length;
                audio[0].volume = .10;
				
                audio[0].play();
				
              
				
                audio[0].addEventListener('ended',function(e){
                    current++;
                    if(current == len){
                        current = 0;
                        link = playlist.find('a')[0];
                    }
                    else{
                        link = playlist.find('a')[current];
                    }
                    run($(link),audio[0]);
                });
				
            }

            function run(link, player){
                player.src = link.attr('href');
                par = link.parent();
                par.addClass('active').siblings().removeClass('active');
                audio[0].load();
                audio[0].play();
            }
            //=--=-=-/************************************---------------------


      
		
		
            $("#input").keypress(function(event) {
                if (event.which == 13) {
                    event.preventDefault();
                    send();
                }
            });
           
       
        var recognition;
        
        // -------------------------------------------
    
        function stopRecognition() {
            if (recognition) {
                recognition.stop();
                recognition = null;
            }
            
        }
        function switchRecognition() {
            if (recognition) {
                stopRecognition();
            } else {
                startRecognition();
            }
        }
        function setInput(text) {
            $("#input").val(text);
            send();
        }
       
         function setResponse(val) {
            $("#response").text(val);
            
        }

function startRecognition() {
			$("#audio").hide();
			
            recognition = new webkitSpeechRecognition();
            recognition.onstart = function(event) {
                 
            };
            recognition.onresult = function(event) {
                var text = "";
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    text += event.results[i][0].transcript;//-======================= recognize the words and 
                }
                setInput(text);//             ---------------------------------- put them into array in input slot
                 
				stopRecognition();
				
            };
		    
            recognition.onend = function() {
                stopRecognition();
            };
            recognition.lang = "RU";
            recognition.start();
			
        }

function send() {
            var text = $("#input").val();  //       Reading value from input slot
            $.ajax({
                type: "POST",
                url: baseUrl + "query/",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    "Authorization": "Bearer " + accessToken
                },
                data: JSON.stringify({ q: text, lang: "en" }),
                success: function(data) {
                    //setResponse(JSON.stringify(data, undefined, 2));
                 //   $("#out").html("Вывод где: "+text);
                    setOutput(text);
                },
                error: function() {
                    setResponse("Internal Server Error");
                }

            });

            
        }
        
 // $("#audio").hide();
function setOutput(text){
            switch(text){
                
                case "Видео":
				case "видео":
			
				$("#1").fancybox().trigger('click');
                     $("#musicViz").hide();
					audio = $('#audio');
					audio[0].pause();
                break;
				case "Закрой видео":
				case "видео стоп":
				case "Видео стоп":
				 $.fancybox.close();
				break;
				case "стоп музыка":
				case "музыка стоп":
				
				 $("#musicViz").hide();
					audio = $('#audio');
					audio[0].pause();
				$("#audio").hide();
				break;
				case "пауза":
                case "музыка на паузу":
                    $("#musicViz").hide();
					audio = $('#audio');
					audio[0].pause();
				break;
				
                case "музыка":
				case "сыграй что-нибудь":
			 
				$("#musicViz").html( "<div id='bars' class='animated infinite pulse'> <div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div> <div class='bar'></div><div class='bar'></div><div class='bar'></div> <div class='bar'></div> <div class='bar'></div> <div class='bar'></div><div class='bar'></div> <div class='bar'></div> <div class='bar'></div><div class='bar'></div><div class='bar'></div>	<div class='bar'></div>	<div class='bar'></div>	<div class='bar'></div>	<div class='bar'></div>	<div class='bar'></div>	<div class='bar'></div>	<div class='bar'></div>	<div class='bar'></div>	<div class='bar'></div>	<div class='bar'></div>	<div class='bar'></div>	<div class='bar'></div>	<div class='bar'></div>	<div class='bar'></div></div>");
					
                   	$("#musicViz").show();
					// $("#audio").show();
					 current = 0;
                audio = $('#audio');
                playlist = $('#playlist');
                tracks = playlist.find('p a');
                len = tracks.length;
                audio[0].volume = .10;
				
                audio[0].play();
				
                audio[0].addEventListener('ended',function(e){
                    current++;
                    if(current == len){
                        current = 0;
                        link = playlist.find('a')[0];
                    }
                    else{
                        link = playlist.find('a')[current];
                    }
                    run($(link),audio[0]);
                });
					 
                break;
                case "следующий":
				case "дальше":
				case "Next":
				case "вперед":
				 
				 current++;
                    if(current == len){
                        current = 0;
                        link = playlist.find('a')[0];
                    }
                    else{
                        link = playlist.find('a')[current];
                    }
                    run($(link),audio[0]);
				
				break;
				case "назад":
				case "предыдущий":
				 
                    if(current == 0){
                        current = tracks.length;
                        link = playlist.find('a')[0];
                    }
                    else{current--;
                        link = playlist.find('a')[current];
                    }
                    run($(link),audio[0]);
				break;
				
            }
			 
         }

		  
		
 
 setTimeout(function run() {
	 
	  
	  startRecognition();
	  
	  jQuery('#micro').toggle();
	   
	   
  setTimeout(run, 3000);
}, 3000);

});
