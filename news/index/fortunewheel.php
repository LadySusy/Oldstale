                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Pagination -->
            <style type="text/css">
                text{
                    font-family:Helvetica, Arial, sans-serif;
                    font-size:11px;
                    pointer-events:none;
                }
                #chart{
                    position:absolute;
                    width:500px;
                    height:500px;
                    top:0;
                    left:0;
                }
                #question{
                    position: absolute;
                    width:400px;
                    height:500px;
                    top:0;
                    left:520px;
                }
                #question h1{
                    font-size: 50px;
                    font-weight: bold;
                    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                    position: absolute;
                    padding: 0;
                    margin: 0;
                    top:50%;
                    -webkit-transform:translate(0,-50%);
                    transform:translate(0,-50%);
                }
            </style>

        </head>
        <body>
            <div id="chart"></div>
            <div id="question"><h1></h1></div>

            <script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
            <script type="text/javascript" charset="utf-8">
                var padding = {top:20, right:40, bottom:0, left:0},
                w = 500 - padding.left - padding.right,
                h = 500 - padding.top  - padding.bottom,
                r = Math.min(w, h)/2,
                rotation = 0,
                oldrotation = 0,
                picked = 100000,
                oldpick = [],
color = d3.scale.category20();//category20c()
//randomNumbers = getRandomNumbers();
//http://osric.com/bingo-card-generator/?title=HTML+and+CSS+BINGO!&words=padding%2Cfont-family%2Ccolor%2Cfont-weight%2Cfont-size%2Cbackground-color%2Cnesting%2Cbottom%2Csans-serif%2Cperiod%2Cpound+sign%2C%EF%B9%A4body%EF%B9%A5%2C%EF%B9%A4ul%EF%B9%A5%2C%EF%B9%A4h1%EF%B9%A5%2Cmargin%2C%3C++%3E%2C{+}%2C%EF%B9%A4p%EF%B9%A5%2C%EF%B9%A4!DOCTYPE+html%EF%B9%A5%2C%EF%B9%A4head%EF%B9%A5%2Ccolon%2C%EF%B9%A4style%EF%B9%A5%2C.html%2CHTML%2CCSS%2CJavaScript%2Cborder&freespace=true&freespaceValue=Web+Design+Master&freespaceRandom=false&width=5&height=5&number=35#results
var data = [
{"label":"{itemname}",  "value":1,}, // padding
{"label":"{itemname}",  "value":1,}, //font-family
{"label":"{itemname}",  "value":1,}, //color
{"label":"{itemname}",  "value":1,}, //font-weight
{"label":"{itemname}",  "value":1,}, //font-size
{"label":"{itemname}",  "value":1,}, //background-color
{"label":"{itemname}",  "value":1,}, //nesting
{"label":"{itemname}",  "value":1,}, //bottom
{"label":"{itemname}",  "value":1,}, //sans-serif
{"label":"{itemname}", "value":1,} //period
];
var svg = d3.select('#chart')
.append("svg")
.data([data])
.attr("width",  w + padding.left + padding.right)
.attr("height", h + padding.top + padding.bottom);
var container = svg.append("g")
.attr("class", "chartholder")
.attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
var vis = container
.append("g");

var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);
// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice")
.data(pie)
.enter()
.append("g")
.attr("class", "slice");

arcs.append("path")
.attr("fill", function(d, i){ return color(i); })
.attr("d", function (d) { return arc(d); });
// add the text
arcs.append("text").attr("transform", function(d){
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle)/2;
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
})
.attr("text-anchor", "end")
.text( function(d, i) {
    return data[i].label;
});
container.on("click", spin);
function spin(d){

    container.on("click", null);
//all slices have been seen, all done
console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
if(oldpick.length == data.length){
    console.log("done");
    container.on("click", null);
    return;
}
var  ps       = 360/data.length,
pieslice = Math.round(1440/data.length),
rng      = Math.floor((Math.random() * 1440) + 360);

rotation = (Math.round(rng / ps) * ps);

picked = Math.round(data.length - (rotation % 360)/ps);
picked = picked >= data.length ? (picked % data.length) : picked;
if(oldpick.indexOf(picked) !== -1){
    d3.select(this).call(spin);
    return;
} else {
    oldpick.push(picked);
}
rotation += 90 - Math.round(ps/2);
vis.transition()
.duration(3000)
.attrTween("transform", rotTween)
.each("end", function(){
//mark question as seen
d3.select(".slice:nth-child(" + (picked + 1) + ") path")
.attr("fill", "#111");
//populate question
d3.select("#question h1")
.text(data[picked].question);
oldrotation = rotation;

container.on("click", spin);
});
}
//make arrow
svg.append("g")
.attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
.append("path")
.attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
.style({"fill":"black"});
//draw spin circle
container.append("circle")
.attr("cx", 0)
.attr("cy", 0)
.attr("r", 60)
.style({"fill":"white","cursor":"pointer"});
//spin text
container.append("text")
.attr("x", 0)
.attr("y", 15)
.attr("text-anchor", "middle")
.text("TOURNER")
.style({"font-weight":"bold", "font-size":"20px"});


function rotTween(to) {
    var i = d3.interpolate(oldrotation % 360, rotation);
    return function(t) {
        return "rotate(" + i(t) + ")";
    };
}


function getRandomNumbers(){
    var array = new Uint16Array(1000);
    var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
    if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
        window.crypto.getRandomValues(array);
        console.log("works");
    } else {
//no support for crypto, get crappy random numbers
for(var i=0; i < 1000; i++){
    array[i] = Math.floor(Math.random() * 100000) + 1;
}
}
return array;
}
</script>
<!-- END: Pagination -->
</div>
<div class="nk-gap-6"></div>
<div class="nk-gap-6"></div>
<div class="nk-gap-6"></div>
<div class="nk-gap-6"></div>
<div class="nk-gap-6"></div>
<!-- START: Footer -->
<?php 
include '../views/_footer.html'; // footer
?>
<!-- END: Footer -->
</div>

<!-- START: Page Background -->
<img class="nk-page-background-top" src="assets/images/bg-top-4.png" alt="">
<!-- END: Page Background -->

<!-- START: Search Modal -->
<div class="nk-modal modal fade" id="modalSearch" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span class="ion-android-close"></span>
                </button>

                <h4 class="mb-0">Search</h4>

                <div class="nk-gap-1"></div>
                <form action="#" class="nk-form nk-form-style-1">
                    <input type="text" value="" name="search" class="form-control" placeholder="Type something and press Enter" autofocus>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- END: Search Modal -->
<!-- START: Login Modal -->
<div class="nk-modal modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content" style="width: 390px;margin-left: auto;margin-right: auto;">
            <div class="modal-body">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span class="ion-android-close"></span>
                </button>
                <h4 class="mb-0">
                    <span class="text-main-1">C</span>ONNEXION</h4>
                    <?php if (isset($_SESSION["LOGIN_ERROR"])): ?>
                        <div style="width: 100%;padding: 10px;background-color: #d71c3a;border-radius: 4px;margin-top: 20px;color: #fff;"><?php echo $_SESSION["LOGIN_ERROR"]; ?></div>
                    <?php endif; ?>
                    <div class="nk-gap-1"></div>
                    <form name="log_form" id="log_form" class="nk-form text-white" method="post" action="/user/login.php">
                        <div class="row vertical-gap">
                            <div class="col-md-6" style="flex: 0 0 100%;max-width: 100%;">
                                Utilisez un nom d'utilisateur et un mot de passe:
                                <div id="login_error" style="display:none;">
                                    <div class="error_message_wrapper">
                                        <span class="arrow"> </span>
                                        <p class="error_message" id="error_message"></p>
                                    </div>
                                </div>

                                <div class="nk-gap"></div>
                                <input type="text" value="" id="usernameLogin" name="LoginUsername" class="form-control" placeholder="Nom d'utilisateur">

                                <div class="nk-gap"></div>
                                <input type="password" value="" id="passwordLogin" name="LoginPassword" class="required form-control" placeholder="Mot de passe">
                            </div>
                        </div>
                        <div class="nk-gap-1"></div>
                        <div class="row vertical-gap">
                            <div class="col-md-6" style="flex: 0 0 100%;max-width: 100%;">
                                <button type="submit" id="log-submit" class="nk-btn nk-btn-rounded nk-btn-color-white nk-btn-block" value="Sign In">CONNEXION</button>
                                <br>
                                <div class="mnt-5" style="flex: 0 0 100%;max-width: 100%;">
                                    <!--<small><a href="#">Forgot your password?</a></small>-->
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="nk-modal modal fade" id="modalRegister" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content" style="width: 390px;margin-left: auto;margin-right: auto;">
                <div class="modal-body">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span class="ion-android-close"></span>
                    </button>
                    <h4 class="mb-0">
                        <span class="text-main-1">Créer</span> un compte</h4>
                        <div class="nk-gap-1"></div>
                        <form action="/user/register.php" class="nk-form text-white" method="post" name="reg" id="reg">
                            <div class="row vertical-gap">
                                <div class="col-md-6" style="flex: 0 0 100%;max-width: 100%;">
                                    <span id="create-text">Créer un nouveau compte !</span>
                                    <?php if (isset($_SESSION["REGISTER_ERROR"])): ?>
                                        <div style="width: 100%;padding: 10px;background-color: #d71c3a;border-radius: 4px;margin-top: 20px;color: #fff;"><?php echo $_SESSION["REGISTER_ERROR"]; ?></div>
                                    <?php endif; ?>
                                    <div class="nk-gap"></div>
                                    <input type="text" value="" name="username" class=" form-control" placeholder="Nom d'utilisateur">
                                    <div class="nk-gap"></div>
                                    <input type="email" value="" name="mail" class=" form-control" placeholder="Email">
                                    <div class="nk-gap"></div>
                                    <input type="password" value="" name="password" class="required form-control" placeholder="Mot de passe">
                                    <div class="nk-gap"></div>
                                    <input type="password" value="" name="passwordRepeat" class="required form-control" placeholder="Répéter le mot de passe">
                                    <div style="margin-top: 20px;"> </div>
                                    <div class="g-recaptcha" data-sitekey="6LcuzJIUAAAAAO-Y9biG3_ZunEAXGR-fhO_HUrl8"></div>
                                </div>
                            </div>
                            <div class="nk-gap-1"></div>
                            <div class="row vertical-gap">
                                <div class="col-md-6"  style="flex: 0 0 100%;max-width: 100%;">
                                    <input type="submit" class="nk-btn nk-btn-rounded nk-btn-color-white nk-btn-block" id="reg-submit" value="Rejoignez-nous">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- END: Login Modal -->
        <!-- START: Scripts -->
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/gsap/src/minified/TweenMax.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/gsap/src/minified/plugins/ScrollToPlugin.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/tether/dist/js/tether.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/sticky-kit/dist/sticky-kit.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/jarallax/dist/jarallax.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/jarallax/dist/jarallax-video.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/imagesloaded/imagesloaded.pkgd.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/flickity/dist/flickity.pkgd.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/photoswipe/dist/photoswipe.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/photoswipe/dist/photoswipe-ui-default.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/jquery-form/dist/jquery.form.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/jquery-validation/dist/jquery.validate.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/jquery.countdown/dist/jquery.countdown.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/moment/min/moment.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/moment-timezone/builds/moment-timezone-with-data.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/hammer.js/hammer.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/nanoscroller/bin/javascripts/jquery.nanoscroller.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/SoundManager2/script/soundmanager2-nodebug-jsmin.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/summernote/dist/summernote.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/plugins/nk-share/nk-share.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/bower_components/prism/prism.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/js/goodgames.min.js"></script>
        <script src="<?php echo $site['url'] . $site['style']; ?>/js/goodgames-init.js"></script>
        <script src='https://www.google.com/recaptcha/api.js'></script>
        <!-- END: Scripts -->
    </body>
    </html>