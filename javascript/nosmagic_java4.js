
function validateForm(a){$(a).validationEngine();$(a).bind("jqv.field.result",function(d,e,b,c){if($(e).hasClass("ok-field")&&!b){if(!$(e).hasClass("checked")){$(e).after('<div class="valid-check"> </div>');$(e).addClass("checked")}}else{$(e).parent().find(".valid-check").remove();$(e).removeClass("checked")}})}function passwordBar(e){function b(j){var g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(var h=0;h<j.length;h++){}return true}function a(m,j){var l=0;var g=100;var h=7;var n=g/h;if(m.length<1){l=0}if(m.length>=3){l++}if(m.length>=6){l++}if(m.length>=8){l++}if(m.length>=10){l++}var k=l*n;if(k>g){k=g}return Math.ceil(k)}function c(g,h){for(i=0;i<g.length;i++){if(h.indexOf(g.charAt(i))>-1){return true}}return false}var d="";var f=8;$(e).focus(function(){$("#securePwd").fadeIn()});$(e).keyup(function(){$("#validChar").text("");var g=$(this).val();if(!b(g)){$("#validChar").text($("#txtInvalidChar").text());return}d=a($(this).val(),f);if(d){$("#securePwdBar").css({width:d+"%"});if(d>69){$("#securePwd #securePwdBar").css("background-color","#94af1c")}else{if(d>41){$("#securePwd #securePwdBar").css("background-color","#f1c43c")}else{if(d<41){$("#securePwd #securePwdBar").css("background-color","#e44c2c")}else{$("#securePwd #securePwdBar").css("background-color","#e44c2c")}}}}else{$("#securePwdBar").css({width:0});$("#securePwd .valid-icon").addClass("invalid")}if((d>49)&&(g.length<3)){$("#securePwdBar").css({width:"48px","background-color":"#e44c2c"})}})}function goToByScroll(a){$("html,body").animate({scrollTop:$("#"+a).offset().top},"slow")}function show_user_options(){$("#useroptions").slideToggle();if($("#userName span").hasClass("arrow_top_small")){$("#userName span").removeClass("arrow_top_small").addClass("arrow_bottom_small")}else{if($("#userName span").hasClass("arrow_bottom_small")){$("#userName span").removeClass("arrow_bottom_small").addClass("arrow_top_small")}}}var element_nr=0;var clicked=0;function show_teaser_content(c){var d="#newsTeaser"+c;var a="#sliderImg"+c;var b=$(d).children(".teaser_content").attr("style");if(b!="display: block;"){$(".teaser_content").slideUp();$(d).children(".teaser_content").slideDown();$(".teaser_wrapper").children(".teaser_headline").removeClass("active");$(d).children(".teaser_headline").addClass("active");$(".slider_img").fadeOut();$(a).fadeIn();clicked=c}}function auto_play_slider(){auto_play=setInterval(function(){$(".teaser_wrapper").eq(clicked).trigger("click");clicked++;if(3==clicked){clicked=0}},4000)}function stop_auto_play(){clearInterval(auto_play)}$(function(){$(window).scroll(function(){if($(this).scrollTop()!=0){$("#toTop").fadeIn()}else{$("#toTop").fadeOut()}});$("#toTop").click(function(){$("body,html").animate({scrollTop:0},800)})});function show_registration_passwords(){var a=$("#passwordsShowHide");if($(a).hasClass("show_passwords")){$("#reg input[type=password]").each(function(){var d=$(this).val(),b=$(this).wrap("<span></span>").parent(),c=$(b.html().replace(/(<input[^>]+type=('|")?)password(\2[^>]*>)/i,"$1text$3"));b.replaceWith(c.val(d))});$("#userPasswordHidden").removeClass("hidden");$("#userPasswordVisible").addClass("hidden");$(a).removeClass("show_passwords").addClass("hide_passwords")}else{if($(a).hasClass("hide_passwords")){$("#reg input.password_field").each(function(){var d=$(this).val(),b=$(this).wrap("<span></span>").parent(),c=$(b.html().replace(/(<input[^>]+type=('|")?)text(\2[^>]*>)/i,"$1password$3"));b.replaceWith(c.val(d))});$("#userPasswordHidden").addClass("hidden");$("#userPasswordVisible").removeClass("hidden");$(a).removeClass("hide_passwords").addClass("show_passwords")}}}function escapeHtml(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function startKalydo(a){$.get("http://"+window.location.hostname+"/ajax/user/ajaxcheckforlogin",function(b){if(b==1){$("#kalydoLayer").removeClass("hidden");$("#kalydoContainer").addClass("kalydoContainer");$("#kalydoContainer").html("<iframe src='"+a+"' width='1024' height='850' frameborder='0'></iframe>");$("#disableKalydoBox").removeClass("hidden")}else{window.location.href="http://"+window.location.hostname}})}function closeKalydo(){window.location.href="http://"+window.location.hostname}function closeKalydoDisableBox(){$("#disableKalydoBox").addClass("hidden")}function callhighscore(){$.get("http://"+window.location.hostname+"/ajax/news/getUserScore/"+$("#serverchoice").val(),function(a){$("#top10").html(a)})}function submitPoll(b){var a=$("#poll"+b+" input:radio:checked").val();if(a!==undefined){$.get("http://"+window.location.hostname+"/ajax/user/poll/"+b+"/"+a,function(c){$("#poll_box").html(c)})}};