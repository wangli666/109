/**
 * Created by Administrator on 2017/9/4.
 */
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    uglyFile = require('gulp-uglify'),
    minCss = require('gulp-clean-css'),
    webserver = require('gulp-webserver'),
    rename = require('gulp-rename'),
    url = require('url'),
    watch = require('gulp-watch');
var data = {
    "IsDirect": false,
    "IsBookable": true,
    "TrainName": "K599",
    "TrainType": "K",
    "StartStationName": "北京西",
    "EndStationName": "郑州",
    "StratTime": "05:14",
    "EndTime": "14:04",
    "UseTime": 530,
    "IsStartStation": false,
    "IsEndStation": false,
    "PreSaleDay": 29,
    "SaleReminder": "",
    "SeatBookingItem": [
        {
            "SeatTypeId": 201,
            "Price": "93.0",
            "SeatName": "硬　座",
            "Inventory": 99,
            "IsBookable": true
        },
        {
            "SeatTypeId": 224,
            "Price": "174",
            "SeatName": "硬　卧",
            "Inventory": 0,
            "IsBookable": true
        },
        {
            "SeatTypeId": 225,
            "Price": "263",
            "SeatName": "软　卧",
            "Inventory": 1,
            "IsBookable": true
        }
    ],
    "TakeTime": "8小时50分",
    "TakeDays": 0,
    "order": 2,
    "Filter": "K 05:14 14:04 530 true 北京西 郑州 false 93.0",
    "StartStationCss": "<i class='guo_icon'>过</i>",
    "EndStationCss": "<i class='guo_icon'>过</i>",
    "FightForTickets": true,
    "TrainMinPrice": 93.0
}
gulp.task('minifycss',function(){
    gulp.src('./css/style.css')
        .pipe(minCss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./css'))
})
// gulp.task('minifyjs',function(){
//     gulp.src(['./js/script.js'])
//         .pipe(babel())
//         .pipe(uglyFile())
//         .pipe(rename('script.min.js'))
//         .pipe(gulp.dest('./js/min'))
// })
gulp.task('minifyjs',function(){
    gulp.src(['./js/ajax.js'])
        .pipe(babel())
        .pipe(uglyFile())
        .pipe(rename('ajax.min.js'))
        .pipe(gulp.dest('./js/min'))
})
gulp.task('mock',function(){
    gulp.src('.')
        .pipe(webserver({
            port: 8000,
            middleware: function(req,res,next){
                res.setHeader('Access-Control-Allow-Origin','*');
                var method = req.method,
                    pathname = url.parse(req.url).pathname;
                if(method == 'GET'){
                    switch(pathname){
                        case '/TrainBooking/Ajax/SearchListHandler.ash':
                            res.setHeader('Content-type','text/html;charset=utf-8');
                            res.end(JSON.stringify(data));
                            break;
                    }
                }
            }
        }))
})
gulp.task('sassCss',function(){
    gulp.src('./css/style.sass')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
});
gulp.task('connect',function(){
    connect.server({
        port: 3000,
        livereload: true
    })
});
gulp.task('reloadPage',function(){
    gulp.src('.')
        .pipe(connect.reload())
});
gulp.task('watch',function(){
    gulp.watch(['./index.html','./css/style.css','js/script.js'],['reloadPage','minifycss','minifyjs']);
})
gulp.task('default',['connect','mock','sassCss','watch','minifycss','minifyjs']);